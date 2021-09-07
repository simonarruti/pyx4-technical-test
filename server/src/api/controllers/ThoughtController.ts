/*
===============
Express-validator docs: https://express-validator.github.io/docs/
===============
 */

import {ThoughtDependencies} from "../../config"
import { Request, Response } from "express"
import { body, validationResult } from "express-validator"

import ThoughtService from "../../services/ThoughtService"

const thoughtService = new ThoughtService(new ThoughtDependencies.databaseRepository(ThoughtDependencies.databaseProvider))

export default class ThoughtController {
    async findAllThoughts (req: Request, res: Response) : Promise<void> {
        try {
            const page = req.query.page ? parseInt(req.query.page.toString()) : 1
            const results = await thoughtService.findAllThoughts(page)
            
            res.status(200).send({
                thoughts: results[0].data,
                totalCount: results[0].totalCount[0]?.count || 0
            })
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async findThought (req: Request, res: Response) {
        try {
            const result = await thoughtService.findThought(req.params.id)
            
            if (result.length === 0) {
                return res.status(404).send('Not found')
            }
            
            res.status(200).send(result)
        } catch (error) {
            res.status(500).send(error)
        }
        
    }
    
    async createThought (req: Request, res: Response) {
        const errors = validationResult(req)
        
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array())
        }
        
        try {
            await thoughtService.createThought(req.body)
            
            res.status(201).send('Created')
        } catch (error) {
            res.status(500).send(error)
        }
    }
    
    async updateThought (req: Request, res: Response) : Promise<void> {
        try {
            await thoughtService.updateThought(req.params.id, req.body)
            
            res.status(200).send('Updated')
        } catch (error) {
            res.status(500).send(error)
        }
        
    }
    
    async deleteThought (req: Request, res: Response) : Promise<void> {
        try {
            await thoughtService.deleteThought(req.params.id)
            
            res.status(200).send('Deleted')
        } catch (error) {
            res.status(500).send(error)
        }
        
    }
    
    validateUserInput () {
        return body('content').notEmpty().trim().escape()
    }

}