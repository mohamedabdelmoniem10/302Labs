import { TestBed, async, inject } from '@angular/core/testing';

import { ErrrGuard } from './errr.guard';

describe('ErrrGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrrGuard]
    });
  });

  it('should ...', inject([ErrrGuard], (guard: ErrrGuard) => {
    expect(guard).toBeTruthy();
  }));
});
