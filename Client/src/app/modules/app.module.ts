import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../components/app.component';
import { FooterComponent } from '../features/footer/components/footer.component';
import { HeaderComponent } from '../features/header/components/header.component';
import { GetHttpPongService } from '../features/server-connection/long-polling/services/get-http-pong.service';
import {
  ConsumeWsMessagesService,
} from '../features/server-connection/web-socket/services/consume-ws-messages.service';
import { HttpLinkService } from '../services/http-link.service';
import { RetryLinkService } from '../services/retry-link.service';
import { WebSocketLinkService } from '../services/web-socket-link.service';
import { AppRoutingModule } from './app-routing.module';
import { GraphQLModule } from './graphql.module';
import { NgrxModule } from './ngrx.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    GraphQLModule,
    NgrxModule,
  ],
  providers: [
    ConsumeWsMessagesService,
    GetHttpPongService,
    HttpLinkService,
    RetryLinkService,
    WebSocketLinkService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
