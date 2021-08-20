import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxsModule } from '@ngxs/store';

import {
  TemplateDesignComponent,
  TemplateDesignComponentModule,
} from './template-design.component';
import { TemplateTagComponent } from '../template-tag/template-tag.component';

describe('CustomTemplatesComponent', () => {
  let component: TemplateDesignComponent;
  let fixture: ComponentFixture<TemplateDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplateDesignComponent, TemplateTagComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TemplateDesignComponentModule,
        RouterTestingModule,
        NgxsModule.forRoot(),
      ],
      providers: [MatSnackBar],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
