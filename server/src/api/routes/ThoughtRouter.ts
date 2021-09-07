import express, { Request, Response } from 'express'
import ThoughtController from "../controllers/ThoughtController";

const thoughtRouter = express.Router()

const controller = new ThoughtController()

thoughtRouter.get('/', async (req: Request, res: Response) => controller.findAllThoughts(req, res))
thoughtRouter.get('/:id', async (req: Request, res: Response) => controller.findThought(req, res))

thoughtRouter.post('/',
    controller.validateUserInput(),
    async (req: Request, res: Response) => controller.createThought(req, res))

thoughtRouter.patch('/:id',
    controller.validateUserInput(),
    async (req: Request, res: Response) => controller.updateThought(req, res))

thoughtRouter.delete('/:id', async (req: Request, res: Response) => controller.deleteThought(req, res))

export default () => thoughtRouter