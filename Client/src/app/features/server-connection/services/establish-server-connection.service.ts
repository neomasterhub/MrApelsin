import { Injectable } from '@angular/core';
import { ApolloError } from '@apollo/client';
import { Maybe } from 'graphql/jsutils/Maybe';
import { tap } from 'rxjs';
import { ServerMessage, ServerMessageReceivedGQL } from '../../../../graphql/generated/graphql';

@Injectable()
export class EstablishServerConnectionService {
  constructor(private serverMessageReceivedGQL: ServerMessageReceivedGQL) {
  }

  establish(
    messageHandler: (data: Maybe<ServerMessage>) => void,
    errorHandler: (error: ApolloError) => void,
  ) {
    this.serverMessageReceivedGQL.subscribe()
      .pipe(
        tap(({ data }) => messageHandler(data?.serverMessageReceived)),
      )
      .subscribe({
        error: (error: ApolloError) => errorHandler(error),
      });
  }
}
