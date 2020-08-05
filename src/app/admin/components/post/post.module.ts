import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { PostRoutingModule } from './post-routing.module';
import { PostlistComponent } from './components/postlist/postlist.component';
import { PostformComponent } from './components/postform/postform.component';
import { PostcatelistComponent } from './components/postcatelist/postcatelist.component';
import { PostcateformComponent } from './components/postcateform/postcateform.component';
import { PostCateService } from './services/post-cate.service';


@NgModule({
  declarations: [PostlistComponent, PostformComponent, PostcatelistComponent, PostcateformComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [PostCateService]
})
export class PostModule { }
