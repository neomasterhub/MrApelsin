import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { RetryLinkService } from './retry-link.service';

describe('Retry link service', () => {
  let service: RetryLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot()],
      providers: [RetryLinkService],
    });

    service = TestBed.inject(RetryLinkService);
  });

  it('should be injected', () => {
    expect(service).toEqual(jasmine.any(RetryLinkService));
  });
});
