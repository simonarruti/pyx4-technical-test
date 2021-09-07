import dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import helmet from "helmet";
import cors from 'cors'

import { requestLogger, errorLogger } from './frameworks/logging/winston'

import { ThoughtDependencies } from "./config"

ThoughtDependencies.databaseProvider.init()
    .then(async () => {
        const thoughtRouter = await import("./api/routes/ThoughtRouter")
        
        const app = express();
        const port = 3000;

        app.use(helmet())
        app.use(cors())
        app.use(express.json())

        app.use(requestLogger)

        app.use('/api/thoughts', thoughtRouter.default())

        app.use(errorLogger)
        
        app.listen(port, () => {
            console.log(`Application is running on port ${port}.`);
        });
    })