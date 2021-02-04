import { TestBed } from '@angular/core/testing';

import { DataLocalService } from './data-local.service';

describe('DataLocalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataLocalService = TestBed.get(DataLocalService);
    expect(service).toBeTruthy();
  });
});
