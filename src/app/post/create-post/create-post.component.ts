import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';
import { throwError } from 'rxjs';
import { CreatePostPayload } from './create-post.payload';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  createPostForm: FormGroup;
  postPayload: CreatePostPayload;

  constructor(private router: Router, private postService: PostService) {
    this.postPayload = {
      title: '',
      Content: ''
    }
  }

  ngOnInit() {
    this.createPostForm = new FormGroup({
      title: new FormControl('', Validators.required),
      Content: new FormControl('', Validators.required),
    });
  }

  createPost() {
    this.postPayload.title = this.createPostForm.get('title').value;
    this.postPayload.Content = this.createPostForm.get('Content').value;
    this.postService.createPost(this.postPayload).subscribe((data) => {
      this.router.navigateByUrl('/');
    }, error => {
      throwError(error);
    })
  }

  

}