import { createClient } from 'graphql-ws';
import { environment } from '../../environments/environment';

export const graphqlWsClient = createClient({
  url: environment.graphqlOrigins.ws,
});
