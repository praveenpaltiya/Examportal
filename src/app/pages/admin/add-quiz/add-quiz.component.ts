import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  categories=[
    {
      cid:'',
      title:'',
    }

]
  quiz={
    title:'',
    numberOfQuestions:'',
    maxMarks:'',
    description:'',
    active:'true',
    category:{
      cid:''
    },
  };

  constructor(private _quiz:QuizService,private _snack:MatSnackBar,private category:CategoryService) { }

  ngOnInit(): void {
    this.category.categories().subscribe(
      (data:any)=>{
          //categories load
          this.categories=data;
          console.log(this.categories);
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!",'error in loading data','error');
      }
      )
  }

  formSubmit(){
    if(this.quiz.title.trim()==''||this.quiz.title==null){
      this._snack.open('Title is required !!','',{
        duration:3000
      })
      return;
    }
    //call server
    this._quiz.addquiz(this.quiz).subscribe(
      (data:any)=>{
        this.quiz.title='';
        this.quiz.numberOfQuestions='';
        this.quiz.maxMarks='';
        this.quiz.description='';
        this.quiz.active='';
        this.quiz.category.cid='',
        Swal.fire("Success !!",'Quiz is added successfully','success');
        
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!",'server error','error');
      }
    )
  }

  

}
