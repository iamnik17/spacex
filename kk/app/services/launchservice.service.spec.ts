import { TestBed } from '@angular/core/testing';

import { LaunchserviceService } from './launchservice.service';

describe('LaunchserviceService', () => {
  let service: LaunchserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaunchserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
