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
        }); // true
      }
    });
  }
}
