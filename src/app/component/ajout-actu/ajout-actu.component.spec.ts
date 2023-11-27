import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutActuComponent } from './ajout-actu.component';

describe('AjoutActuComponent', () => {
  let component: AjoutActuComponent;
  let fixture: ComponentFixture<AjoutActuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutActuComponent]
    });
    fixture = TestBed.createComponent(AjoutActuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
