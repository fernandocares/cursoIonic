import { Injectable } from "@angular/core";
import { API_CONFIG } from "../../config/api.config";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class ProdutoService{

    baseUrl : string = `${API_CONFIG.baseUrl}/produtos/`;
    bucketBaseUrl : string = `${API_CONFIG.bucketBaseUrl}/prod`;

    constructor(public http: HttpClient){

    }

    findById(produto_id : string) {
        return this.http.get<ProdutoDTO>(`${this.baseUrl}${produto_id}`);
    }

    findByCategoria(categoria_id : string){
        return this.http.get(this.baseUrl + '?categorias=' + categoria_id);
    }

    getSmallImageFromBucket(id : string) : Observable<any> {
        let url = this.bucketBaseUrl + `${id}-small.jpg`;
        return this.http.get(url, {responseType : 'blob'});
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = this.bucketBaseUrl + `${id}.jpg`;
        return this.http.get(url, {responseType : 'blob'});
    }
}