import { ServerConnectionType } from '../app/features/server-connection/activity-types/server-connection-type';

export const environment = {
  production: false,
  graphqlOrigins: {
    http: 'http://localhost:5008/graphql',
    ws: 'ws://localhost:5008/graphql',
  },
  serverConnection: {
    connectionType: ServerConnectionType.longPolling,
    attemptIntervalSeconds: 10,
    longPollingOperation: 'GetHttpPong',
  },
};
