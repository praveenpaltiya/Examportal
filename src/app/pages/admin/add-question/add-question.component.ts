import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  qId:any;
  qtitle:any;
  questions={
    quiz:{ 
      qid:'',
    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
    quesId:'',
  };


  constructor(
    private _route:ActivatedRoute,
  private _question:QuestionService,
  ) { }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    this.qtitle=this._route.snapshot.params['title'];
    this.questions.quiz.qid=this.qId;
    console.log(this.qtitle);
    console.log(this.qId);
    
    
}
  formSubmit(){
    //alert("add questions");
    if(this.questions.content.trim()=='' || this.questions.content==null){
      return;
    }
    if(this.questions.option1.trim()=='' || this.questions.option1==null){
      return;
    }
    if(this.questions.option1.trim()=='' || this.questions.option1==null){
      return;
    }
    this._question.addQuestion(this.questions).subscribe(
      (data:any)=>{
        
        Swal.fire("Success","Question successfully added","success");

        this.questions=data;

        console.log(this.questions);
        console.log(this.questions.quesId);

        this.questions.content='';
        this.questions.option1='';
        this.questions.option2='';
        this.questions.option3='';
        this.questions.option4='';
        this.questions.answer='';

      },
      (error)=>{
        Swal.fire("Error","error in loading questions","error");
        console.log(error);
      }
    );
  
  //alert('welcome to add-questions component');
  //console.log("welcome to component");

  }
}

