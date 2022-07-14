import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user = null;
  a: any;
  constructor(private login:LoginService) { }

  ngOnInit(): void {

    this.a=this.login.getUser();
    /*this.login.getCurrentUser().subscribe(
      (a:any)=>{
        this.a=a;
      },
      (error)=>{
        alert('error');
      }
      
    );*/

    
  }

}
