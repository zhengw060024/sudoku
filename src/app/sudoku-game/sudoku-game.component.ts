import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SudokuGenerateService } from './sudoku-generate.service';

interface CurrentSelect {
  rowId: number;
  colId: number;
}
@Component({
  selector: 'app-sudoku-game',
  templateUrl: './sudoku-game.component.html',
  styleUrls: ['./sudoku-game.component.css']
})
export class SudokuGameComponent implements OnInit {
  sudokuStruct: Array<Array<number>>;
  sudokuArrayOrgin: Array<Array<number>>;
  sudokuUI: Array<Array<string>>;
  bGameWin: boolean;
  strGameResult: string;
  currentItem: CurrentSelect;
  arrayInputNum: Array<number>;
  @Output() onGameWin =  new EventEmitter<boolean>();
  constructor(private sudokuGameGen: SudokuGenerateService) {

    this.arrayInputNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.newGame();
    // this.currentItem = { rowId: -1, colId: -1 };
    // this.strGameResult = '新的游戏,欢迎挑战';
    // this.sudokuStruct = [];
    // const temp: Array<Array<number>> = [];
    // temp.push([8, 0, 4, 6, 3, 0, 0, 0, 2]);
    // temp.push([5, 9, 6, 7, 2, 8, 4, 3, 1]);
    // temp.push([2, 3, 1, 4, 5, 9, 0, 8, 7]);
    // temp.push([0, 8, 0, 1, 0, 6, 7, 0, 3]);
    // temp.push([7, 0, 5, 0, 0, 0, 0, 1, 0]);
    // temp.push([0, 1, 0, 5, 0, 2, 8, 0, 6]);
    // temp.push([3, 2, 9, 8, 6, 5, 1, 7, 4]);
    // temp.push([1, 0, 7, 0, 4, 3, 9, 0, 8]);
    // temp.push([6, 4, 0, 9, 0, 7, 0, 2, 5]);
    // this.bGameWin = false;
    // this.sudokuArrayOrgin = temp;
    // for (let i = 0; i < 9; ++i) {
    //   const arrayRow = [];
    //   for (let j = 0; j < 9; ++j) {
    //     arrayRow.push(this.sudokuArrayOrgin[i][j]);
    //   }
    //   this.sudokuStruct.push(arrayRow);
    // }
  }
  changeGameType(gameLevel: number) {
    console.log(gameLevel);
    if (gameLevel === 1) {
      console.log('ok');
    }
    this.sudokuGameGen.setLevel(gameLevel);
  }
  newGame() {
    this.bGameWin = false;
    this.strGameResult = '新的游戏,欢迎挑战';
    this.sudokuStruct = [];
    this.currentItem = { rowId: -1, colId: -1 };
    this.sudokuArrayOrgin = this.sudokuGameGen.generateItem();
    for (let i = 0; i < 9; ++i) {
      const arrayRow = [];
      for (let j = 0; j < 9; ++j) {
        arrayRow.push(this.sudokuArrayOrgin[i][j]);
      }
      this.sudokuStruct.push(arrayRow);
    }
  }
  checkGameWin() {
    return this.sudokuGameGen.checkGameWin(this.sudokuStruct);
  }
  testAdd(input: number) {
    return input + 1;
  }
  dataToString(input: number) {
    if (input === 0) {
      return ' ';
    }
    return input;
  }
  getItemData(input: number, rowId, colId) {
    if (this.sudokuArrayOrgin[rowId][colId] !== 0) {
      return 'blue';
    }
    if (this.currentItem.rowId === rowId && this.currentItem.colId === colId) {
      return 'red';
    }
    return 'green';
  }
  doChectItem(rowId, colId) {
    console.log(rowId, colId);
    if (this.sudokuArrayOrgin[rowId][colId] === 0) {
      this.currentItem.rowId = rowId;
      this.currentItem.colId = colId;
    }
  }
  onClickNum(num: number) {
    if (this.bGameWin) {
      return ;
    }
    if (this.currentItem.rowId !== -1 && this.currentItem.colId !== -1) {
      const i = this.currentItem.rowId;
      const j = this.currentItem.colId;
      this.sudokuStruct[i][j] = num;
      const gameResult = this.checkGameWin();
      if (gameResult) {
        this.bGameWin = true;
        // 发送时间通知已经胜利了
        this.strGameResult = '恭喜你求解成功！！！！';
        this.onGameWin.emit(true);
      }
    }
  }
  removeNum() {
    if (this.bGameWin) {
      return ;
    }
    if (this.currentItem.rowId !== -1 && this.currentItem.colId !== -1) {
      const i = this.currentItem.rowId;
      const j = this.currentItem.colId;
      this.sudokuStruct[i][j] = 0;
    }
  }
  ngOnInit() {
  }
}
