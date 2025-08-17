import {GetCarsQuery, ICar} from '../interfaces/car-interface';
import {AdStatusEnum} from '../enums/ad-status.enum';
import {Car} from '../models/car.model';
import {containsProfanity} from '../utils/check-profanity';
import {convertPrices} from '../utils/price-converter';
import {CurrencyService} from './currency.service';
import {emailService} from './email.service';
import {AdRepository} from '../repositories/ad.repository';
import {IAd} from '../interfaces/ad.interface';
import {IUser} from '../interfaces/user-interface';
import {AccountType} from '../enums/account-type.enum';
import {carRepository} from '../repositories/car.repository';
import {Types} from 'mongoose';


export class CarService {
    currencyService: CurrencyService;
    adRepository: AdRepository;

    constructor() {
        this.currencyService = new CurrencyService();
        this.adRepository = new AdRepository();
    }

    public async createCar(user: IUser, data: Partial<ICar>): Promise<ICar> {
        const adStatus = containsProfanity(`${data.title ?? ''} ${data.description ?? ''}`)
            ? AdStatusEnum.INACTIVE
            : AdStatusEnum.ACTIVE;

        if (!data.price || !data.currency) {
            throw new Error('Необхідно вказати ціну та валюту авто');
        }

        const rates = await this.currencyService.getAllRates();
        const converted = convertPrices(data.price, data.currency, rates);

        const car = new Car({
            ...data,
            sellerId: user._id,
            adStatus,
            priceUSD: converted.USD,
            priceEUR: converted.EUR,
            priceUAH: converted.UAH,
            priceRate: rates[data.currency],
        });

        return car.save();
    }

    public async editCar(carId: string, dto: Partial<ICar>, user: IUser): Promise<ICar> {
        const car = await carRepository.findById(carId);
        if (car.editAttempts >= 3) {
            car.adStatus = AdStatusEnum.INACTIVE;
            await emailService.sendCarModerationEmail(
                car,
                { name: user.name, email: user.email },
                'Suspicious language or many edit'
            );
            return car.save();
        }

        car.adStatus = containsProfanity(`${dto.title ?? ''} ${dto.description ?? ''}`)
            ? AdStatusEnum.INACTIVE
            : AdStatusEnum.ACTIVE;

        const currency = dto.currency ?? car.currency;
        const price = dto.price ?? car.price;

        const rates = await this.currencyService.getAllRates();
        const converted = convertPrices(price, currency, rates);

        car.priceUSD = converted.USD;
        car.priceEUR = converted.EUR;
        car.priceUAH = converted.UAH;
        car.priceRate = rates[currency];

        Object.assign(car, dto);
        car.editAttempts = (car.editAttempts || 0) + 1;

        return car.save();
    }

    public async getCarStats(carId: string, user: IUser) {
        if (user.accountType !== AccountType.PREMIUM) return null;

        const car = await carRepository.findById(carId);
        if (!car) return null;

        const now = new Date();
        const totalViews = car.views.length;
        const viewsToday = car.views.filter(v => v.date.toDateString() === now.toDateString()).length;
        const viewsWeek = car.views.filter(v => v.date > new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)).length;
        const viewsMonth = car.views.filter(v => v.date > new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)).length;

        const avgPriceRegion = await Car.aggregate([
            {$match: {region: car.region}},
            {$group: {_id: null, avgPrice: {$avg: '$price'}}}
        ]);

        const avgPriceUA = await Car.aggregate([
            {$group: {_id: null, avgPrice: {$avg: '$price'}}}
        ]);

        return {
            totalViews,
            viewsToday,
            viewsWeek,
            viewsMonth,
            avgPriceRegion: avgPriceRegion[0]?.avgPrice || 0,
            avgPriceUA: avgPriceUA[0]?.avgPrice || 0,
        };
    }

    public async updatePrices(): Promise<void> {
        const ads = await this.adRepository.findActiveAds();
        const rates = await this.currencyService.getAllRates();

        await Promise.all(
            ads.map(async (ad: IAd) => {
                if (ad.currency !== 'UAH') {
                    const converted = convertPrices(ad.price, ad.currency, rates);
                    await this.adRepository.updateAdPrice(ad._id.toString(), converted.UAH, rates[ad.currency]);
                }
            })
        );
    }

    public async getCarById(carId: string): Promise<ICar | null> {
        const car = await carRepository.findById(carId);
        return car;
    }

    public async getAllCars(query: GetCarsQuery, user?: IUser): Promise<ICar[]> {
        const filter: Record<string, unknown> = {};

        if (query.region) filter.region = query.region;
        if (query.brand) filter.brand = query.brand;
        if (query.currency) filter.currency = query.currency;

        if (query.minPrice) filter.price = { ...(filter.price as Record<string, unknown>), $gte: Number(query.minPrice) };
        if (query.maxPrice) filter.price = { ...(filter.price as Record<string, unknown>), $lte: Number(query.maxPrice) };

        if (user && user.accountType !== AccountType.PREMIUM) {
            filter.adStatus = AdStatusEnum.ACTIVE;
        }

        return carRepository.findQuery(filter).sort({ createdAt: -1 });
    }
    public async verifyCar(carId: string) {
        const objectId = new Types.ObjectId(carId);
        return carRepository.updateCar(objectId, { verified: true });
    }

    public async deleteCar(carId: string) {
        const objectId = new Types.ObjectId(carId);
        return carRepository.deleteCar(objectId);
    }
}
export const carService = new CarService();

