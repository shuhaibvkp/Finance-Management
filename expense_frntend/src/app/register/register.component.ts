import { Component } from '@angular/core';
import { ApicallService } from '../apicall.service';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  model: any = {
    password: '' ,
    username:'',
    email:''// Initialize password as empty string
  };
  e:any
  u:any
  constructor(private http: HttpClient,private router: Router) {}
  onSubmit() {
    console.log('Registration Form Submitted:', this.model);
    this.http.post<any>("http://127.0.0.1:8000/register/", this.model)
    .subscribe(
      response => {
        console.log('Registration successful:', response);

        // Optionally, you can perform additional actions after successful registration
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Registration failed:', error);
        this.e=error.error.email
        this.u=error.error.username
        // Handle error responses here
      }
    );
  }
}
