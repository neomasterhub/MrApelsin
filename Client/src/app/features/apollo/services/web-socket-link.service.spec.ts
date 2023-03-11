import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { WebSocketLinkService } from './web-socket-link.service';

describe('Web Socket link service', () => {
  let service: WebSocketLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot()],
      providers: [WebSocketLinkService],
    });

    service = TestBed.inject(WebSocketLinkService);
  });

  it('should be injected', () => {
    expect(service).toEqual(jasmine.any(WebSocketLinkService));
  });
});
