import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/interfaces/StudentInfo.model';
import { StudentRecord } from 'src/app/interfaces/StudentRecord.model';
import { UpdateRecord } from 'src/app/interfaces/UpdateStudentRecord';
import { SharedService } from 'src/app/services/shared.service';
import { DatePipe } from "@angular/common";
import { dateValidator } from 'src/app/validators/date.validator';

@Component({
  selector: 'pm-students-edit-component',
  templateUrl: './students-edit.component.html',
  styleUrls: ['./students-edit.component.css']
})
export class StudentsEditComponent implements OnInit {

  constructor(private service:SharedService, private router:ActivatedRoute, private route:Router, private datePipe:DatePipe ) { }
  universityId:string = null;
  studentId:string = null;
  studentRecord:Student[]=[];
  updateRecord:UpdateRecord;
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
    this.service.getStudentCreditInfo(this.universityId, this.studentId).subscribe((result) =>{
      this.studentRecord = result;
      console.log(this.studentRecord);
      const studentData = this.studentRecord[0]
        this.UpdateStudent.controls.departmentId.setValue(studentData.departmentId),
        this.UpdateStudent.controls.firstName.setValue(studentData.firstName),
        this.UpdateStudent.controls.lastName.setValue(studentData.lastName),
        this.UpdateStudent.controls.startDate.setValue(this.datePipe.transform(studentData.startDate, "yyyy-MM-dd")),
        this.UpdateStudent.controls.lastDate.setValue(this.datePipe.transform(studentData.lastDate, "yyyy-MM-dd")),
        this.UpdateStudent.controls.contactInfoId.setValue(studentData.contactInfoId),
        this.UpdateStudent.controls.address.setValue(studentData.address),
        this.UpdateStudent.controls.email.setValue(studentData.email),
        this.UpdateStudent.controls.phoneNumber.setValue(studentData.phoneNumber),
        this.UpdateStudent.controls.firstYear.setValue(studentData.firstYear),
        this.UpdateStudent.controls.secondYear.setValue(studentData.secondYear),
        this.UpdateStudent.controls.thirdYear.setValue(studentData.thirdYear),
        this.UpdateStudent.controls.fourthYear.setValue(studentData.fourthYear),
        this.UpdateStudent.controls.fifthYear.setValue(studentData.fifthYear)
      console.log('FormControl values',this.UpdateStudent.value);
      console.log('Form Controls Valid:', this.UpdateStudent.valid);
      
    } );

    console.log('First Name Control:', this.UpdateStudent.get('firstName'))
   
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

  UpdateData(){
   this.service.updateStudentRecord(this.universityId, this.studentId, this.UpdateStudent.value).subscribe({
    next: ()=> this.route.navigate(['/student'])
    });
  }

}
