// import { AdRepository } from '../repositories/ad.repository';
// import {CurrencyService} from "./currency.service";
//
//
// export class AdService {
//     constructor(
//         private adRepository: AdRepository,
//         private currencyService: CurrencyService
//     ) {}
//
//     async updatePrices(): Promise<void> {
//         const ads = await this.adRepository.findActiveAds();
//
//         for (const ad of ads) {
//             if (ad.currency !== 'UAH') {
//                 const rate = await this.currencyService.getRate(ad.currency);
//                 const newPriceUAH = ad.price * rate;
//
//                 await this.adRepository.updateAdPrice(ad._id, newPriceUAH, rate);
//             }
//         }
//     }
// }
