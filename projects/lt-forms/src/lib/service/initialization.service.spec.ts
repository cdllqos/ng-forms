import { TestBed } from '@angular/core/testing';

import { InitializationService } from './initialization.service';

describe('InitializationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InitializationService = TestBed.get(InitializationService);
    expect(service).toBeTruthy();
  });
});
