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

  constructor(private xsrfTokenExtractor: HttpXsrfTokenExtractor) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let xsrfToken = this.xsrfTokenExtractor.getToken();
    let newHeaders = request.headers.set("X-XSRF-TOKEN", xsrfToken)
    if (request.method == "POST") {
      if (this.xsrfTokenExtractor != null && newHeaders != null) {
        let authorizedReq = request.clone({ withCredentials: true, headers: newHeaders });
        
        console.log('request allowed');

        return next.handle(authorizedReq);
      }

    }
    return next.handle(request);
  }
}
