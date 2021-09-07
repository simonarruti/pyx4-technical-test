/*
===============
Winston docs: https://github.com/winstonjs/winston
Express-winston docs: https://github.com/bithavoc/express-winston
===============
 */

import winston from "winston"
import expressWinston from 'express-winston'

export const requestLogger = expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true, 
    colorize: true
})

export const errorLogger = expressWinston.errorLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
})