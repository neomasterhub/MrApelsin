import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServerConnectionEffects } from './features/server-connection/ngrx/server-connection.effects';
import { ServerStatusReducer } from './features/server-connection/ngrx/server-connection.reducers';
import { ConsumeServerMessagesService } from './features/server-connection/services/consume-server-messages.service';
import { GraphQLModule } from './graphql.module';
import { metaReducers } from './ngrx/app.reducers';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    StoreModule.forRoot({
      serverStatus: ServerStatusReducer,
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
