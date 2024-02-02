import { Component, Inject, PLATFORM_ID ,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,NavigationEnd } from '@angular/router';

import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  username: any;
  isAuthenticated: any;
  is_superuser: any;
  
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateNavbar();
      }
    });

  }

  updateNavbar() {
    
    if ("token" in localStorage) {
      this.isAuthenticated = true;
      this.username = localStorage.getItem('username');
      this.is_superuser = localStorage.getItem('is_superuser');
      console.log(this.is_superuser);
    } else {
      this.isAuthenticated = false;
      this.username = '';
      console.log(this.isAuthenticated);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}






// export class AppComponent{
//   constructor(private route:Router, private router: Router){}
//   username:any;
//   isAuthenticated:any;
//   is_superuser:any;
  
//   ngOnInit()
//   {
//     if ("token" in localStorage)
//     {
//       this.isAuthenticated=true;
//       this.username=localStorage.getItem('username')
//       this.is_superuser=localStorage.getItem('is_superuser')
//       console.log( this.is_superuser);

//     }
//     else
//     {
//       this.isAuthenticated=false;
//       this.username='';
//       console.log(this.isAuthenticated);
//     }

//   }
//   logout()
//   {
//     // console.log(localStorage.getItem("token"))
//     localStorage.clear()
    
//     this.router.navigate(['/login']);
    
//   }
// }
