import {ICar} from '../interfaces/car-interface';
import {CarRepository, carRepository} from '../repositories/car.repository';
import {FilterQuery} from 'mongoose';
import {AdStatusEnum} from '../enums/ad-status.enum';
import {ApiError} from '../errors/api-error';


class CarService {
    carRepository: CarRepository;

    constructor() {
        this.carRepository = carRepository; // присвоюємо вже створений інстанс репозиторію
    }


    async createCar(dto: Partial<ICar>): Promise<ICar> {
        return this.carRepository.create({
            ...dto,
            adStatus: AdStatusEnum.PENDING,
            hasProfanity: false,
            profaneWords: [],
            editAttempts: 0,
        });
    }


    public async editCar(carId: string, dto: Partial<ICar>): Promise<ICar | null> {
        return this.carRepository.findByIdAndUpdate(carId, dto, true);
    }


    public async findCars(
        filters: FilterQuery<ICar>,
        options: { sort?: Record<string, 1 | -1>; skip?: number; limit?: number }
    ) {
        return carRepository
            .findQuery(filters)
            .sort(options.sort || {createdAt: -1})
            .skip(options.skip || 0)
            .limit(options.limit || 10)
            .lean()
            .exec();
    }

    public async getById(id: string): Promise<ICar | null> {
        return this.carRepository.findById(id);
    }

    public async getAll(): Promise<ICar[]> {
        return this.carRepository.findAll();
    }

    async deleteCar(id: string): Promise<void> {
        const ad = await this.carRepository.findById(id);
        if (!ad) {
            throw new ApiError(`Ad with ID ${id} not found.`, 404);
        }
        await this.carRepository.delete(id);
    }

}

export const carService = new CarService();

