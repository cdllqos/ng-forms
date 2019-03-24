import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentService, PanelService } from '../../service';
import { SelectComponent } from '../select/select.component';

import { AddressComponent } from './address.component';

describe('AddresComponent', () => {
  let component: AddressComponent;
  let fixture: ComponentFixture<AddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddressComponent, SelectComponent],
      providers: [ComponentService, PanelService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
