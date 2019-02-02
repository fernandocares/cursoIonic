import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CidadeDTO } from "../../models/Cidade.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CidadeService {

    baseUrl: string = `${API_CONFIG.baseUrl}/estados/`;

    constructor(public http: HttpClient){

    }

    findAll(estado_id : string) : Observable<CidadeDTO[]> {
        return this.http.get<CidadeDTO[]>(this.baseUrl + `${estado_id}/cidades`);
    }
}