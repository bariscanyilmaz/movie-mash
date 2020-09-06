import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { XsrfInterceptor} from './services/xsrf.interceptor'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule,HttpClientXsrfModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { VoteComponent } from './vote/vote.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName:"XSRF-TOKEN",
      headerName:"X-XSRF-TOKEN"
    })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: XsrfInterceptor,multi:true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
