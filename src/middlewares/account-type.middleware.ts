import {Request, Response, NextFunction} from 'express';
import {AccountType} from "../enums/enum-account-type";
import {IUser} from "../interfaces/user-interface";



class AccountTypeMiddleware {
    public verifyPremiumAccess() {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const user = req.user as IUser;

                if (!user || user.accountType !== AccountType.PREMIUM) {
                    return res.status(403).json({message: 'Premium account required'});
                }

                next();
            } catch (error) {
                console.error('RequirePremium middleware error:', error);
                return res.status(500).json({message: 'Internal server error'});
            }
        };
    }
}

export const accountTypeMiddleware = new AccountTypeMiddleware();
