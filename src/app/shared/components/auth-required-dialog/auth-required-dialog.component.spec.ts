import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRequiredDialogComponent } from './auth-required-dialog.component';

describe('AuthRequiredDialogComponent', () => {
  let component: AuthRequiredDialogComponent;
  let fixture: ComponentFixture<AuthRequiredDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthRequiredDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthRequiredDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
