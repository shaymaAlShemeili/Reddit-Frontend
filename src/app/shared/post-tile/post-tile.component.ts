import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { PostService } from '../post.service';
import { PostModel } from '../post-model';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostTileComponent implements OnInit {

  faComments = faComments;
  @Input() posts: PostModel[];
  @Input() loggedInUserName: string;

  constructor(private postService: PostService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }

  editPost(id: number): void {
    this.router.navigateByUrl('/edit-post/' + id);
  }

  deletePost(id: number): void {
    this.postService.deletePost(id).subscribe(() => { 
      this.posts = this.posts.filter(post => post.id !== id);
      this.toastr.success('Post deleted successfully');
    }, 
    error => {
      console.error('Error deleting post:', error);
    });
    
  }
}
