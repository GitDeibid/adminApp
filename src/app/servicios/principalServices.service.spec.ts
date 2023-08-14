/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PrincipalServicesService } from './principalServices.service';

describe('Service: PrincipalServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrincipalServicesService]
    });
  });

  it('should ...', inject([PrincipalServicesService], (service: PrincipalServicesService) => {
    expect(service).toBeTruthy();
  }));
});
