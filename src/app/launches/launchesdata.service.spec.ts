import { inject, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { LaunchesdataService } from './launchesdata.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Launches } from './launches.model';
describe('LaunchesdataService', () => {
  let service: LaunchesdataService;
  let mockhttpclient;
  let httpTestingController:HttpTestingController;
   let url:string="https://api.spacexdata.com/v3/launches";
   let httpClientSpy: { get: jasmine.Spy };
  //  let expectedTarifs;
   let baseUrl = "api/spacedata";
  let traveller: Launches;
  let Response;
  
  beforeEach(() => {
    service = new LaunchesdataService(mockhttpclient);
    TestBed.configureTestingModule({
       imports: [HttpClientTestingModule], providers: [LaunchesdataService,HttpClient] ,
        });
    service = TestBed.inject(LaunchesdataService);
  // LaunchesdataService.getlaunchesData = true;
  httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  service = new LaunchesdataService(<any><any> httpClientSpy);
  traveller = {
    id: 1,
    launch_name:'falcon',
    launch_year: 2020 ,
    launch_date_utc:20/10/2020,
    orbit:'leo',
    launch_success:true,
    thumbnailUrl:'image'
  };

    
  });

  it('should be created', inject([LaunchesdataService], (service: LaunchesdataService) => {
    expect(service).toBeTruthy();
  }));
  it('should return undefined getlaunchesData when server returns 404', () => {
    let succeeded = false;
    let body= undefined;

    service.getlaunchesData('42').subscribe((response) => {
      succeeded = true;
      // body = response;
    });

    const testRequest = httpTestingController.expectOne('https://api.spacexdata.com/v3/launches');
    testRequest.flush('', { status: 404, statusText: 'Not Found' });

    expect(succeeded).toBeTrue();
    expect(body).toBeUndefined();
  });
 
  it('should return undefined failed when server returns 404', () => {
    let succeeded = false;
    let body= undefined;

    service.failed('42').subscribe((response) => {
      succeeded = true;
      // body = response;
    });

    const testRequest = httpTestingController.expectOne('https://api.spacexdata.com/v3/launches');
    testRequest.flush('', { status: 404, statusText: 'Not Found' });

    expect(succeeded).toBeTrue();
    expect(body).toBeUndefined();
  });
  it('should return undefined success when server returns 404', () => {
    let succeeded = false;
    let body= undefined;

    service.success('42').subscribe((response) => {
      succeeded = true;
      // body = response;
    });

    const testRequest = httpTestingController.expectOne('https://api.spacexdata.com/v3/launches');
    testRequest.flush('', { status: 404, statusText: 'Not Found' });

    expect(succeeded).toBeTrue();
    expect(body).toBeUndefined();
  });
 
  it('should return undefined upcoming when server returns 404', () => {
    let succeeded = false;
    let body= undefined;

    service.upcoming('42').subscribe((response) => {
      succeeded = true;
      // body = response;
    });

    const testRequest = httpTestingController.expectOne('https://api.spacexdata.com/v3/launches');
    testRequest.flush('', { status: 404, statusText: 'Not Found' });

    expect(succeeded).toBeTrue();
    expect(body).toBeUndefined();
  });
 
  it('should return undefined all when server returns 404', () => {
    let succeeded = false;
    let body= undefined;

    service.all('42').subscribe((response) => {
      succeeded = true;
      // body = response;
    });

    const testRequest = httpTestingController.expectOne('https://api.spacexdata.com/v3/launches');
    testRequest.flush('', { status: 404, statusText: 'Not Found' });

    expect(succeeded).toBeTrue();
    expect(body).toBeUndefined();
  });
 


  it('should use getlaunchesData Function', (done: DoneFn) => {
    service = TestBed.inject(LaunchesdataService);
  //  service.getlaunchesData().subscribe(res=>{
  //    expect(res).toBeDefined()
    expect(service.getlaunchesData()).toBeDefined();
    spyOn(service,'getlaunchesData');
    service.getlaunchesData();
    expect(service.getlaunchesData).toHaveBeenCalled();
 
done();
   })
  // it('should be creturn service data', () => {
  //   let mockResponse=[
  //     {id:1,launch_name:'falcon'},
  //     {id:1,launch_name:'falcon'},
  //     {id:1,launch_name:'falcon'}

  // ];
  //   spyOn(service,'getlaunchesData')
  //   // LaunchesdataService.get().subscribe(res=>{
  //   //   Response=res
  //   // })
  //   expect(service).toHaveBeenCalled();
  // });
  // it('should be created', () => {
  //   const service: LaunchesdataService = TestBed.get(LaunchesdataService);
  //   expect(service).toHaveBeenCalled();
  // });
  
  it('should use getData Function', () => {
    // spyOn(service,'getlaunchesData')
    service = TestBed.inject(LaunchesdataService);
   
    expect(service.getlaunchesData()).toBeTruthy();
  });
  it('should use getData Function', () => {
    service = TestBed.inject(LaunchesdataService);
    expect(service.failed()).toBeTruthy();
  });
  it('should use getData Function', () => {
    service = TestBed.inject(LaunchesdataService);
    expect(service.success()).toBeTruthy();
  });
  it('should use getData Function', () => {
    service = TestBed.inject(LaunchesdataService);
    expect(service.upcoming()).toBeTruthy();
  });
  it('should use getData Function', () => {
    service = TestBed.inject(LaunchesdataService);
    expect(service.all()).toBeTruthy();
  });
});

