import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/localUser";
import { StorageService } from "./storage.service";
import { JwtHelper } from "angular2-jwt";
import { CartService } from "./domain/cart.service";

@Injectable()
export class AuthService{

    jwtHelper: JwtHelper = new JwtHelper();

    baseUrl: string = API_CONFIG.baseUrl;

    constructor(public http: HttpClient, public storage: StorageService, public cartService : CartService){

    }

    authenticate(creds: CredenciaisDTO){

        return this.http.post(this.baseUrl + '/login', creds, {
            observe: 'response',
            responseType: 'text'
        });
    }

    successfullLogin(authorizationValue: string){
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub
        };

        this.storage.setLocalUser(user);
        this.cartService.createClearCart();
    }

    logout() {
        this.storage.setLocalUser(null);
    }
    
    refreshToken(){
        return this.http.post(this.baseUrl + '/auth/refresh_token', {}, {
            observe: 'response',
            responseType: 'text'
        });
    }
}