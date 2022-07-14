import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserserviceService } from 'src/app/services/userservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  

  

  constructor(private userservice:UserserviceService, private snack:MatSnackBar) { }

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',


  };

  ngOnInit(): void {
  }

  formSubmit(){
    
  
    if(this.user.username==''||this.user.username==null){
      this.snack.open('Username is required','ok',{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'right'
      });
      return;
    }

  //adduser: userservice
  this.userservice.addUser(this.user).subscribe(
    (data:any)=>{
      //success
      console.log(data);
     // alert("success");
     Swal.fire('Success','user id is'+data.id,'success');
    },
    (error)=>{
      //error
      console.log(error);
      alert("somthing went wrong");
    }
  )
  }
}

