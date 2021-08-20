import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAddTagComponent } from './template-add-tag.component';

describe('TemplateAddTagComponent', () => {
  let component: TemplateAddTagComponent;
  let fixture: ComponentFixture<TemplateAddTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateAddTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateAddTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
