import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  TemplateAddDesignComponent,
  TemplateAddDesignComponentModule,
} from './template-add-design.component';

describe('DesignComponent', () => {
  let component: TemplateAddDesignComponent;
  let fixture: ComponentFixture<TemplateAddDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplateAddDesignComponent],
      imports: [BrowserAnimationsModule, TemplateAddDesignComponentModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateAddDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
