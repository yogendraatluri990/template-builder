import { ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import { TemplatePage} from './template.page';

describe('TemplatePage', () => {
  let component: TemplatePage;
  let fixture: ComponentFixture<TemplatePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplatePage ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
