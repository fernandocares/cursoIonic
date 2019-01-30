import { Injectable } from "@angular/core";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/localUser";
import { StorageService } from "./storage.service";
import { JwtHelper } from "angular2-jwt";

@Injectable()
export class AuthService{

    jwtHelper: JwtHelper = new JwtHelper();

    baseUrl: string = `${API_CONFIG.baseUrl}/login`;

    constructor(public http: HttpClient, public storage: StorageService){

    }

    authenticate(creds: CredenciaisDTO){

        return this.http.post(this.baseUrl, creds, {
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
    }

    logout() {
        this.storage.setLocalUser(null);
    }
}