import { EmailTypeEnum } from '../enums/email-type.enum';
import { EmailPayloadCombined } from './email-payload-combined.type';
import { PickRequired } from './pick-required.type';

export type EmailTypeToPayload = {
    [EmailTypeEnum.WELCOME]: PickRequired<EmailPayloadCombined, 'name'>;

    [EmailTypeEnum.FORGOT_PASSWORD]: PickRequired<
        EmailPayloadCombined,
        'name' | 'email'|'actionToken'>;

    [EmailTypeEnum.LOGOUT_ALL]: PickRequired<
        EmailPayloadCombined,
       'name' | 'email'>;

    [EmailTypeEnum.OLD_VISIT]: PickRequired<EmailPayloadCombined, 'name'>;

    [EmailTypeEnum.VERIFY_EMAIL]: PickRequired<EmailPayloadCombined, 'name'|'verifyLink'>;

    [EmailTypeEnum.BRAND_SUGGESTION]: PickRequired<EmailPayloadCombined, 'brandName'| 'userName'| 'userEmail'>;

    [EmailTypeEnum.CAR_MODERATION]: PickRequired<EmailPayloadCombined, 'carId'| 'carTitle'| 'sellerName'| 'sellerEmail' | 'reason'| 'adStatus'>;
       };