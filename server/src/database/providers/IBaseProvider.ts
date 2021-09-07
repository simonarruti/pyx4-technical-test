export default interface IBaseProvider {
    
    init () : Promise<any>
    
    close () : void
}