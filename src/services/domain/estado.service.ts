import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { EstadoDTO } from "../../models/Estado.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class EstadoService {

    baseUrl: string = `${API_CONFIG.baseUrl}/estados/`;

    constructor(public http: HttpClient){

    }

    findAll() : Observable<EstadoDTO[]> {
        return this.http.get<EstadoDTO[]>(this.baseUrl);
    }
}