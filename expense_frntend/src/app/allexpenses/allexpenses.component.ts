import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-allexpenses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allexpenses.component.html',
  styleUrl: './allexpenses.component.css'
})
export class AllexpensesComponent {

  data:any;
  public token:any;
  public header:any;
  e:any
  is_superuser:any;
  constructor(private http: HttpClient,private router: Router) {}
  ngOnInit()
  { 
      this.token=localStorage.getItem("token")??""
      this.is_superuser=localStorage.getItem('is_superuser')
    this.header=new HttpHeaders({
      'Content-type':"application/json",
      "Authorization":this.token

  })
  
  
      this.http.get<any>("http://127.0.0.1:8000/allexpense/",{"headers":this.header})
      .subscribe(
        response => {
          console.log('Registration successful:', response);
          // Optionally, you can perform additional actions after successful registration
          this.data=response
        },
        error => {
          console.error('Registration failed:', error);
          this.e=error
          
          // Handle error responses here
        }
      );
      
  }

}
