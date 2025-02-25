import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DepartmenttableComponent } from './components/departmenttable/departmenttable.component';
import { LoginComponent } from './components/login/login.component';
import { DepartmentdetailsComponent } from './components/departmentdetails/departmentdetails.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'department/list',
        component: DepartmenttableComponent
    },
    {
        path: 'department/:id',
        component: DepartmentdetailsComponent
    }
];