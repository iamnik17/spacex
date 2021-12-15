import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelcontentComponent } from './modelcontent.component';

describe('ModelcontentComponent', () => {
  let component: ModelcontentComponent;
  let fixture: ComponentFixture<ModelcontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelcontentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
