import mongoose from 'mongoose';
import {BrandModel} from '../models/brand.model';


const brandsWithModels = [
    {
        name: 'Audi',
        models: ['A3', 'A4', 'A6', 'Q5', 'Q7']
    },
    {
        name: 'BMW',
        models: ['3 Series', '5 Series', 'X3', 'X5']
    },
    {
        name: 'Chevrolet',
        models: ['Aveo', 'Cruze', 'Captiva', 'Tahoe']
    },
    {
        name: 'Ford',
        models: ['Fiesta', 'Focus', 'Mondeo', 'Kuga']
    },
    {
        name: 'Honda',
        models: ['Civic', 'Accord', 'CR-V', 'HR-V']
    },
    {
        name: 'Hyundai',
        models: ['Elantra', 'Tucson', 'Santa Fe', 'Sonata']
    },
    {
        name: 'Kia',
        models: ['Rio', 'Sportage', 'Sorento', 'Ceed']
    },
    {
        name: 'Mazda',
        models: ['Mazda 3', 'Mazda 6', 'CX-5', 'CX-9']
    },
    {
        name: 'Mercedes-Benz',
        models: ['A-Class', 'C-Class', 'E-Class', 'GLC', 'GLE']
    },
    {
        name: 'Nissan',
        models: ['Micra', 'Qashqai', 'X-Trail', 'Navara']
    },
    {
        name: 'Opel',
        models: ['Astra', 'Corsa', 'Insignia', 'Mokka']
    },
    {
        name: 'Peugeot',
        models: ['208', '308', '3008', '5008']
    },
    {
        name: 'Renault',
        models: ['Clio', 'Megane', 'Captur', 'Kadjar']
    },
    {
        name: 'Skoda',
        models: ['Fabia', 'Octavia', 'Superb', 'Kodiaq']
    },
    {
        name: 'Toyota',
        models: ['Corolla', 'Camry', 'RAV4', 'Land Cruiser']
    },
    {
        name: 'Volkswagen',
        models: ['Golf', 'Passat', 'Tiguan', 'Touareg']
    },
    {
        name: 'Volvo',
        models: ['S60', 'S90', 'XC60', 'XC90']
    }
];

(async () => {
    await mongoose.connect('mongodb://localhost:27017/car-market');

    await BrandModel.deleteMany({});
    await BrandModel.insertMany(brandsWithModels);

    console.log('Brands and models seeded');
    await mongoose.connection.close();
})();
