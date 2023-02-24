import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
};

export type AddAuditEventInput = {
  description?: InputMaybe<Scalars['String']>;
  subject?: InputMaybe<Scalars['String']>;
};

export type AppVersion = {
  __typename?: 'AppVersion';
  buildDatetime?: Maybe<Scalars['String']>;
  versionNumber?: Maybe<Scalars['String']>;
};

export type AuditEvent = {
  __typename?: 'AuditEvent';
  dateTimeUtc: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  subject?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type AuditEventSortInput = {
  dateTimeUtc?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  subject?: InputMaybe<SortEnumType>;
  url?: InputMaybe<SortEnumType>;
};

/** A segment of a collection. */
export type AuditEventsCollectionSegment = {
  __typename?: 'AuditEventsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<Maybe<AuditEvent>>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int'];
};

/** Information about the offset pagination. */
export type CollectionSegmentInfo = {
  __typename?: 'CollectionSegmentInfo';
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean'];
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean'];
};

export enum ContentType {
  Json = 'JSON',
  None = 'NONE',
  Text = 'TEXT'
}

export type Mutation = {
  __typename?: 'Mutation';
  addAuditEvent?: Maybe<AuditEvent>;
  ping?: Maybe<ServerMessage>;
};


export type MutationAddAuditEventArgs = {
  e?: InputMaybe<AddAuditEventInput>;
};

export type Query = {
  __typename?: 'Query';
  appVersion?: Maybe<AppVersion>;
  auditEvents?: Maybe<AuditEventsCollectionSegment>;
};


export type QueryAuditEventsArgs = {
  order?: InputMaybe<Array<AuditEventSortInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type ServerMessage = {
  __typename?: 'ServerMessage';
  content?: Maybe<Scalars['String']>;
  contentType: ContentType;
  messageType: ServerMessageType;
};

export enum ServerMessageType {
  AppVersion = 'APP_VERSION',
  Ping = 'PING'
}

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Subscription = {
  __typename?: 'Subscription';
  serverMessageReceived?: Maybe<ServerMessage>;
};

export type PingMutationVariables = Exact<{ [key: string]: never; }>;


export type PingMutation = { __typename?: 'Mutation', ping?: { __typename?: 'ServerMessage', messageType: ServerMessageType, contentType: ContentType, content?: string | null } | null };

export type ServerMessageReceivedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ServerMessageReceivedSubscription = { __typename?: 'Subscription', serverMessageReceived?: { __typename?: 'ServerMessage', messageType: ServerMessageType, contentType: ContentType, content?: string | null } | null };

export const PingDocument = gql`
    mutation Ping {
  ping {
    messageType
    contentType
    content
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PingGQL extends Apollo.Mutation<PingMutation, PingMutationVariables> {
    override document = PingDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ServerMessageReceivedDocument = gql`
    subscription ServerMessageReceived {
  serverMessageReceived {
    messageType
    contentType
    content
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ServerMessageReceivedGQL extends Apollo.Subscription<ServerMessageReceivedSubscription, ServerMessageReceivedSubscriptionVariables> {
    override document = ServerMessageReceivedDocument;

    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
