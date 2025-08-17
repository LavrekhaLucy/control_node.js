import express, {NextFunction, Request, Response} from 'express';
import {ApiError} from './errors/api-error';
import {configs} from './configs/config';
import * as mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import {cronRunner} from './cron';
import {authRoutes} from './routes/auth.routes';
import {adminRoutes} from './routes/admin.routes';
import {seedDatabase} from './seeds/seedData';
import {carRoutes} from './routes/car.routes';
import {brandRoutes} from './routes/brand.routes';



const app = express();

const port = configs.APP_PORT;
const host = configs.APP_HOST;
const mongo = configs.MONGO_URI;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());


app.use((req: Request, res: Response, next: NextFunction) => {

    console.log(`${req.method} ${req.path}`);
    next();
});


app.use('/users', adminRoutes);
app.use('/auth', authRoutes);
app.use('/cars', carRoutes);
app.use('/brands', brandRoutes);



// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: ApiError, req: Request, res: Response, _next: NextFunction) => {
    res.status(error.status || 500).send(error.message);
});

process.on('uncaughtException', (error) => {
    console.error('uncaughtException', error.message, error.stack);
});


app.listen(port, async () => {
    try {
        await mongoose.connect(mongo);
        console.log('MongoDB connected');

        await seedDatabase();
        console.log('Database seeded');

        cronRunner();

        console.log(`Server started on http://${host}:${port}`);
    } catch (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
});

