import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpXsrfTokenExtractor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class XsrfInterceptor implements HttpInterceptor {

  constructor(private xsrfTokenExtractor:HttpXsrfTokenExtractor) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let xsrfToken=this.xsrfTokenExtractor.getToken();
    if (request.method=="POST") {
      const authorizedReq=request.clone({withCredentials:true,headers:request.headers.set("X-XSRF-TOKEN",xsrfToken)});
      return next.handle(authorizedReq);
    }
    return next.handle(request);
  }
}
