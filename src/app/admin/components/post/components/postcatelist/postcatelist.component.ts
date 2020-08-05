import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postcatelist',
  templateUrl: './postcatelist.component.html',
  styleUrls: ['./postcatelist.component.css']
})
export class PostcatelistComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name'];
  dataSource = [
    {
      name: '1'
    }, {
      name: '2'
    }
  ]
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  newPostCate() {
    this.router.navigate(['admin', 'post', 'post-cate', 'create'])
  }

}
