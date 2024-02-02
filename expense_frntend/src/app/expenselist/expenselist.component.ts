import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Component({
  selector: 'app-expenselist',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './expenselist.component.html',
  styleUrl: './expenselist.component.css'
})
export class ExpenselistComponent {
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
  
  
      this.http.get<any>("http://127.0.0.1:8000/expense/",{"headers":this.header})
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

  delete(id:any)
  {
    console.log(id);
    if (confirm("are you sure you want to delete ?"))
      {
        this.http.delete<any>(`http://127.0.0.1:8000/editexpense/${id}`,{"headers":this.header})
        .subscribe(
          response => {
            console.log('deletion:', response);
            // Optionally, you can perform additional actions after successful registration
            this.data=response;
            this.ngOnInit()
          },
          error => {
            console.error('deletion failed:', error);
            this.e=error
            
            // Handle error responses here
          }
        );
      }

  }

  edit(id:any)
  {
    console.log(id)
    this.router.navigate(['edit',id])
  }
 
}