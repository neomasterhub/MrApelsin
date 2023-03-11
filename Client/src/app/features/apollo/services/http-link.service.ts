import { Injectable } from '@angular/core';
import { HttpLink } from 'apollo-angular/http';
import { environment } from '../../../../environments/environment';

@Injectable()
export class HttpLinkService {
  readonly httpLink;

  constructor(httpLink: HttpLink) {
    this.httpLink = httpLink.create({
      uri: environment.graphqlOrigins.http,
    });
  }
}
