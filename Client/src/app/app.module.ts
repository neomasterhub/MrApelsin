import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './features/footer/components/footer.component';
import { HeaderComponent } from './features/header/header.component';
import { ServerConnectionEffects } from './features/server-connection/ngrx/server-connection.effects';
import {
  ServerConnectionTypeReducer,
  ServerMessageReducer,
  ServerStatusReducer,
} from './features/server-connection/ngrx/server-connection.reducers';
import { WsServerConnectionEffects } from './features/server-connection/ws/ngrx/ws-server-connection.effects';
import { ConfigureGraphqlWsService } from './features/server-connection/ws/services/configure-graphql-ws.service';
import { ConsumeWsMessagesService } from './features/server-connection/ws/services/consume-ws-messages.service';
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
      ServerConnectionEffects,
      WsServerConnectionEffects,
    ]),
  ],
  providers: [
    ConfigureGraphqlWsService,
    ConsumeWsMessagesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
