import { Maybe } from 'graphql/jsutils/Maybe';
import { ServerMessageType } from '../../../../graphql/generated/graphql';

export interface IServerMessageModel {
  datetime: Date,
  payload: {
    messageType: ServerMessageType,
    text: Maybe<string>,
  }
}
