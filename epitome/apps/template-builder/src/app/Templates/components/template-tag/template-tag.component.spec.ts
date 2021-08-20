import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxsModule } from '@ngxs/store';

import {
  TemplateTagComponentModule,
  TemplateTagComponent,
} from './template-tag.component';

describe('TagsComponent', () => {
  let component: TemplateTagComponent;
  let fixture: ComponentFixture<TemplateTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplateTagComponent],
      imports: [BrowserAnimationsModule, HttpClientTestingModule, TemplateTagComponentModule, NgxsModule.forRoot()],
      providers: [MatSnackBar],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateTagComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
