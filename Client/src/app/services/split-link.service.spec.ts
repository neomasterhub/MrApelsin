import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { HttpLinkService } from './http-link.service';
import { RetryLinkService } from './retry-link.service';
import { SplitLinkService } from './split-link.service';
import { WebSocketLinkService } from './web-socket-link.service';

describe('Split link service', () => {
  let service: SplitLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(),
      ],
      providers: [
        RetryLinkService,
        WebSocketLinkService,
        HttpLinkService,
        SplitLinkService,
      ],
    });

    service = TestBed.inject(SplitLinkService);
  });

  it('should be injected', () => {
    expect(service).toEqual(jasmine.any(SplitLinkService));
  });
});
