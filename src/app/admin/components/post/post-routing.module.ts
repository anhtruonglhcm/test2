import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostlistComponent } from './components/postlist/postlist.component';
import { PostcatelistComponent } from './components/postcatelist/postcatelist.component';
import { PostcateformComponent } from './components/postcateform/postcateform.component';

const routes: Routes = [
  {
    path: 'post-list',
    component: PostlistComponent
  },
  {
    path: 'post-cate',
    component: PostcatelistComponent
  },
  {
    path: 'post-cate/create',
    component: PostcateformComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
