import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let router:any;
  let route:any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        RouterModule,
     
      ],
      declarations: [
        AppComponent,
        RouterOutlet
      ],
      providers: [
      ]
    }).compileComponents();
  });
  beforeEach(() => {
    router = TestBed.get(Router)
    route = TestBed.get(ActivatedRoute)
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'SpaceXDashboard'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('SpaceXDashboard');
  });

  it('should render title in h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('SpaceXDashboard');
  });
  
});
