export class ConnectedAccount{
    id?:number;
    provider?:string;
    userId?:number;
    static Create(provider:string):ConnectedAccount{
        var result = new ConnectedAccount();
        result.provider = provider;
        return result;
    }
}