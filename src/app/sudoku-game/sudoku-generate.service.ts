import { Injectable } from '@angular/core';
import { leave } from '@angular/core/src/profile/wtf_impl';
function printSudoku(sudoku: Array<Array<number>>) {
  for (let i = 0; i < 9; ++i) {
    console.log(sudoku[i]);
  }
}
function getSudokuResult(sudoku: Array<Array<number>>) {
  const tempResult = helpSudoku(0, 0, sudoku);
  console.log(tempResult);
  printSudoku(sudoku);
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
function generateRandomNum(startNum: number, endNum: number) {
  return Math.floor((endNum - startNum + 1) * Math.random()) + startNum;
}
/**
 * 返回0-n的任意num个不同数的随机排列
 * @param n
 * @param num
 */
function generateRandomSequence(n: number, num: number) {
  if (num > n + 1) {
    throw new Error('illegal input');
  }
  const ArrayTemp = [];
  for (let i = 0; i < n + 1; ++i) {
    ArrayTemp.push(i);
  }
  for (let i = 0; i < num; ++i) {
    const nRandom = generateRandomNum(i, n);
    const Temp = ArrayTemp[i];
    ArrayTemp[i] = ArrayTemp[nRandom];
    ArrayTemp[nRandom] = Temp;
  }
  return ArrayTemp.slice(0, num);
}
enum GameLevelDefine {
  level_easy = 1,
  level_normal = 2,
  level_hard = 3,
  level_hell = 4
}
class GameLevel {
  private m_arraybShow: Array<Array<boolean>>;
  private m_arrayRowItemNumShow: Array<number>;
  constructor(private m_level: GameLevelDefine) {
    this.m_arrayRowItemNumShow = [];
    this.m_arraybShow = [];
    for (let i = 0; i < 9; ++i) {
      const arrayItem = [];
      for (let j = 0; j < 9; ++j) {
        arrayItem.push(false);
      }
      this.m_arraybShow.push(arrayItem);
    }
  }
  generateAllShowItem() {
    // 重置显示
    for (let i = 0; i < 9; ++i) {
      for (let j = 0; j < 9; ++j) {
        this.m_arraybShow[i][j] = false;
      }
    }
    switch (this.m_level) {
      case 1:
        this.setEasyLevel();
        break;
      case 2:
        this.setNormalLevel();
        break;
      case 3:
        this.setHardLevel();
        break;
      case 4:
        this.setHellLevel();
        break;
      default:
        break;
    }
    if (this.m_level <= 2) {
      for (let i = 0; i < 9; ++i) {
        this.generateRowShow(this.m_arraybShow[i], this.m_arrayRowItemNumShow[i]);
      }
    } else {
      for (let i = 0; i < 5; ++i) {
        this.generateRowShow(this.m_arraybShow[i], this.m_arrayRowItemNumShow[i]);
      }
      for (let i = 5; i < 9; ++i) {
        // defaultshow[a] = defaultshow[8 - a];//困难的地狱的对称
        for (let j = 0; j < 9; ++j) {
          this.m_arraybShow[i][j] = this.m_arraybShow[8 - i][j];
        }
      }
    }
    return this.m_arraybShow;
  }
  generateRowShow(arrayInput: Array<boolean>, numToShow: number) {
    const arrayTemp = generateRandomSequence(8, numToShow);
    for (let i = 0; i < arrayTemp.length; ++i) {
      arrayInput[arrayTemp[i]] = true;
    }
  }
  setEasyLevel() {
    // 36 - 39
    let randomNum = generateRandomNum(4, 6);
    const arrayR = this.m_arrayRowItemNumShow;
    arrayR[0] = arrayR[3] = arrayR[6] = randomNum;
    randomNum = generateRandomNum(3, 4);
    arrayR[1] = arrayR[7] = randomNum;
    arrayR[2] = arrayR[5] = arrayR[8] = Math.floor((33 - (3 * arrayR[0] + 2 * arrayR[1])) / 3);
    randomNum = generateRandomNum(4, 6);
    arrayR[4] = randomNum;
  }
  setNormalLevel() {
    // 30 - 36
    let randomNum = generateRandomNum(3, 6);
    const arrayR = this.m_arrayRowItemNumShow;
    arrayR[0] = arrayR[3] = arrayR[6] = randomNum;
    randomNum = generateRandomNum(2, 3);
    arrayR[1] = arrayR[7] = randomNum;
    arrayR[2] = arrayR[5] = arrayR[8] = Math.floor((28 - (3 * arrayR[0] + 2 * arrayR[1])) / 3);
    randomNum = generateRandomNum(3, 5);
    arrayR[4] = randomNum;
  }
  setHardLevel() {
    // 29 - 31
    let randomNum = generateRandomNum(3, 5);
    const arrayR = this.m_arrayRowItemNumShow;
    arrayR[0] = arrayR[8] = randomNum;
    arrayR[1] = arrayR[7] = 7 - arrayR[0];
    randomNum = generateRandomNum(2, 3);
    arrayR[2] = arrayR[6] = randomNum;
    arrayR[3] = arrayR[5] = 7 - arrayR[2];
    randomNum = generateRandomNum(1, 3);
    arrayR[4] = randomNum;
  }
  setHellLevel() {
    // 27 - 29
    let randomNum = generateRandomNum(3, 5);
    const arrayR = this.m_arrayRowItemNumShow;
    arrayR[0] = arrayR[8] = randomNum;
    arrayR[1] = arrayR[7] = 6 - arrayR[0];
    randomNum = generateRandomNum(2, 3);
    arrayR[2] = arrayR[6] = randomNum;
    arrayR[3] = arrayR[5] = 7 - arrayR[2];
    randomNum = generateRandomNum(1, 3);
    arrayR[4] = randomNum;
  }
}
@Injectable()
export class SudokuGenerateService {
  private m_arraySeed: Array<Array<number>>;
  private m_level: number;
  constructor() {
    this.m_level = 1;
    const temp: Array<Array<number>> = [];
    temp.push([8, 7, 4, 6, 3, 1, 5, 9, 2]);
    temp.push([5, 9, 6, 7, 2, 8, 4, 3, 1]);
    temp.push([2, 3, 1, 4, 5, 9, 6, 8, 7]);
    temp.push([4, 8, 2, 1, 9, 6, 7, 5, 3]);
    temp.push([7, 6, 5, 3, 8, 4, 2, 1, 9]);
    temp.push([9, 1, 3, 5, 7, 2, 8, 4, 6]);
    temp.push([3, 2, 9, 8, 6, 5, 1, 7, 4]);
    temp.push([1, 5, 7, 2, 4, 3, 9, 6, 8]);
    temp.push([6, 4, 8, 9, 1, 7, 3, 2, 5]);
    this.m_arraySeed = temp;
  }
  setLevel(level: number) {
    this.m_level = level;
  }
  printSudoku(sudoku: Array<Array<number>>) {
    for (let i = 0; i < 9; ++i) {
      console.log(sudoku[i]);
    }
  }
  generateItem() {
    const changeNum1 = generateRandomNum(10, 20);
    for (let i = 0; i < changeNum1; ++i) {
      const ArrayChange = generateRandomSequence(8, 2);
      this.changeNum(ArrayChange[0] + 1, ArrayChange[1] + 1);
    }
    const changeNum2 = generateRandomNum(8, 12);
    for (let i = 0; i < changeNum2; ++i) {

      const ArrayChangeRow = generateRandomSequence(2, 2);
      const RowStartId = generateRandomNum(0, 2) * 3;
      this.changeRow(RowStartId + ArrayChangeRow[0], RowStartId + ArrayChangeRow[1]);
      const ArrayChangeCol = generateRandomSequence(2, 2);
      const ColStartId = generateRandomNum(0, 2) * 3;
      this.changeCol(ColStartId + ArrayChangeCol[0], ColStartId + ArrayChangeCol[1]);
      console.log(ColStartId + ArrayChangeCol[0], ColStartId + ArrayChangeCol[1]);
      const ChangeThreeIdRow = generateRandomNum(0, 1);
      this.changeRowThree(ChangeThreeIdRow * 3);
      const ChangeThreeIdCol = generateRandomNum(0, 1);
      this.changeColThree(ChangeThreeIdCol * 3);
    }
    this.printSudoku(this.m_arraySeed);
    const gameLevel = new GameLevel(this.m_level);
    const arrayShow = gameLevel.generateAllShowItem();
    const arrayGame = [];
    for (let i = 0; i < 9; ++i) {
      const arrayTemp = [];
      for (let j = 0; j < 9; ++j) {
        if (arrayShow[i][j] === true) {
          arrayTemp.push(this.m_arraySeed[i][j]);
        } else {
          arrayTemp.push(0);
        }
      }
      arrayGame.push(arrayTemp);
    }
    console.log('game rng is ：');
    this.printSudoku(arrayGame);
    return arrayGame;
  }
  // 交换两个数字
  changeNum(num1: number, num2: number) {
    for (let i = 0; i < 9; ++i) {
      for (let j = 0; j < 9; ++j) {
        if (this.m_arraySeed[i][j] === num1) {
          this.m_arraySeed[i][j] = num2;
        } else if (this.m_arraySeed[i][j] === num2) {
          this.m_arraySeed[i][j] = num1;
        }
      }
    }
  }
  changeCol(col1: number, col2: number) {
    for (let i = 0; i < 9; ++i) {
      const temp = this.m_arraySeed[i][col1];
      this.m_arraySeed[i][col1] = this.m_arraySeed[i][col2];
      this.m_arraySeed[i][col2] = temp;
    }
  }
  changeRow(row1: number, row2: number) {
    for (let j = 0; j < 9; ++j) {
      const temp = this.m_arraySeed[row1][j];
      this.m_arraySeed[row1][j] = this.m_arraySeed[row2][j];
      this.m_arraySeed[row2][j] = temp;
    }
  }
  changeRowThree(startRowIndex: number) {
    if (startRowIndex % 3 !== 0 || startRowIndex > 6) {
      throw new Error('Error input!!!');
    }
    for (let i = 0; i < 3; ++i) {
      this.changeRow(startRowIndex + i, startRowIndex + i + 3);
    }

  }
  changeColThree(startColIndex: number) {
    if (startColIndex % 3 !== 0 || startColIndex > 6) {
      throw new Error('Error input!!!');
    }
    for (let j = 0; j < 3; ++j) {
      this.changeCol(startColIndex + j, startColIndex + j + 3);
    }
  }
  checkGameWin(userSudoku: Array<Array<number>>): boolean {
    for (let i = 0; i < 9; ++i) {
      for (let j = 0; j < 9; ++j) {
        if (userSudoku[i][j] === 0) {
          return false;
        } else {
          if (!checkSudolegal(i, j, userSudoku)) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
