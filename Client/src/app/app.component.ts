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
