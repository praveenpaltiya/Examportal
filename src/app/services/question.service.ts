import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private http:HttpClient
  ) { }

  
  public getQuestionsOfQuiz(qid:any){
    return this.http.get(`${baseUrl}/question/quiz/all/${qid}`);
}

public getQuestionsOfQuizTest(qid:any){
  return this.http.get(`${baseUrl}/question/quiz/${qid}`);
}
//add question
public addQuestion(questions:any){
 return this.http.post(`${baseUrl}/question/`,questions);
 
}
//delete question
public DeleteQuestion(quesId:any){
  return this.http.delete(`${baseUrl}/question/${quesId}`);
}
//Evaluate quiz
public evaluateQuiz(question:any){
  return this.http.post(`${baseUrl}/question/evaluate-quiz`,question);
}
}
