import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  qid:any;
  questions:any;
  marksGot=0;
  correctans=0;
  attempt=0;
  issubmit=false;
  timer:any;


  constructor(
    private locatioinSt:LocationStrategy,
    private _route:ActivatedRoute,
    private _question:QuestionService,
  ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this._route.snapshot.params['qid']
    this.loadquestion();
  }

  loadquestion(){
    this._question.getQuestionsOfQuizTest(this.qid).subscribe(
      (data:any)=>{
       // console.log(data);
       this.questions=data;
       this.timer=this.questions.length*2*60;
       
       console.log(this.questions);
       this.setTimer();
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error","Error in loading questions","error");
      }
    );
  }
    preventBackButton(){
      history.pushState(null,location.href);
      this.locatioinSt.onPopState(()=>{
        history.pushState(null,location.href);
      });
    }
    submitQuiz(){
      Swal.fire({
        title: 'Do you want to submit the quiz?',
        
        showCancelButton: true,
        confirmButtonText: 'Submit',
        denyButtonText: `Don't save`,
      }).then((result) => {
        if(result.isConfirmed){
          this.evalve();
         
    
  }
});
    }
  setTimer(){
   let t= window.setInterval(()=>{
        if(this.timer<=0){
          this.evalve();
          clearInterval(t);
        }
        else{
          this.timer--;
        }
    },
    1000)
  }
  getFormattedTime(){
    let mm=Math.floor(this.timer/60);
    let ss=this.timer-(mm*60);
    return `${mm}min : ${ss}sec`;
  }
  evalve(){

    //call to server to evaluate quiz
      this._question.evaluateQuiz(this.questions).subscribe(
        (data:any)=>{
          console.log(data);
          this.correctans=data.correctans;
          this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
          this.attempt=data.attempt;
          this.issubmit=true;

        },
        (error)=>{
          console.log(error);

        }
      )
    /*this.issubmit=true;
    this.questions.forEach((q:any)=>{
      if(q.givenAnswer==q.answer){
        this.correctans++;
        let markssingle=this.questions[0].quiz.maxMarks/this.questions.length;
        this.marksGot=this.correctans*markssingle;
      }
      if(q.givenAnswer.trim()!=''){
        this.attempt++;
      }

    })
    console.log("Correct answers:"+ this.correctans);
    console.log("Total marks you have got:"+ this.marksGot);
    console.log("Attempted:"+ this.attempt);*/

  }
  printpage(){
    window.print();
  }

  
}




