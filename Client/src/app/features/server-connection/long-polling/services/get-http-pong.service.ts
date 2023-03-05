import { Injectable } from '@angular/core';
import { GetHttpPongGQL } from '../../../../../graphql/generated/graphql';

@Injectable()
export class GetHttpPongService {
  constructor(
    private readonly getHttpPongGQL: GetHttpPongGQL,
  ) {
  }

  ping() {
    this.getHttpPongGQL.fetch()
      .subscribe(console.log);
  }
}
