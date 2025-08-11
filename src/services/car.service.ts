import {adRepository, AdRepository} from '../repositories/ad.repository';
import {IAd} from '../interfaces/ad.interface';
import {containsProfanity} from '../utils/check-profanity';
import {EmailService, emailService} from './email.service';
import {ApiError} from '../errors/api-error';


export class AdService {
    constructor(
        private adRepository: AdRepository,
        private emailService: EmailService
    ) {
    }

    async createAd(dto: Partial<IAd>): Promise<IAd> {

        const textToCheck = `${dto.title} ${dto.description}`;
        const hasProfanity = containsProfanity(textToCheck);
        if (!hasProfanity) {

            return this.adRepository.create({
                ...dto,
                isPublished: true,
                isProfanityChecked: true,
                profanityCheckAttempts: 0,
            });
        }
        const message = `The ad from user ${dto.userId} failed the automatic profanity check. Manual moderation is required.`;
        await this.emailService.sendToManager(message);

        return this.adRepository.create({
            ...dto,
            isPublished: false,
            isProfanityChecked: false,
            profanityCheckAttempts: 1,
        });
    }

    async updateAd(adId: string, updateData: Partial<IAd>): Promise<IAd> {
        const ad = await this.adRepository.findById(adId);
        if (!ad) {
            throw new ApiError(`Ad with ID ${adId} not found.`, 404);
        }

        if (ad.isPublished === false && ad.profanityCheckAttempts < 3) {
            const textToCheck = `${updateData.title || ad.title} ${updateData.description || ad.description}`;
            const hasProfanity = containsProfanity(textToCheck);

            if (!hasProfanity) {

                return this.adRepository.updateById(adId, {
                    ...updateData,
                    isPublished: true,
                    isProfanityChecked: true,
                    profanityCheckAttempts: ad.profanityCheckAttempts,
                });
            } else {

                const newAttempts = ad.profanityCheckAttempts + 1;

                if (newAttempts >= 3) {
                    const message = `The ad from user ${ad.userId} failed the profanity check 3 times. Manual moderation is required. Ad ID: ${adId}`;
                    await this.emailService.sendToManager(message);
                }

                return this.adRepository.updateById(adId, {
                    ...updateData,
                    profanityCheckAttempts: newAttempts,
                    isPublished: false,
                });
            }
        }

        return this.adRepository.updateById(adId, updateData);
    }
}

export const adService = new AdService(adRepository, emailService);

