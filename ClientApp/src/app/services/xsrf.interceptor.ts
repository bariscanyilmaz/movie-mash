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

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let xsrfToken = this.xsrfTokenExtractor.getToken();
    let newHeaders = request.headers.set("X-XSRF-TOKEN", xsrfToken)
    
    if (request.method == "POST") {
      if (xsrfToken != null && newHeaders != null) {
        let authorizedReq = request.clone({ withCredentials: true, headers: newHeaders });
        return next.handle(authorizedReq);
      }

    }
    return next.handle(request);
  }
}
