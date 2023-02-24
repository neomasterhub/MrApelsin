import { Injectable } from '@angular/core';
import { ApolloError } from '@apollo/client';
import { Store } from '@ngrx/store';
import { filter, interval, takeUntil, tap, throwError } from 'rxjs';
import { PingGQL } from '../../../../graphql/generated/graphql';
import { ServerStatusModel } from '../models/server-status.model';

@Injectable()
export class PingServerService {
  constructor(
    private readonly pingGQL: PingGQL,
    private readonly store: Store<{ serverStatus: ServerStatusModel }>) {
  }

  ping() {
    interval(1000)
      .pipe(
        takeUntil(this.store.select(s => s.serverStatus).pipe(
          filter((serverStatus) => serverStatus !== ServerStatusModel.ping),
        )),
        tap(() => this.pingGQL.mutate()
          .subscribe({
            error: (e) => throwError(() => new Error(e)),
          }),
        ),
      )
      .subscribe({
        error: (e: ApolloError) => console.error(e),
      });
  }
}
