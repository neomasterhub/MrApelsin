# Drafts

**Apollo Client**
 + [Pure Query](#1)
 + [Pure Subscription](#2)
 + [Typed Subscription](#3)

## <a name="1"></a> Pure Query
```ts
import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  sub?: Subscription;

  constructor(private apollo: Apollo) {
  }

  getAuditEvents() {
    this.sub = this.apollo
    .query({
      query: gql`query {
        auditEvents {
          id
          url
        }
      }`
    })
    .subscribe({
      next: (result) => {
        console.log(result.data);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log({
          'sub closed': this.sub?.closed,
        }); // false
      }
    });
  }
}
```
## <a name="2"></a> Pure Subscription

```ts
import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  sub?: Subscription;

  constructor(private apollo: Apollo) {
  }

  openWS() {
    this.sub = this.apollo
    .subscribe({
      query: gql`subscription {
        serverMessageReceived {
          messageType
          text
        }
      }`,
    })
    .subscribe({
      next: (result) => {
        console.log(result.data);
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log({
          'sub closed': this.sub?.closed,
        }); // false
      }
    });
  }
}
```
## <a name="3"></a> Typed Subscription
```ts
import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ServerMessageReceivedGQL } from '../graphql/generated/graphql';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  constructor(
    private apollo: Apollo,
    private serverMessageReceivedGQL: ServerMessageReceivedGQL
  ) {
  }

  ngOnInit(): void {
    this.serverMessageReceivedGQL.subscribe()
      .subscribe(({ data }) => {
        console.log(data?.serverMessageReceived);
      });
  }
}

```
