import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExpdtComponent } from './edit-expdt.component';

describe('EditExpdtComponent', () => {
  let component: EditExpdtComponent;
  let fixture: ComponentFixture<EditExpdtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExpdtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExpdtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
