import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpLinkService } from './http-link.service';

describe('HTTP link service', () => {
  let service: HttpLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpLinkService],
    });

    service = TestBed.inject(HttpLinkService);
  });

  it('should be injected', () => {
    expect(service).toEqual(jasmine.any(HttpLinkService));
  });
});
