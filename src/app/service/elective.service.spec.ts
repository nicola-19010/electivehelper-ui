import { TestBed } from '@angular/core/testing';

import { ElectiveService } from './elective.service';

describe('ElectiveService', () => {
  let service: ElectiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElectiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
