import { Component, OnInit } from '@angular/core';

const MAX_WIDTH = 720;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  screenWidth: number;
  constructor() {
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };
  }

  ngOnInit(): void {}
  isSmallScreen(): boolean {
    return this.screenWidth < 720;
  }
}
