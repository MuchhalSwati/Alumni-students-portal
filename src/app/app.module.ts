import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StudentsComponent } from './components/students/students.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SharedService } from './services/shared.service';
import { RouterModule } from '@angular/router';
import { DepartmentComponent } from './components/department/department.component';
import { HomeComponent } from './components/home/home.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    DepartmentComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'student', component:StudentsComponent},
      {path:'department', component:DepartmentComponent},
      {path:'home', component:HomeComponent},
     
    ])
   
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
