/*
===============
Official documentation: https://docs.mongodb.com/manual/
MongoDB NodeJS Github Repo: https://github.com/mongodb/node-mongodb-native
Official documentation (NodeJS Driver): https://docs.mongodb.com/drivers/node/current/
===============
 */

import { Collection, MongoClient } from "mongodb"
import IMongoProvider from "./IMongoProvider"

class MongoDBProvider implements IMongoProvider {
    private _dbInstance
    private _dbCollection
    private _client
    
    async init () : Promise<string> {
        const mongoUrl = `mongodb://${process.env.MONGO_DB_HOST}:27017`
        this._client = new MongoClient(mongoUrl, {
            serverSelectionTimeoutMS: 4000
        })
        await this._client.connect()
        
        this._dbInstance = this._client.db(process.env.DB_NAME)
        this._dbCollection = this._dbInstance.collection(process.env.DB_COLLECTION_NAME)
        
        return this._dbCollection.collectionName
    }

    async close () : Promise<void> {
        await this._client.close()
    }

    getDbCollection () : Collection {
        return this._dbCollection;
    }
}

export default new MongoDBProvider()