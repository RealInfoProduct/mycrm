import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  private totalRequests = 0;
  copiedReq: any



  constructor(private router: Router, private injector: Injector, private loadingService : LoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.totalRequests++;
    this.loadingService.setLoader(true);
    const authService = this.injector.get(AuthService);
    const Authorization = localStorage.getItem('Authorization') || '';

    if (Authorization === '') {
      this.copiedReq = request.clone({});
    } else {
      this.copiedReq = request.clone({
        headers: request.headers.append('Authorization',  'bearer ' + Authorization)
      });
    }

    if (!authService.token) {
      this.router.navigateByUrl('authentication/side-login');
    }

    return next.handle(this.copiedReq).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.loadingService.setLoader(false);
        }
      })
    );
  }
}
