import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { GetHttpPongGQL, GetHttpPongQuery } from '../../../../../graphql/generated/graphql';

@Injectable()
export class GetHttpPongService {
  readonly pollInterval = environment.serverConnection.longPolling.longPollingOperations
    .find((o) => o.name === 'GetHttpPong')!.delay;

  readonly valueChanges: Observable<ApolloQueryResult<GetHttpPongQuery>>;

  constructor(getHttpPongGQL: GetHttpPongGQL) {
    this.valueChanges = getHttpPongGQL.watch({}, {
      pollInterval: this.pollInterval,
      fetchPolicy: 'network-only',
    }).valueChanges;
  }

  ping() {
    this.valueChanges.subscribe(console.log);
  }
}
