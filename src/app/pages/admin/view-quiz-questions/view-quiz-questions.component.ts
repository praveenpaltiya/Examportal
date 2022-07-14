import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {
  qId: any;
  qtitle: any;
  questions:any=[];

  constructor(
    private route:ActivatedRoute,
    private _question:QuestionService

  ) { }

  ngOnInit(): void {
    this.qId=this.route.snapshot.params['qid'];
    this.qtitle=this.route.snapshot.params['title'];
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data)=>{
        this.questions=data;
      // Swal.fire("Success !!",'successfully questions are added','success');
      },
      (error)=>{
        Swal.fire("Error !!",'error in loading questions','error');
      }
    );
  
      
    }
    DeleteQuestion(qid: any){
      //alert(this.quesId);
      Swal.fire({
        icon:'info',
        showCancelButton:true,
        confirmButtonText:'Delete',
        title:'Are you sure,want to delete question '

      }).then((result)=>{
        if(result.isConfirmed){
          this._question.DeleteQuestion(qid).subscribe(
            (data)=>{
              Swal.fire("Success !","successfully deleted","success");
            
            
          
          this.questions=this.questions.filter(
            (q:any)=>
                q.quesId!=qid);
            
          
            },
          (error)=>{
            Swal.fire("Error !","error in deleting question","error");
          }
          );
        }
      });

      
    }
  quesId(quesId: any) {
    throw new Error('Method not implemented.');
  }

  }


function quesId(quesId: any, any: any) {
  throw new Error('Function not implemented.');
}

function DeleteQuestion(quesId: (quesId: any, any: any) => void, any: any) {
  throw new Error('Function not implemented.');
}

function qid(qid: any) {
  throw new Error('Function not implemented.');
}

