import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '../components/app.component';
import { FooterComponent } from '../features/footer/components/footer.component';
import { HeaderComponent } from '../features/header/components/header.component';
import { LoadingAnimation } from '../features/loading-animation/components/loading.animation';
import {
  AnimatedHttpRequestInterceptor
} from '../features/loading-animation/interceptors/animated-http-request.interceptor';
import { GetHttpPongService } from '../features/server-connection/long-polling/services/get-http-pong.service';
import {
  ConsumeWsMessagesService,
} from '../features/server-connection/web-socket/services/consume-ws-messages.service';
import { AppRoutingModule } from './app-routing.module';
import { GraphQLModule } from './graphql.module';
import { MaterialModule } from './material.module';
import { NgrxModule } from './ngrx.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoadingAnimation,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    GraphQLModule,
    NgrxModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    ConsumeWsMessagesService,
    GetHttpPongService,
    { provide: HTTP_INTERCEPTORS, useClass: AnimatedHttpRequestInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
