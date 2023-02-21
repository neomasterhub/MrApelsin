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
