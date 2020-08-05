import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostCateService } from '../../services/post-cate.service';

@Component({
  selector: 'app-postcateform',
  templateUrl: './postcateform.component.html',
  styleUrls: ['./postcateform.component.css']
})
export class PostcateformComponent implements OnInit {
  formPostCate: FormGroup;
  imgUrl = '';

  constructor(private fb: FormBuilder, private postCateService: PostCateService) {
    this.formPostCate = this.fb.group({
      name: ['', Validators.required],
      status: [true],
      file: [null],
      position: [0],
      description: ['description']
    })
  }

  ngOnInit(): void {
  }

  onsubmit() {
    let fd = new FormData();
    fd.append('name', this.formPostCate.get('name').value);
    fd.append('status', this.formPostCate.get('status').value);
    fd.append('position', this.formPostCate.get('position').value);
    fd.append('description', this.formPostCate.get('description').value);
    fd.append('postcate', this.formPostCate.get('file').value);
    return this.postCateService.createPostCate(fd).subscribe((data) => {
      console.log(data);

    }, (error) => {
      console.log(error);

    })
  }

  selectImage(e) {
    const file = (e.target as HTMLInputElement).files[0];
    this.formPostCate.patchValue({ file: file });
    this.formPostCate.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imgUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
