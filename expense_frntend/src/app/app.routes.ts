import { Routes } from '@angular/router';
import { AddexpenseComponent } from './addexpense/addexpense.component';
import { ExpenselistComponent } from './expenselist/expenselist.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AllexpensesComponent } from './allexpenses/allexpenses.component';
export const routes: Routes = [
    { path: 'login',component:LoginComponent},
    { path: 'register', component: RegisterComponent },
    { path: 'addexpense', component: AddexpenseComponent },
    { path: 'edit/:id', component: AddexpenseComponent },
    { path: 'expenselist', component: ExpenselistComponent},
    { path: 'allexpense', component:AllexpensesComponent},
    
];
