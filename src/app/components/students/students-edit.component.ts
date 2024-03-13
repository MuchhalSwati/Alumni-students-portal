import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/interfaces/StudentInfo.model';
import { StudentRecord } from 'src/app/interfaces/StudentRecord.model';
import { UpdateRecord } from 'src/app/interfaces/UpdateStudentRecord';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'pm-students-edit-component',
  templateUrl: './students-edit.component.html',
  styleUrls: ['./students-edit.component.css']
})
export class StudentsEditComponent implements OnInit {

  constructor(private service:SharedService, private router:ActivatedRoute ) { }
  universityId:string = null;
  studentId:string = null;
  studentRecord:Student[]=[];
  updateRecord:UpdateRecord;
  UpdateStudent = new FormGroup({
  departmentId:new FormControl(null),
  firstName:new FormControl(null),
  lastName:new FormControl(null),
  startDate: new FormControl(null),
  lastDate: new FormControl(null),
  firstYear: new FormControl(null),
  secondYear: new FormControl(null),
  thirdYear: new FormControl(null),
  fourthYear: new FormControl(null),
  fifthYear: new FormControl(null),
})
  ngOnInit(): void {
    this.universityId = this.router.snapshot.paramMap.get('univId');
    this.studentId = this.router.snapshot.paramMap.get('id');
    this.service.getStudentCreditInfo(this.universityId, this.studentId).subscribe((result) =>{
      this.studentRecord = result;
      console.log(this.studentRecord);
      const studentData = this.studentRecord[0]
      //console.log(studentData);
      this.UpdateStudent = new FormGroup({
        departmentId:new FormControl(studentData.departmentId),
        firstName:new FormControl(studentData.firstName),
        lastName:new FormControl(studentData.lastName),
        startDate: new FormControl(studentData.startDate),
        lastDate: new FormControl(studentData.lastDate),
        firstYear: new FormControl(studentData.firstYear),
        secondYear: new FormControl(studentData.secondYear),
        thirdYear: new FormControl(studentData.thirdYear),
        fourthYear: new FormControl(studentData.fourthYear),
        fifthYear: new FormControl(studentData.fifthYear)
      });

      
      console.log(this.UpdateStudent.value);
      console.log('Form Controls Valid:', this.UpdateStudent.valid);
    } );

    console.log('First Name Control:', this.UpdateStudent.get('firstName'))
   
  }

  UpdateData(){
   this.service.updateStudentRecord(this.universityId, this.studentId, this.UpdateStudent.value).subscribe((result) => {
    this.updateRecord = result;
   })
  }

}
