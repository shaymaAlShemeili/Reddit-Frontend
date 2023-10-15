import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentPayload } from './comment.payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  getAllCommentsForPost(postId: number): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>('http://localhost:5165/api/comments/post/'+postId);
  }

  postComment(postId: number, commentPayload: CommentPayload): Observable<any> {
    return this.httpClient.post<any>('http://localhost:5165/api/comments/post/'+postId, commentPayload);
  }

  getAllCommentsByUser(name: string) {
    return this.httpClient.get<CommentPayload[]>('http://localhost:5165/api/comments/by-user/' + name);
  }

  editComment(postId: number, commentId: number, commentPayload: CommentPayload): Observable<any> {
    return this.httpClient.put<any>(`http://localhost:5165/api/comments/${commentId}`, commentPayload);
  }

  deleteComment(postId: number, commentId: number): Observable<any> {
    return this.httpClient.delete<any>(`http://localhost:5165/api/comments/${commentId}`);
  }
}
