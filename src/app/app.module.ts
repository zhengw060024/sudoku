import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { SudokuGameComponent } from './sudoku-game/sudoku-game.component';
import { SudokuGenerateService } from './sudoku-game/sudoku-generate.service';
import { SudokuGameCalculateComponent } from './sudoku-game-calculate/sudoku-game-calculate.component';
const appRoutes: Routes = [
  { path: 'game', component: SudokuGameComponent },
  { path: 'calculate',  component: SudokuGameCalculateComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SudokuGameComponent,
    SudokuGameCalculateComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    SudokuGenerateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
