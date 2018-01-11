import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuGameCalculateComponent } from './sudoku-game-calculate.component';

describe('SudokuGameCalculateComponent', () => {
  let component: SudokuGameCalculateComponent;
  let fixture: ComponentFixture<SudokuGameCalculateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SudokuGameCalculateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SudokuGameCalculateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
