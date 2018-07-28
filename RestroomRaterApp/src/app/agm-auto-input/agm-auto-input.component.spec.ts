import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgmAutoInputComponent } from './agm-auto-input.component';

describe('AgmAutoInputComponent', () => {
  let component: AgmAutoInputComponent;
  let fixture: ComponentFixture<AgmAutoInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgmAutoInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgmAutoInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
