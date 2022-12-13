import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/interfaces/StudentInfo.model';
import { SharedService } from 'src/app/services/shared.service';
import {Dept, StudDepartment} from '../../interfaces/Department.model';
@Component({
  selector: 'pm-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  protected universityId = '';
  protected departmentId = '';
  departmentStudList : StudDepartment[];

  constructor(private service: SharedService, private route: ActivatedRoute) { }

  ngOnInit(): void {
 
  }

  departmentStudentList():void {
    this.service.getStudentListUnderDepartment(this.universityId, this.departmentId).subscribe((data:Dept) => {
      this.departmentStudList = data.students;
      console.log(this.departmentStudList);
    })
  }
}
