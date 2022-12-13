import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import {Student} from '../../interfaces/StudentInfo.model';


@Component({
  selector: 'pm-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {



  protected universityId = '';
  protected studentId = '';
  studentsCreditInfo:Student[] = [];

  constructor(private service: SharedService, private route: ActivatedRoute) {

  }



  ngOnInit(): void {
    // this.StudentInfo();
    
  }

  getStudentInfo():void {
    this.service.getStudentCreditInfo(this.universityId, this.studentId).subscribe((data) => {
      this.studentsCreditInfo = data;
      console.log(this.studentsCreditInfo);
    })
  }
}




  // StudentInfo()
  // {
  //   this.service.getStudentCreditInfo().subscribe(data =>{
  //     this.StudentsCreditInfo = data
  //     console.log(this.StudentsCreditInfo)
  //   })
  // }
//}



