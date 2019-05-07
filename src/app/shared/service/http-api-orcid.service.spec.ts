import { TestBed } from '@angular/core/testing';

import { HttpApiOrcidService } from './http-api-orcid.service';

describe('HttpApiOrcidService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpApiOrcidService = TestBed.get(HttpApiOrcidService);
    expect(service).toBeTruthy();
  });
});
