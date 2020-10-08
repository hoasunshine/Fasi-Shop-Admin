import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

class UserToken {
}
class Permissions {
  canActivate(user: UserToken, id: string): boolean {
    return false;
  }
}

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private permissions: Permissions, private currentUser: UserToken) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.permissions.canActivate(this.currentUser, route.params.id);
    }

}