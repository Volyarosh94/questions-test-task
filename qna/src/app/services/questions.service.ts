import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Question } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questionsUrl: string = environment.apiUrl + '/questions';

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.questionsUrl}/get-all`);
  }

  getQuestionById(id: string): Observable<Question> {
    return this.http.get<Question>(`${this.questionsUrl}/get-one/${id}`);
  }

  addQuestion(question: Question): Observable<any> {
    return this.http.post(`${this.questionsUrl}/create`, question);
  }

  updateQuestion(id: string, text: string): Observable<any> {
    return this.http.patch(`${this.questionsUrl}/update/${id}`, { text });
  }

  deleteQuestion(id: string): Observable<any> {
    return this.http.delete(`${this.questionsUrl}/delete/${id}`);
  }

  lockQuestion(id: string): Observable<any> {
    return this.http.patch(`${this.questionsUrl}/set-edit/${id}`, {});
  }
}
