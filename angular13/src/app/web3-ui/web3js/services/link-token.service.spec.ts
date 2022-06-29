import { TestBed } from '@angular/core/testing';

import { LinkTokenService } from './link-token.service';

describe('LinkTokenService', () => {
  let service: LinkTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
