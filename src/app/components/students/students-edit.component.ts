import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/interfaces/StudentInfo.model';
import { StudentRecord } from 'src/app/interfaces/StudentRecord.model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'pm-students-edit-component',
  templateUrl: './students-edit.component.html',
  styleUrls: ['./students-edit.component.css']
})
export class StudentsEditComponent implements OnInit {

  constructor(private service:SharedService, private router:ActivatedRoute ) { }
  studentRecord:Student[]=[];
  UpdateStudent = new FormGroup({
  deptID:new FormControl(''),
  firstName:new FormControl(''),
  lastName:new FormControl(''),
  startDate: new FormControl(''),
  lastDate: new FormControl(''),
  firstYear: new FormControl(''),
  secondYear: new FormControl(''),
  thirdYear: new FormControl(''),
  fourthYear: new FormControl(''),
  fifthYear: new FormControl(''),
})
  ngOnInit(): void {
    console.log("univ",this.router.snapshot.paramMap.get('univId'));
    console.log("id",this.router.snapshot.paramMap.get('id'));
    this.service.getStudentCreditInfo(this.router.snapshot.paramMap.get('univId'), this.router.snapshot.paramMap.get('id')).subscribe((result) =>{
      this.studentRecord = result;
      console.log(this.studentRecord);
      const studentData = this.studentRecord[0]
      console.log(studentData);
      this.UpdateStudent = new FormGroup({
        deptID:new FormControl(studentData.departmentId['departmentId']),
        firstName:new FormControl(studentData.firstName['firstName']),
        lastName:new FormControl(studentData.lastName['lastName']),
        startDate: new FormControl(studentData.startDate['startDate']),
        lastDate: new FormControl(studentData.lastDate['lastDate']),
        firstYear: new FormControl(studentData.firstName['firstYear']),
        secondYear: new FormControl(studentData.secondYear['secondYear']),
        thirdYear: new FormControl(studentData.thirdYear['thirdYear']),
        fourthYear: new FormControl(studentData.fourthYear['fourthYear']),
        fifthYear: new FormControl(studentData.fifthYear['fifthYear'])
      });
    } );

    console.log('First Name Control:', this.UpdateStudent.get('firstName'))
   
  }

  UpdateData(){
   
  }

}
