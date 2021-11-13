import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { TemplateFacade } from '../../facades';

import {
  TemplateListComponent,
  TemplateListComponentModule,
} from './template-list.component';

describe('TemplatesComponent', () => {
  let component: TemplateListComponent;
  let fixture: ComponentFixture<TemplateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplateListComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TemplateListComponentModule,
        NgxsModule.forRoot(),
        RouterTestingModule,
      ],
      providers: [TemplateFacade],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
