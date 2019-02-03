import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";
import { ClienteDTO } from "../../models/cliente.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService {

    baseUrl: string = `${API_CONFIG.baseUrl}/clientes`;
    bucketBaseUrl: string = `${API_CONFIG.bucketBaseUrl}`;

    constructor(public http: HttpClient, public storage: StorageService){
        
    }

    findById(id: string) {
        return this.http.get(this.baseUrl + `/${id}`);
    }

    findByEmail(email: string) {
        return this.http.get(this.baseUrl + `/email?value=${email}`);
    }

    getImageFromBucket(id: string) : Observable<any> {
        let url = this.bucketBaseUrl + `/cp${id}.jpg`;
        return this.http.get(url, {responseType : 'blob'});
    }

    insert(obj : ClienteDTO) {
        return this.http.post(
            this.baseUrl + '/', 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
    
}