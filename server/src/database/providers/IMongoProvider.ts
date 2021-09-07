import { Collection } from "mongodb"
import IBaseProvider from "./IBaseProvider"

export default interface IMongoProvide extends IBaseProvider{
    getDbCollection () : Collection
}