import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _route:ActivatedRoute,
    private _quiz:QuizService,
    private category:CategoryService,
    private _snack:MatSnackBar,
    private _router:Router) { }

  qId=0;
  categories:any;
  quiz:any=[{
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:'true',
    
},]

  ngOnInit(): void {
       this.qId= this._route.snapshot.params['qid'];
      // alert(this.qId);
      this._quiz.getQuiz(this.qId).subscribe(
        (data)=>{
          this.quiz=data;
          console.log(this.quiz);
        },
        (error)=>{
          console.log(error);
        }
      );
      this.category.categories().subscribe(
        (data)=>{
          this.categories=data;
        },
        (error)=>{
          alert("error in loading data");
        }
      );

  }
  //update form submit
  public updateData(){
    if(this.quiz.title.trim()==''||this.quiz.title==null){
      this._snack.open('Title is required !!','',{
        duration:3000
      })
      return;
    }
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data)=>{
        Swal.fire("Success !!",'Quiz is updated successfully','success').then((e)=>{
          this._router.navigate(['/admin/quizzes']);
        });
          
        
      },
      (error)=>{
        Swal.fire("Error !!",'server error','error');
      }
    );
  }

}
function e(e: any) {
  throw new Error('Function not implemented.');
}

