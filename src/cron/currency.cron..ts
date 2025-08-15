import {CronJob} from 'cron';
import {adService} from '../services/ad.service';



const handler = async () => {

    console.log('[CRON] Updating ad prices...');
    try {
        await adService.updatePrices();
        console.log('[CRON] Prices updated successfully');
    } catch (err) {
        console.error('[CRON] Failed to update prices:', err);
    }
}  ;


export const currencyCron = new CronJob('3 0 0 * * *', handler);


