// // import {CurrencyEnum} from "../enums/currency.enum";
// // import {IPrivatRate} from "../interfaces/privat-rate-interface";
// // import axios from 'axios';
// // import {configs} from "../configs/config";
// //
// //
// // class CurrencyService {
// //     private lastFetched = 0;
// //     private ttl = 1000 * 60 * 60 * 24; // 24 години
// //     private rates: Record<CurrencyEnum, number> | null = null;
// //
// //
// //
// //     public async getRates(): Promise<Record<CurrencyEnum, number>> {
// //         const now = Date.now();
// //         if (!this.rates || now - this.lastFetched > this.ttl) {
// //             await this.fetchRates();
// //         }
// //         return this.rates!;
// //     }
// //
// //     private async fetchRates(): Promise<void> {
// //
// //         const url = configs.APP_PRIVAT_URL;
// //         if (!url) {
// //             throw new Error('APP_PRIVAT_URL is not defined in .env');
// //         }
// //         const { data } = await axios.get<IPrivatRate[]>(url);
// //
// //         const result: Record<CurrencyEnum, number> = {
// //             [CurrencyEnum.UAH]: 1,
// //             [CurrencyEnum.USD]: 0,
// //             [CurrencyEnum.EUR]: 0
// //         };
// //
// //         for (const rate of data) {
// //             if (rate.ccy === 'USD' && rate.base_ccy === 'UAH') {
// //                 result.USD = parseFloat(rate.sale);
// //             }
// //             if (rate.ccy === 'EUR' && rate.base_ccy === 'UAH') {
// //                 result.EUR = parseFloat(rate.sale);
// //             }
// //         }
// //
// //         this.rates = result;
// //         this.lastFetched = Date.now();
// //     }
// // }
//
// // export const currencyService = new CurrencyService();
//
//
// import axios from 'axios';
//
// export class CurrencyService {
//     async getRate(currencyCode: string): Promise<number> {
//         const { data } = await axios.get(process.env.APP_PRIVAT_URL!);
//
//         const rateInfo = data.find((r: any) => r.ccy === currencyCode);
//         if (!rateInfo) throw new Error(`No rate found for ${currencyCode}`);
//
//         return parseFloat(rateInfo.sale);
//     }
// }
