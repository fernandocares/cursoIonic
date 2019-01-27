import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../models/categoria.dto";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CategoriaService {

    baseUrl: string = `${API_CONFIG.baseUrl}/categorias`;

    constructor(public http: HttpClient){
        
    }

    findAll() : Observable<CategoriaDTO[]>{
        return this.http.get<CategoriaDTO[]>(this.baseUrl);
    }
}