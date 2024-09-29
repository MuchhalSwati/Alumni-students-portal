import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StudentsComponent } from './components/students/students.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SharedService } from './services/shared.service';
import { ROUTES, RouterModule } from '@angular/router';
import { DepartmentComponent } from './components/department/department.component';
import { HomeComponent } from './components/home/home.component';
import { DatePipe } from '@angular/common';
import { StudentsEditComponent } from './components/students/students-edit.component';
import { NgModule } from '@angular/core';
import { HttpErrorInterceptorService } from './services/httperror-interceptor.service';



@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    DepartmentComponent,
    HomeComponent,
    StudentsEditComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'students/edit/:univId/:id', component:StudentsEditComponent},
      {path:'student', component:StudentsComponent},
      {path:'department', component:DepartmentComponent},
      {path:'home', component:HomeComponent},
    ])
   
   
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HttpErrorInterceptorService,
      multi:true
    },
    SharedService,
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
