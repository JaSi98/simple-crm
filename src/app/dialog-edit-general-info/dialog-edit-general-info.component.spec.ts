import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditGeneralInfoComponent } from './dialog-edit-general-info.component';

describe('DialogEditGeneralInfoComponent', () => {
  let component: DialogEditGeneralInfoComponent;
  let fixture: ComponentFixture<DialogEditGeneralInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditGeneralInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
