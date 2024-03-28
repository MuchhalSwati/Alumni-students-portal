import { Component, ComponentFactoryResolver, OnDestroy, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/interfaces/StudentInfo.model';
import { StudentRecord } from 'src/app/interfaces/StudentRecord.model';
import { UpdateRecord } from 'src/app/interfaces/UpdateStudentRecord';
import { SharedService } from 'src/app/services/shared.service';
import { DatePipe } from "@angular/common";
import { dateValidator } from 'src/app/validators/date.validator';
import { StudentUpdateInfo } from 'src/app/interfaces/StudentupdateInfo.model';
import { Observable, observable, tap } from 'rxjs';

@Component({
  selector: 'pm-students-edit-component',
  templateUrl: './students-edit.component.html',
  styleUrls: ['./students-edit.component.css']
})
export class StudentsEditComponent implements OnInit, OnDestroy{

  constructor(private service:SharedService, private router:ActivatedRoute, private route:Router, private datePipe:DatePipe ) { }
  errorMessage:'';
  universityId:string = null;
  studentId:string = null;
  studentRecord$:Observable<Student[]>;
  updateRecord:UpdateRecord;
  updateSuccess=false;
  UpdateStudent = new FormGroup({
  departmentId:new FormControl(null,[Validators.required, Validators.maxLength(2)]
  ),
  firstName:new FormControl(null,[Validators.required, 
    Validators.minLength(2)]),
  lastName:new FormControl(null,[Validators.required, 
    Validators.minLength(2)]),
  startDate: new FormControl(null,Validators.required),
  lastDate: new FormControl(null,Validators.required),
  contactInfoId: new FormControl(null,Validators.required),
  address:new FormControl(null),
  email:new FormControl(null),
  phoneNumber:new FormControl(null),
  firstYear: new FormControl(null),
  secondYear: new FormControl(null),
  thirdYear: new FormControl(null),
  fourthYear: new FormControl(null),
  fifthYear: new FormControl(null),
}, {validators:dateValidator})
  ngOnInit(): void {
    this.universityId = this.router.snapshot.paramMap.get('univId');
    this.studentId = this.router.snapshot.paramMap.get('id');
    this.studentRecord$ = this.service.getStudentCreditInfo(this.universityId, this.studentId).pipe(
      tap((post => {
       this.UpdateStudent.controls.departmentId.setValue(post[0].departmentId),
       this.UpdateStudent.controls.firstName.setValue(post[0].firstName),
       this.UpdateStudent.controls.lastName.setValue(post[0].lastName),
       this.UpdateStudent.controls.startDate.setValue(this.datePipe.transform(post[0].startDate, "yyyy-MM-dd")),
        this.UpdateStudent.controls.lastDate.setValue(this.datePipe.transform(post[0].lastDate, "yyyy-MM-dd")),
        this.UpdateStudent.controls.contactInfoId.setValue(post[0].contactInfoId),
        this.UpdateStudent.controls.address.setValue(post[0].address),
        this.UpdateStudent.controls.email.setValue(post[0].email),
        this.UpdateStudent.controls.phoneNumber.setValue(post[0].phoneNumber),
        this.UpdateStudent.controls.firstYear.setValue(post[0].firstYear),
        this.UpdateStudent.controls.secondYear.setValue(post[0].secondYear),
        this.UpdateStudent.controls.thirdYear.setValue(post[0].thirdYear),
        this.UpdateStudent.controls.fourthYear.setValue(post[0].fourthYear),
        this.UpdateStudent.controls.fifthYear.setValue(post[0].fifthYear)
       console.log(post);
      }))
    );
            
  }

  get departmentId()
  {
    return this.UpdateStudent.controls.departmentId;
  }

  get firstName()
  {
    return this.UpdateStudent.controls.firstName;
  }

  get lastName()
  {
    return this.UpdateStudent.controls.lastName;
  }

  get startDate()
  {
    return this.UpdateStudent.controls.startDate;
  }
  get lastDate()
  {
    return this.UpdateStudent.controls.lastDate;
  }

  get email()
  {
    return this.UpdateStudent.controls.lastDate;
  }

  

  UpdateData(){
  this.service.updateStudentRecord(this.universityId, this.studentId, this.UpdateStudent.value).subscribe((updateStudent)=>{
    console.log('updated student successfully');
    this.updateSuccess = true;
    if(this.updateSuccess)
    {
    this.service.updateStudentInfo(updateStudentInfo);
    this.route.navigate(['/student']);
    }
    (error)=>this.errorMessage = error
     }
    );
    
    const updateStudentInfo:StudentUpdateInfo= {
      universityid: this.universityId,
      studentId: this.studentId
    };

   
    // next: response => this.updateRecord = response,
    // error: err => this.errorMessage = err
   
    // console.log('student record updated successfully')
    // console.log('status code:', response)
    // this.route.navigate(['/student']);
   
    // (error) =>{
    //   console.error('Error updating student record:', error)
    // });
  

 

  // if(this.updateSuccess)
  // {
  // this.service.updateStudentIfo(updateStudentInfo);
  // this.route.navigate(['/student']);
  // }
  
  

}

ngOnDestroy(): void {
 // this.service.updateStudentInfo(null)
  }


  
}
