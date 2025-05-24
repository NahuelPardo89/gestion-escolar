import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private supabase: SupabaseService, private router: Router) {}

  canActivate(): Promise<boolean | UrlTree> | Observable<boolean | UrlTree> | boolean | UrlTree {
    return this.supabase.getUserPromise().then(({ data }) => {
      if (data?.user) {
        return true;
      } else {
        return this.router.createUrlTree(['/login']);
      }
    });
  }
}
