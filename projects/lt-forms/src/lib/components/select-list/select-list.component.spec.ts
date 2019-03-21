import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ComponentService, PanelService} from '../../service';
import {ListItemComponent} from '../list-item/list-item.component';

import {SelectListComponent} from './select-list.component';

describe('SelectListComponent', () => {
  let component: SelectListComponent;
  let fixture: ComponentFixture<SelectListComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          declarations: [SelectListComponent, ListItemComponent],
          providers: [ComponentService, PanelService]
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
