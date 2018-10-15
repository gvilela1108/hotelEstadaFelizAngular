export class ConfigService {
 
    private urlService:string;
 
    constructor(){
 
        this.urlService = 'http://localhost:9090/hotelEstadaFeliz/rest/';
    }
 
    getUrlService(): string {
 
        return this.urlService;
    }
 
}