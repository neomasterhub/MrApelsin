import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {
  LongPollingServerConnectionEffects,
} from '../features/server-connection/long-polling/ngrx/long-polling-server-connection.effects';
import { ServerConnectionEffects } from '../features/server-connection/ngrx/server-connection.effects';
import {
  ServerConnectionTypeReducer,
  ServerMessageReducer,
  ServerStatusReducer,
} from '../features/server-connection/ngrx/server-connection.reducers';
import {
  WebSocketServerConnectionEffects,
} from '../features/server-connection/web-socket/ngrx/web-socket-server-connection.effects';
import { metaReducers } from '../ngrx/app.reducers';

@NgModule({
  imports: [
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
})
export class NgrxModule {
}
