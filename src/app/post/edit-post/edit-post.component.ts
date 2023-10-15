import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/post.service';
import { throwError } from 'rxjs';
import { EditPostPayload } from './edit-post.payload';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  editPostForm: FormGroup;
  postPayload: EditPostPayload;
  postId: number;

  constructor(private route: ActivatedRoute, private router: Router, private postService: PostService, private toastr: ToastrService, private cdr: ChangeDetectorRef) {
    this.postPayload = {
      title: '',
      Content: ''
    }
  }

  ngOnInit() {
    this.editPostForm = new FormGroup({
      title: new FormControl('', Validators.required),
      Content: new FormControl('', Validators.required),
    });

    this.postId = +this.route.snapshot.paramMap.get('id');
    
    this.postService.getPost(this.postId).subscribe(post => {
      this.editPostForm.setValue({
        title: post.title,
        Content: post.content
      });
      this.cdr.detectChanges();
    });
  }

  editPost() {
    this.postPayload.title = this.editPostForm.get('title').value;
    this.postPayload.Content = this.editPostForm.get('Content').value;
    
    this.postService.editPost(this.postId, this.postPayload).subscribe(() => {
      this.toastr.success('Post modified successfully');
      this.router.navigate(['view-post/'+this.postId]); 
    }, error => {
      throwError(error);
    });
  }

  

}