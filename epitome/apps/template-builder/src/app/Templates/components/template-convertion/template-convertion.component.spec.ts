import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxsModule } from '@ngxs/store';

import {
  TemplateConvertionComponent,
  TemplateConvertionComponentModule,
} from './template-convertion.component';

describe('TemplateConvertionComponent', () => {
  let component: TemplateConvertionComponent;
  let fixture: ComponentFixture<TemplateConvertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplateConvertionComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TemplateConvertionComponentModule,
        NgxsModule.forRoot(),
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateConvertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
