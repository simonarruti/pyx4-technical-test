/*
===============
Official documentation: https://docs.mongodb.com/manual/
MongoDB NodeJS Github Repo: https://github.com/mongodb/node-mongodb-native
Official documentation (NodeJS Driver): https://docs.mongodb.com/drivers/node/current/
===============
 */

import IBaseRepository from "./IBaseRepository"
import ThoughtModel from "../models/ThoughtModel"

import {Collection, DeleteResult, Document, InsertOneResult, ObjectId, UpdateResult} from "mongodb"
import IMongoProvider from "../providers/IMongoProvider"

export default class MongoDBThoughtRepository implements IBaseRepository {
    
    private _dbCollection : Collection
    private _dbProvider : IMongoProvider
    
    constructor (databaseProvider: IMongoProvider) {
        this._dbProvider = databaseProvider
        this._dbCollection = databaseProvider.getDbCollection()
    }

    /**
     * 
     * @param page
     * @param limit
     * @doc aggregation https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/
     * @doc $facet https://docs.mongodb.com/manual/reference/operator/aggregation/facet/
     */
    async findAll (page: number = 1, limit: number = 5) : Promise<Array<Document>> {
        const skip = (page - 1) * limit
        
        return await this._dbCollection.aggregate([
            { $facet: {
                data: [
                    { $sort: { lastModified: -1 } },
                    { $skip: skip },
                    { $limit: limit },
                    { $addFields: { id: '$_id'} },
                    { $unset: ['_id'] }
                ],
                totalCount: [
                    { $count: "count" }
                ]
            }}
        ]).toArray()
    }

    async find (thoughtId: string): Promise<Document> {
        return await this._dbCollection.aggregate([
            { $match: { _id: new ObjectId(thoughtId) } },
            { $addFields: { id: '$_id'} },
            { $unset: ['_id'] }
        ]).toArray()
    }
    
    async create (thought: ThoughtModel) : Promise<InsertOneResult> {
        return await this._dbCollection.insertOne(thought)
    }
    
    async update (thoughtId: string, thought: ThoughtModel) : Promise<UpdateResult> {
        return await this._dbCollection.updateOne({ _id: new ObjectId(thoughtId) }, { $set: {...thought} })
    }
    
    async delete (thoughtId: string) : Promise<DeleteResult> {
        return await this._dbCollection.deleteOne({ _id: new ObjectId(thoughtId) })
    }
    
}