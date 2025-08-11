import express, {NextFunction, Request, Response} from 'express';
import {ApiError} from './errors/api-error';
import {configs} from './configs/config';
import * as mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import roleRoutes from './routers/role.router';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger.json';
import carRoutes from './routers/car.routes';
import {cronRunner} from "./cron";


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

// app.use('/users', userRouter);
// app.use('/auth', authRouter);
app.use('/roles', roleRoutes);
app.use('/cars', carRoutes);


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


