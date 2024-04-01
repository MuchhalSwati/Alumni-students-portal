import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import {StudentRecord} from '../../interfaces/StudentRecord.model'
import { combineLatest } from 'rxjs';
import { ConditionalExpr } from '@angular/compiler';
import { dateValidator } from 'src/app/validators/date.validator';
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
    this.studentForm = this.buildForm();
    // = new FormGroup({
    //   firstName: new FormControl('',[Validators.required,Validators.maxLength(15) ,Validators.minLength(5)]),
    //   lastName: new FormControl('',[Validators.required,Validators.maxLength(15) ,Validators.minLength(3)]),
    //   startDate: new FormControl('',Validators.required),
    //   lastDate: new FormControl('',Validators.required),
    //   departmentId: new FormControl('',[Validators.required,Validators.maxLength(2), Validators.pattern("^[0-9]*$")])
      
      
    // });
  }


  private buildForm():FormGroup{
    return new FormGroup({
      firstName: new FormControl('',[Validators.required,Validators.maxLength(15) ,Validators.minLength(5)]),
      lastName: new FormControl('',[Validators.required,Validators.maxLength(15) ,Validators.minLength(3)]),
      startDate: new FormControl('',Validators.required),
      lastDate: new FormControl('',Validators.required),
      departmentId: new FormControl('',[Validators.required,Validators.maxLength(2), Validators.pattern("^[0-9]*$")]),
      address:new FormControl(null),
      email:new FormControl(null),
      phoneNumber:new FormControl(null),
      firstYear: new FormControl(null),
      secondYear: new FormControl(null),
      thirdYear: new FormControl(null),
      fourthYear: new FormControl(null),
      fifthYear: new FormControl(null),
  }, {validators:dateValidator})}


   onClickSubmit(){
    console.log(`in onclicksubmit method`);
    // let strtDate = new Date(this.studentForm.get('startDate').value)
    // let endDate = new Date(this.studentForm.get('lastDate').value)
    // if(strtDate > endDate)
    // {
    //   this.isInvalidDateRange =  true;
    // }
    // else 
    // {
    // this.service.addStudentRecord(data).subscribe((result)=>{
    // console.log(result);
    
    //   alert("Successfully added student record:  " + result.id+ " firstName: " + result.firstName  + "LastName:  " +result.lastName)
   
    // }
  
    // )
  //}

    const model = this.getModel();
    this.service.addStudentRecord(model).subscribe({
      next:(item) => alert("Successfully added student record:  " + item.id+ " firstName: " + item.firstName  + "LastName:  " +item.lastName),
      error:(err) => alert(`Failed to add student record ${err}`),
      complete: () => console.log('complete')
    })
  

}

getModel():StudentRecord
{
 const formValue = this.studentForm.getRawValue();
 return <StudentRecord>{
  firstName: formValue.firstName,
  lastName: formValue.lastName,
  startDate:formValue.startDate,
  lastDate:formValue.lastDate,
  departmentId:formValue.departmentId,
  address:formValue.address,
  email:formValue.email,
  phoneNumber:formValue.phoneNumber,
  firstYear:formValue.firstYear,
  secondYear:formValue.secondYear,
  thirdYear:formValue.thirdYear,
  fourthYear:formValue.fourthYear,
  fifthYear:formValue.fifthYear
 }
}

  onReset(){
    this.studentForm.reset();
  }


  get departmentId()
  {
    return this.studentForm.controls['departmentId'];
  }

  get firstName()
  {
    return this.studentForm.controls['firstName'];
  }

  get lastName()
  {
    return this.studentForm.controls['lastName'];
  }

  get startDate()
  {
    return this.studentForm.controls['startDate'];
  }
  get lastDate()
  {
    return this.studentForm.controls['lastDate'];
  }

  get email()
  {
    return this.studentForm.controls['email'];
  }


  

}
