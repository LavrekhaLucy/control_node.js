import axios from 'axios';
import {ICurrencyRate} from '../interfaces/currency-rate.interface';
import {configs} from '../configs/config';
import {ApiError} from '../errors/api-error';


const APP_PRIVAT_URL =configs.APP_PRIVAT_URL;
if (!APP_PRIVAT_URL) {
    throw new ApiError('APP_PRIVAT_URL is not defined in environment variables.', 500);
}

export class CurrencyService {
    async getRate(currencyCode: string): Promise<number> {
        try {

            const { data } = await axios.get<ICurrencyRate[]>(APP_PRIVAT_URL);

            const rateInfo = data.find(r => r.ccy === currencyCode);

            if (!rateInfo) {
                throw new ApiError(`No rate found for ${currencyCode}`,404);
            }

            return parseFloat(rateInfo.sale);
        } catch (error) {
            console.error('Failed to fetch currency rate:', error);
            throw new ApiError(`Failed to get rate for ${currencyCode}`,500);
        }
    }
    async getAllRates(): Promise<{ [key: string]: number }> {
        try {
            const { data } = await axios.get<ICurrencyRate[]>(APP_PRIVAT_URL);

            const rates: { [key: string]: number } = {};
            data.forEach(r => {
                rates[r.ccy] = parseFloat(r.sale);
                rates[r.base_ccy] = 1; // базова валюта UAH
            });

            return rates;
        } catch (error) {
            console.error('Failed to fetch currency rates:', error);
            throw new ApiError('Failed to get currency rates', 500);
        }
    }

}

export const currencyService = new CurrencyService();
