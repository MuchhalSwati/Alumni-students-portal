import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import {StudentRecord} from '../../interfaces/StudentRecord.model'
import { combineLatest } from 'rxjs';
import { ConditionalExpr } from '@angular/compiler';
@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 studentForm!: FormGroup;
 isInvalidDateRange:boolean=false;
 

constructor(private service:SharedService) {  }
 

  ngOnInit(): void {
    this.studentForm = new FormGroup({
      firstName: new FormControl('',[Validators.required,Validators.maxLength(15) ,Validators.minLength(5)]),
      lastName: new FormControl('',[Validators.required,Validators.maxLength(15) ,Validators.minLength(3)]),
      startDate: new FormControl('',Validators.required),
      lastDate: new FormControl('',Validators.required),
      departmentId: new FormControl('',[Validators.required,Validators.maxLength(2), Validators.pattern("^[0-9]*$")])
      
      
    });
  }


   onClickSubmit(data:StudentRecord){
    let strtDate = new Date(this.studentForm.get('startDate').value)
    let endDate = new Date(this.studentForm.get('lastDate').value)
    if(strtDate > endDate)
    {
      this.isInvalidDateRange =  true;
    }
    else 
    {
    this.service.addStudentRecord(data).subscribe((result)=>{
    console.log(result);
    
      alert("Successfully added student record:  " + result.id+ " firstName: " + result.firstName  + "LastName:  " +result.lastName)
   
    }
  
    )
  }
}

  onReset(){
    this.studentForm.reset();
  }



  

}
