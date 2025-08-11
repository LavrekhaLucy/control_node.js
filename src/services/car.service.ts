// import { carRepository } from '../repositories/car.repository';
// import { currencyService } from './currency.service';
// import { userRepository } from '../repositories/user.repository';
// import { brandRepository } from '../repositories/brand.repository';
// import { ICar } from '../interfaces/car-interface';
// import { HydratedDocument } from 'mongoose';
// import {AccountType} from "../enums/account-type.enum";
// import {CurrencyEnum} from "../enums/currency.enum";
//
// class CarService {
//     // create ad
//     public async createAd(sellerId: string, dto: Partial<ICar>): Promise<HydratedDocument<ICar>> {
//         const seller = await userRepository.findById(sellerId);
//         if (!seller) throw new Error('Seller not found');
//
//         // Basic account limit: only 1 active ad
//         if (seller.accountType === AccountType.BASE) {
//             const count = await carRepository.countActiveBySeller(sellerId);
//             if (count >= 1) throw new Error('Base account allows only 1 active ad');
//         }
//
//         // brand check: if brand not exists -> create brand and notify admin (or flag)
//         let brand = await brandRepository.findByName(dto.brand!);
//         if (!brand) {
//             // create brand, then inform admin
//             brand = await brandRepository.create({ name: dto.brand! });
//             await emailService.sendToManager('New brand requested', `Brand ${dto.brand} was added by seller ${seller.email}`);
//         }
//
//         // profanity check
//         const profanity = profanityService.check(dto.description || '');
//         const hasProfanity = profanity.hasProfanity;
//
//         // currency conversion
//         const from = dto.currency as CurrencyEnum;
//         const price = dto.price!;
//         const converted = await currencyService.convert(price, from, CurrencyEnum.UAH);
//
//         const carDoc = await carRepository.create({
//             title: dto.title!,
//             description: dto.description,
//             brand: dto.brand!,
//             model: dto.model || 'Unknown',
//             sellerId,
//             currency: from,
//             price,
//             priceUAH: converted.UAH,
//             priceUSD: converted.USD,
//             priceEUR: converted.EUR,
//             priceSource: `Converted by ${converted.source} at ${new Date(converted.timestamp).toISOString()}`,
//             adStatus: hasProfanity ? AdStatus.PENDING_EDIT : AdStatus.ACTIVE,
//             hasProfanity,
//             profaneWords: profanity.words,
//             editAttempts: 0,
//         });
//
//         if (hasProfanity) {
//             // optionally notify seller via email — omitted
//         }
//
//         return carDoc;
//     }
//
//     // edit ad — user can edit max 3 times to remove profanity; each save rechecks profanity
//     public async editAd(adId: string, sellerId: string, updates: Partial<ICar>) {
//         const ad = await carRepository.findById(adId);
//         if (!ad) throw new Error('Ad not found');
//         if (ad.sellerId.toString() !== sellerId) throw new Error('Not your ad');
//
//         // If ad was active and user edits price/currency -> recompute conversions
//         if (updates.price !== undefined || updates.currency !== undefined) {
//             const from = (updates.currency || ad.currency) as CurrencyEnum;
//             const price = updates.price !== undefined ? updates.price : ad.price!;
//             const conv = await currencyService.convert(price, from, CurrencyEnum.UAH);
//             updates.priceUAH = conv.UAH;
//             updates.priceUSD = conv.USD;
//             updates.priceEUR = conv.EUR;
//             updates.priceSource = `Converted by ${conv.source} at ${new Date(conv.timestamp).toISOString()}`;
//             updates.currency = from;
//             updates.price = price;
//         }
//
//         // If description changed -> recheck profanity
//         let hasProfanity = ad.hasProfanity ?? false;
//         let profaneWords = ad.profaneWords ?? [];
//         if (updates.description !== undefined) {
//             const pf = profanityService.check(updates.description);
//             hasProfanity = pf.hasProfanity;
//             profaneWords = pf.words;
//         }
//
//         // If currently PENDING_EDIT and user already tried 3 times -> go INACTIVE and notify manager
//         const editAttempts = (ad.editAttempts ?? 0) + (ad.hasProfanity ? 1 : 0);
//         let newStatus = ad.adStatus;
//         let newEditAttempts = ad.editAttempts ?? 0;
//
//         if (ad.hasProfanity) {
//             newEditAttempts = (ad.editAttempts ?? 0) + 1;
//             if (!hasProfanity) {
//                 newStatus = AdStatus.ACTIVE;
//             } else {
//                 if (newEditAttempts >= 3) {
//                     newStatus = AdStatus.INACTIVE;
//                     // notify manager
//                     await emailService.sendToManager('Ad requires manual review', `Ad ${adId} exceeded allowed edit attempts`);
//                 } else {
//                     newStatus = AdStatus.PENDING_EDIT;
//                 }
//             }
//         } else {
//             // ad had no profanity earlier; if now has profanity -> set pending_edit and editAttempts=0
//             if (hasProfanity) {
//                 newStatus = AdStatus.PENDING_EDIT;
//                 newEditAttempts = 0;
//             } else {
//                 newStatus = AdStatus.ACTIVE;
//             }
//         }
//
//         const updated = await carRepository.update(adId, {
//             ...updates,
//             hasProfanity,
//             profaneWords,
//             adStatus: newStatus,
//             editAttempts: newEditAttempts,
//         });
//
//         return updated;
//     }
// }
//
// export const carService = new CarService();
