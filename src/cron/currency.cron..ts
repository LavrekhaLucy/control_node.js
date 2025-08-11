import {CronJob} from 'cron';
import {AdRepository} from '../repositories/ad.repository';
import {AdService} from '../services/Ad.service';
import {CurrencyService} from '../services/currency.service';


const handler = async () => {
    const adService = new AdService(new AdRepository(), new CurrencyService());

    console.log('[CRON] Updating ad prices...');
    try {
        await adService.updatePrices();
        console.log('[CRON] Prices updated successfully');
    } catch (err) {
        console.error('[CRON] Failed to update prices:', err);
    }
}  ;


export const currencyCron = new CronJob('0 */3 * * * *', handler);

//
// import cron from 'node-cron';
// import { AdRepository } from '../repositories/ad.repository';
// import { CurrencyService } from '../services/currency.service';
// import { AdService } from '../services/ad.service';
//
// const adService = new AdService(new AdRepository(), new CurrencyService());
//
// // Запускаємо кожні 3 години
// cron.schedule('0 */3 * * *', async () => {
//     console.log('[CRON] Updating ad prices...');
//     try {
//         await adService.updatePrices();
//         console.log('[CRON] Prices updated successfully');
//     } catch (err) {
//         console.error('[CRON] Failed to update prices:', err);
//     }
// });