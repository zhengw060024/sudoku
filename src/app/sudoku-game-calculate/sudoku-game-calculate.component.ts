import { Component, OnInit, HostListener } from '@angular/core';
interface CurrentSelect {
  rowId: number;
  colId: number;
}
function printSudoku(sudoku: Array<Array<number>>) {
  for (let i = 0; i < 9; ++i) {
    console.log(sudoku[i]);
  }
}
function getSudokuResult(sudoku: Array<Array<number>>) {
  const tempResult = helpSudoku(0, 0, sudoku);
  console.log(tempResult);
  printSudoku(sudoku);
  return tempResult;
}
function helpSudoku(i: number, j: number, sudoku: Array<Array<number>>): boolean {
  if (i === 9) {
    return true;
  }
  if (j >= 9) {
    return helpSudoku(i + 1, 0, sudoku);
  }
  if (sudoku[i][j] === 0) {
    for (let k = 1; k < 10; ++k) {
      sudoku[i][j] = k;
      // 如果合法做下一次選擇
      if (checkSudolegal(i, j, sudoku)) {
        // 如果找到直接返回正確，如果此節點找不到數據，直接返回上一個節點
        if (helpSudoku(i, j + 1, sudoku)) {
          // console.log('Get result!!!');
          // printSudoku(sudoku);
          return true;
        }
      }
    }
    // 如果沒有找到，在回退到上一個節點之前，需要將數據重置
    sudoku[i][j] = 0;
  } else {
    return helpSudoku(i, j + 1, sudoku);
  }
  return false;
}

function checkSudolegal(k: number, t: number, sudoku: Array<Array<number>>): boolean {
  const temp = sudoku[k][t];
  for (let i = 0; i < 9; ++i) {
    if (i !== k) {
      if (sudoku[i][t] === temp) {
        return false;
      }
    }
  }
  for (let j = 0; j < 9; ++j) {
    if (j !== t) {
      if (sudoku[k][j] === temp) {
        return false;
      }
    }
  }
  const iRowStart = Math.floor(k / 3) * 3;
  const jColStart = Math.floor(t / 3) * 3;
  for (let i = iRowStart; i < iRowStart + 3; ++i) {
    for (let j = jColStart; j < jColStart + 3; ++j) {
      if ((i !== k) && (j !== t)) {
        if (sudoku[i][j] === temp) {
          return false;
        }
      }
    }
  }
  return true;
}

@Component({
  selector: 'app-sudoku-game-calculate',
  templateUrl: './sudoku-game-calculate.component.html',
  styleUrls: ['./sudoku-game-calculate.component.css']
})
export class SudokuGameCalculateComponent implements OnInit {

  sudokuStruct: Array<Array<number>>;
  currentItem: CurrentSelect;
  arrayInputNum: Array<number>;
  bGetSoduResult: boolean;
  computeresultInfo: string;
  constructor() {
    this.arrayInputNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.resetArrayGame();
  }
  @HostListener('window:keydown', ['$event'])
  _handleKeydown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    // console.error(keyCode);
      //   const keyCode = event.keyCode;
    if ((keyCode > 48 && keyCode <= 57)) {
      if (this.bGetSoduResult) {
        return;
      }
      if (this.currentItem.rowId !== -1 && this.currentItem.colId !== -1) {
        const i = this.currentItem.rowId;
        const j = this.currentItem.colId;
        this.sudokuStruct[i][j] = keyCode - 48;
      }
    } else {
    }
    console.log('ssssssss', keyCode);
  }
  resetArrayGame() {
    this.sudokuStruct = [];
    this.bGetSoduResult = false;
    for (let i = 0; i < 9; ++i) {
      const arrayTemp = [];
      for (let j = 0; j < 9; ++j) {
        arrayTemp.push(0);
      }
      this.sudokuStruct.push(arrayTemp);
    }
    this.currentItem = { rowId: -1, colId: -1 };
  }

  testAdd(input: number) {
    return input + 1;
  }
  doChectItem(rowId, colId) {
    console.log(rowId, colId);
    this.currentItem.rowId = rowId;
    this.currentItem.colId = colId;
  }
  dataToString(input: number) {
    if (input === 0) {
      return ' ';
    }
    return input;
  }
  getItemData(input: number, rowId, colId) {
    if (this.currentItem.rowId === rowId && this.currentItem.colId === colId) {
      return 'red';
    }
    return 'green';
  }
  onClickNum(num: number) {
    if (this.bGetSoduResult) {
      return;
    }
    if (this.currentItem.rowId !== -1 && this.currentItem.colId !== -1) {
      const i = this.currentItem.rowId;
      const j = this.currentItem.colId;
      this.sudokuStruct[i][j] = num;
    }
  }
  removeNum() {
    if (this.currentItem.rowId !== -1 && this.currentItem.colId !== -1) {
      const i = this.currentItem.rowId;
      const j = this.currentItem.colId;
      this.sudokuStruct[i][j] = 0;
    }
  }
  getResult() {
    if (this.bGetSoduResult) {
      return;
    }
    // 先判断数组中非0数目是否大于20个如果少于20个直接返回数据太少
    let nCount = 0;
    for (let i = 0; i < 9; ++i) {
      for (let j = 0; j < 9; ++j) {
        if (this.sudokuStruct[i][j] !== 0) {
          ++nCount;
        }
      }
    }
    if (nCount < 20) {
      this.computeresultInfo = '请在输入一些数据，目前的数据太少了';
      return;
    }
    // 检查输入数据是否合法
    if (!this.checkInputLegal(this.sudokuStruct)) {
      this.computeresultInfo = '输入的数据不合法';
      return;
    }
    if (getSudokuResult(this.sudokuStruct)) {
      this.bGetSoduResult = true;
      this.computeresultInfo = '已经成功求解数独';
    } else {
      this.computeresultInfo = '该数独无解！';
    }
  }
  checkInputLegal(userSudoku: Array<Array<number>>): boolean {
    for (let i = 0; i < 9; ++i) {
      for (let j = 0; j < 9; ++j) {
        if (userSudoku[i][j] !== 0) {
          if (!checkSudolegal(i, j, userSudoku)) {
            return false;
          }
        }
      }
    }
    return true;
  }
  // onKeyPress(event: any) {
  //   const keyCode = event.keyCode;
  //   if ((keyCode >= 48 && keyCode <= 57)) {
  //     event.returnValue = true;
  //   } else {
  //     event.returnValue = false;
  //   }
  //   console.log('keycode');
  // }
  /** Handles all keydown events on the select. */
  ngOnInit() {
  }

}
