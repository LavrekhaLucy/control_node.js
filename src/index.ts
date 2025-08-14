import express, {NextFunction, Request, Response} from 'express';
import {ApiError} from './errors/api-error';
import {configs} from './configs/config';
import * as mongoose from 'mongoose';
import fileUpload from 'express-fileupload';

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger.json';

import {cronRunner} from './cron';
import {authRoutes} from './routes/auth.routes';
import {carRouter} from './routes/car.routes';
import {adminRouter} from './routes/admin.routes';
import {buyerRouter} from './routes/buyer.routes';
import {managerRouter} from './routes/manager.routes';
import {sellerRouter} from './routes/seller.routes';



const app = express();

const port = configs.APP_PORT;
const host = configs.APP_HOST;
const mongo = configs.MONGO_URI;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req: Request, res: Response, next: NextFunction) => {

    console.log(`${req.method} ${req.path}`);
    next();
});


app.use('/users', adminRouter);
app.use('/auth', authRoutes);
app.use('/cars', carRouter);
app.use('/buyer', buyerRouter);
app.use('/manager', managerRouter);
app.use('/seller', sellerRouter);


// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: ApiError, req: Request, res: Response, _next: NextFunction) => {
    res.status(error.status || 500).send(error.message);
});

process.on('uncaughtException', (error) => {
    console.error('uncaughtException', error.message, error.stack);
    process.exit(1);
});

app.listen(port, async ()  => {
    await mongoose.connect(mongo);

    cronRunner();
    console.log(`Server started on http://${host}:${port}`);
});


