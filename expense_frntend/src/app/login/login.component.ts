import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  model: any = {
    password: '' ,
    email:''// Initialize password as empty string
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post<any>("http://127.0.0.1:8000/login/", this.model)
      .subscribe(
        response => {
          
          
          localStorage.setItem('token', "Bearer "+response.access);
          localStorage.setItem('email', response.email);
          localStorage.setItem('username', response.username);
          localStorage.setItem('is_superuser', response.is_superuser);
          
          
          this.router.navigate(['/expenselist']); 
        },
        error => {
          console.error('Login failed:', error);
          // Handle error responses here
        }
      );
  }

}
