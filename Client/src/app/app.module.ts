import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './features/footer/components/footer.component';
import { ServerConnectionEffects } from './features/server-connection/ngrx/server-connection.effects';
import {
  ServerMessageReducer,
  ServerStatusReducer,
} from './features/server-connection/ngrx/server-connection.reducers';
import { ConsumeServerMessagesService } from './features/server-connection/services/consume-server-messages.service';
import { GraphQLModule } from './graphql.module';
import { metaReducers } from './ngrx/app.reducers';

@NgModule({
  declarations: [
    AppComponent,
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
    }, {
      metaReducers,
    }),
    EffectsModule.forRoot([
      ServerConnectionEffects,
    ]),
  ],
  providers: [ConsumeServerMessagesService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
