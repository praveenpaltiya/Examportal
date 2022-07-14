import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  catId:any;
  quizzes:any;

  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService,
  ) { }

  ngOnInit(): void {
   

   this._route.params.subscribe((params)=>{
    this.catId= params['catId'];
    
   if(this.catId==0){
    //console.log("Load all quizes");
    this._quiz.getActiveQuizzes().subscribe(
      (data)=>{
       this.quizzes=data;
       console.log(this.quizzes);
      },
      (error)=>{
        console.log(error);
      }
    );
    }
    //console.log(this.catId);
    else{
       console.log("Load only specific quiz");
       this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
         (data)=>{
           this.quizzes=data;
           console.log(this.quizzes);
         },
         (error)=>{
           console.log("Error in loading quizzes");
         }
       );
    }
  }
   );
   }
  cid(cid: any) {
    throw new Error('Method not implemented.');
  }
   
  }

   

  

