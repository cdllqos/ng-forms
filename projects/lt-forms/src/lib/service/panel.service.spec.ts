import { TestBed } from '@angular/core/testing';

import { ComponentService } from './component.service';
import { PanelService } from './panel.service';

describe('PanelService', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [PanelService, ComponentService] }));

  it('should be created', () => {
    const service: PanelService = TestBed.get(PanelService);
    expect(service).toBeTruthy();
  });
});
