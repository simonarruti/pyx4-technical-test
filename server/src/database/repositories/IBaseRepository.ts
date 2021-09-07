import ThoughtModel from '../models/ThoughtModel'

export default interface IBaseRepository {
    
    findAll (page?: number, limit?: number) : Promise<any>

    find (thoughtId: string | number) : Promise<any>
    
    create (thought: ThoughtModel) : Promise<any>
    
    update (thoughtId: string | number, thought: ThoughtModel) : Promise<any>
    
    delete (thoughtId: string | number) :Promise<any>
}