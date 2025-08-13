// src/routes/brand.router.ts
import { Router } from "express";
import { brandController } from "../controllers/brand.controller";

export const brandRouter = Router();

brandRouter.get("/",
    brandController.getAll.bind(brandController));


brandRouter.post("/request",
    brandController.requestNewBrand.bind(brandController));
