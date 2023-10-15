import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from 'src/app/shared/post-model';
import { throwError } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentPayload } from 'src/app/comment/comment.payload';
import { CommentService } from 'src/app/comment/comment.service';
import { AuthService } from '../../auth/shared/auth.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  postId: number;
  post: PostModel;
  commentForm: FormGroup;
  commentPayload: CommentPayload;
  comments: CommentPayload[];
  loggedInUserName: string;
  editMode = {};

  constructor(private authService: AuthService, private postService: PostService, private activateRoute: ActivatedRoute,
    private commentService: CommentService, private router: Router) {
    this.postId = this.activateRoute.snapshot.params.id;
    this.loggedInUserName = this.authService.getUserName();
    this.commentForm = new FormGroup({
      text: new FormControl('', Validators.required)
    });
    this.commentPayload = {
      id: 0,
      Content: '',
      postId: this.postId
    };
  }

  ngOnInit(): void {
    this.getPostById();
    this.getCommentsForPost();
  }

  postComment() {
    this.commentPayload.Content = this.commentForm.get('text').value;
    this.commentService.postComment(this.postId, this.commentPayload).subscribe(data => {
      this.commentForm.get('text').setValue('');
      this.getCommentsForPost();
    }, error => {
      throwError(error);
    })
  }

  private getPostById() {
    this.postService.getPost(this.postId).subscribe(data => {
      this.post = data;
    }, error => {
      throwError(error);
    });
  }

  private getCommentsForPost() {
    this.commentService.getAllCommentsForPost(this.postId).subscribe(data => {
      this.comments = data;
    }, error => {
      throwError(error);
    });
  }

  startEdit(commentId: number) {
    this.editMode[commentId] = true;
  }

  saveEdit(commentId: number) {
    const updatedContent = this.comments.find(comment => comment.id === commentId).content;

    this.commentService.editComment(this.postId, commentId, { id : commentId, content: updatedContent, postId: this.postId })
      .subscribe(() => {
        this.editMode[commentId] = false;
        this.getCommentsForPost();
      }, error => {
        throwError(error);
      });
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(this.postId, commentId).subscribe(() => {
      this.getCommentsForPost();
    }, error => {
      throwError(error);
    });
  }
}
