import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGuideComponent } from './add-guide.component';

describe('AddGuideComponent', () => {
  let component: AddGuideComponent;
  let fixture: ComponentFixture<AddGuideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddGuideComponent]
    });
    fixture = TestBed.createComponent(AddGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
