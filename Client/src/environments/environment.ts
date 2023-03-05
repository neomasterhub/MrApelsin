// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { ILongPollingOperation } from '../app/activity-types/long-polling-operation';
import { ServerConnectionType } from '../app/features/server-connection/activity-types/server-connection-type';

const longPollingOperations: ILongPollingOperation[] = [
  {
    name: 'GetHttpPong',
    delay: 2000,
  },
];

export const environment = {
  production: false,
  graphqlOrigins: {
    http: 'http://localhost:5008/graphql',
    ws: 'ws://localhost:5008/graphql',
  },
  serverConnection: {
    connectionType: ServerConnectionType.longPolling,
    webSocket: {
      attemptIntervalSeconds: 2,
    },
    longPolling: {
      operations: longPollingOperations,
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
