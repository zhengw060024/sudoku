import { TestBed, inject } from '@angular/core/testing';

import { SudokuGenerateService } from './sudoku-generate.service';

describe('SudokuGenerateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SudokuGenerateService]
    });
  });

  it('should be created', inject([SudokuGenerateService], (service: SudokuGenerateService) => {
    expect(service).toBeTruthy();
  }));
});
