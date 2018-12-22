import { TestBed } from '@angular/core/testing';

import { PanelService } from './panel.service';

describe('PanelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PanelService = TestBed.get(PanelService);
    expect(service).toBeTruthy();
  });
});
