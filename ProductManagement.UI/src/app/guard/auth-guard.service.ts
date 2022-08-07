import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable
export class AuthGuard implements CanActivate{
    constructor(private jwthelper: JwtHelperService,private router: Router){

    }

    canActivate(){
        const token = localStorage.getItem("jwt");

        if(token && !this.jwthelper.isTokenExpired(token)){
            return true;
        }
        this.router.navigate(["login"]);
        return false;
    }
}