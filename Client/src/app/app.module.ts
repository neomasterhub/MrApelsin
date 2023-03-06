import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './features/footer/components/footer.component';
import { HeaderComponent } from './features/header/header.component';
import {
  LongPollingServerConnectionEffects,
} from './features/server-connection/long-polling/ngrx/long-polling-server-connection.effects';
import { GetHttpPongService } from './features/server-connection/long-polling/services/get-http-pong.service';
import { ServerConnectionEffects } from './features/server-connection/ngrx/server-connection.effects';
import {
  ServerConnectionTypeReducer,
  ServerMessageReducer,
  ServerStatusReducer,
} from './features/server-connection/ngrx/server-connection.reducers';
import {
  WebSocketServerConnectionEffects,
} from './features/server-connection/web-socket/ngrx/web-socket-server-connection.effects';
import { ConsumeWsMessagesService } from './features/server-connection/web-socket/services/consume-ws-messages.service';
import { GraphQLModule } from './graphql.module';
import { metaReducers } from './ngrx/app.reducers';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    StoreModule.forRoot({
      serverStatus: ServerStatusReducer,
      serverMessage: ServerMessageReducer,
      serverConnectionType: ServerConnectionTypeReducer,
    }, {
      metaReducers,
    }),
    EffectsModule.forRoot([
      LongPollingServerConnectionEffects,
      ServerConnectionEffects,
      WebSocketServerConnectionEffects,
    ]),
  ],
  providers: [
    ConsumeWsMessagesService,
    GetHttpPongService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
