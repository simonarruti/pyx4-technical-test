import IBaseRepository from "../database/repositories/IBaseRepository";
import { Document } from "mongodb";
import IUserInput from "../api/types/IUserInput";
import ThoughtModel from "../database/models/ThoughtModel";

export default class ThoughtService {
    private repository: IBaseRepository;
    
    constructor (databaseRepository: IBaseRepository) {
        this.repository = databaseRepository
    }
    
    async findAllThoughts (page: number) : Promise<any> {
        return await this.repository.findAll(page)
    }
    
    async findThought (thoughtId: string) : Promise<Document> {
        return await this.repository.find(thoughtId)
    }
    
    async createThought (userInput: IUserInput) {
        const thought = ThoughtService.createThoughtTypeObject(userInput)
        
        return this.repository.create(thought);
    }
    
    async updateThought (thoughtId: string, userInput: IUserInput) {
        const testThought = ThoughtService.createThoughtTypeObject(userInput)
        
        return this.repository.update(thoughtId, testThought);
    }
    
    async deleteThought (thoughtId: string) {
        return this.repository.delete(thoughtId);
    }
    
    private static createThoughtTypeObject (userInput: IUserInput) : ThoughtModel {
        const thought : ThoughtModel = {
            content: userInput.content,
            lastModified: new Date(),
            abstract: ''
        }
    
        if (userInput.content.length > 100) {
            thought.abstract = `${userInput.content.slice(0, 100)}...`
        } else {
            thought.abstract = thought.content + '...'
        }
        
        return thought
    }
}