import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutBureauComponent } from './ajout-bureau.component';

describe('AjoutBureauComponent', () => {
  let component: AjoutBureauComponent;
  let fixture: ComponentFixture<AjoutBureauComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutBureauComponent]
    });
    fixture = TestBed.createComponent(AjoutBureauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
