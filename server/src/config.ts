import MongoDBThoughtRepository from "./database/repositories/MongoDBThoughtRepository"
import MongoDBProvider from "./database/providers/MongoDBProvider"

export const ThoughtDependencies = {
    databaseProvider: MongoDBProvider,
    databaseRepository: MongoDBThoughtRepository 
}