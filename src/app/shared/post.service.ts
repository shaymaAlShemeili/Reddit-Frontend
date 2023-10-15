import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostModel } from './post-model';
import { Observable } from 'rxjs';
import { CreatePostPayload } from '../post/create-post/create-post.payload';
import { EditPostPayload } from '../post/edit-post/edit-post.payload';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Array<PostModel>> {
    return this.http.get<Array<PostModel>>('http://localhost:5165/api/blog/posts/');
  }

  createPost(postPayload: CreatePostPayload): Observable<any> {
    return this.http.post('http://localhost:5165/api/blog/posts/', postPayload);
  }

  editPost(id: number, postPayload: EditPostPayload): Observable<any> {
    return this.http.put('http://localhost:5165/api/blog/posts/' + id, postPayload);
  }

  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>('http://localhost:5165/api/blog/posts/' + id);
  }

  getAllPostsByUser(name: string): Observable<PostModel[]> {
    return this.http.get<PostModel[]>('http://localhost:5165/api/blog/posts/by-user/' + name);
  }

  deletePost(id: number): Observable<PostModel> {
    return this.http.delete<PostModel>('http://localhost:5165/api/blog/posts/' + id);
  }
}
