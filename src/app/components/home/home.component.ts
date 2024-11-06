import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import {StudentRecord} from '../../interfaces/StudentRecord.model'
import { dateValidator } from 'src/app/validators/date.validator';
import { AlertifyService } from 'src/app/services/Alertify.service';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 studentForm!: FormGroup;
 isInvalidDateRange:boolean=false;
 studentId:number;
 

constructor(private service:SharedService, private alertify:AlertifyService) {  }
 

  ngOnInit(): void {
    this.studentForm = this.buildForm();
  }


  private buildForm():FormGroup{
    return new FormGroup({
      firstName: new FormControl('',[Validators.required,Validators.maxLength(15) ,Validators.minLength(5)]),
      lastName: new FormControl('',[Validators.required,Validators.maxLength(15) ,Validators.minLength(3)]),
      startDate: new FormControl('',Validators.required),
      lastDate: new FormControl('',Validators.required),
      departmentId: new FormControl('',[Validators.required,Validators.maxLength(2), Validators.pattern("^[0-9]*$")]),
      address:new FormControl(null),
      email:new FormControl(null,[Validators.email]),
      phoneNumber:new FormControl(null),
      firstYear: new FormControl(null, [Validators.pattern("^[0-9]*$"), Validators.max(120)] ),
      secondYear: new FormControl(null,[Validators.pattern("^[0-9]*$"),Validators.max(120)]),
      thirdYear: new FormControl(null,[Validators.pattern("^[0-9]*$"),Validators.max(120)]),
      fourthYear: new FormControl(null,[Validators.pattern("^[0-9]*$"),Validators.max(120)]),
      fifthYear: new FormControl(null,[Validators.pattern("^[0-9]*$"),Validators.max(120)]),
  }, {validators:dateValidator})}


   onClickSubmit(){
    console.log(`in onclicksubmit method`);
    const model = this.getModel();
    this.service.addStudentRecord(model).subscribe({
      next: (response) => {
        this.studentId = response.studentId;
        this.onReset();
        this.alertify.success(`Successfully added student record with ID: ${response.studentId}`);
      }
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
