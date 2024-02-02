import { Component } from '@angular/core';

import { ActivatedRoute,Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-addexpense',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './addexpense.component.html',
  styleUrl: './addexpense.component.css'
})
export class AddexpenseComponent {
  model: any = {
    date_created: '' ,
    description: '' ,
    amount_spent: '' ,
    name:'',
    category:''// Initialize password as empty string
  };
  public token:any;
  public header:any;
  id:any;
  e:any
  u:any
  title='ADD EXPENSE'
  constructor(private http: HttpClient,private router: Router,private actrouter:ActivatedRoute) {}

  ngOnInit()
  {

    this.token=localStorage.getItem("token")??""
    this.header=new HttpHeaders({
      'Content-type':"application/json",
      "Authorization":this.token

  })



        

        this.id=this.actrouter.snapshot.paramMap.get('id')
        
        if(this.id)
        
        {
          this.title="EDIT EXPENSE"
          this.http.get<any>(`http://127.0.0.1:8000/editexpense/${this.id}`,{"headers":this.header})
          .subscribe(
            response => {
              console.log('ll:', response);
              
              this.model=response;
              
            },
            error => {
              console.error('EDIT failed:', error);
              this.e=error
              
              // Handle error responses here
            }
          );

        }
  }






  onSubmit() {    

    if(this.id)
  {
    this.http.put<any>(`http://127.0.0.1:8000/editexpense/${this.id}`,this.model,{"headers":this.header})
    .subscribe(
      response => {
        console.log('edited successfully:', response);

        // Optionally, you can perform additional actions after successful registration
        this.router.navigate(['/expenselist']);
      },
      error => {
        console.error('failed:', error);
        this.e=error.error
        this.u=error.error
        // Handle error responses here
      }
    );
    


  }
  else
  {
    
    this.http.post<any>("http://127.0.0.1:8000/expense/",this.model,{"headers":this.header})
    .subscribe(
      response => {
        console.log('added successfully:', response);

        // Optionally, you can perform additional actions after successful registration
        this.router.navigate(['/expenselist']);
      },
      error => {
        console.error('failed:', error);
        this.e=error.error
        this.u=error.error
        // Handle error responses here
      }
    );
  }
}



}
