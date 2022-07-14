import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes=[
    {
      qid:'',
      title:'',
      description:'',
      numberOfQuestions:'',
      active:'',
      maxMarks:'',
    },
    
  ]

  constructor(private _quiz:QuizService) { }

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
      },
      (error)=>{
        console.log(error);
        Swal.fire('error','Server Error','error');
      }
    )
  };
  //delete function 
  deleteQuiz(qid: any){

    Swal.fire({
      icon:'info',
      title:'Are you sure ?',
      confirmButtonText:'Delete',
      showCancelButton:true,

    }


    ).then((result)=>{
      if(result.isConfirmed){
        //delete

      
    
      this._quiz.DeleteQuiz(qid).subscribe(
        (data:any)=>{
          this.quizzes=this.quizzes.filter((quiz)=>quiz.qid!=qid);
          Swal.fire("Success !!",'successfully deleted','success');
        },
        (error: any)=>{
        Swal.fire("Error !!",'Server Error','error');
      
        });
      }
    });
  }

}
function icon(icon: any, arg1: string) {
  throw new Error('Function not implemented.');
}

