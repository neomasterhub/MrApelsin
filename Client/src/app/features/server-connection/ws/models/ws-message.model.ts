import { Maybe } from 'graphql/jsutils/Maybe';
import { ContentType, ServerMessageType } from '../../../../../graphql/generated/graphql';

export interface IWsMessageModel {
  datetime: Date,
  payload: {
    messageType: ServerMessageType,
    contentType: ContentType,
    content: Maybe<string>,
  }
}
