import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '新的游戏';
  userType = 1;
  changeUserType(type: number) {
    this.userType = type;
  }
  gameWin() {
    this.title = '你赢了';
  }
}
