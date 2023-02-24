import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { ConsumeServerMessagesService } from '../services/consume-server-messages.service';

@Injectable()
export class ServerConnectionEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly service: ConsumeServerMessagesService,
  ) {
  }
}
