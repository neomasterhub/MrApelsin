import { Maybe } from 'graphql/jsutils/Maybe';
import { ContentType, Scalars, ServerMessageType } from '../../../../graphql/generated/graphql';

export interface IServerMessageModel {
  datetime: Date,
  payload: {
    messageType: ServerMessageType,
    contentType: ContentType,
    content: Maybe<string>,
    utcDatetime: Scalars['DateTime'],
  }
}
