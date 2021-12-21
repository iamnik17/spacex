import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchdataComponent } from './launchdata.component';

describe('LaunchdataComponent', () => {
  let component: LaunchdataComponent;
  let fixture: ComponentFixture<LaunchdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaunchdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
