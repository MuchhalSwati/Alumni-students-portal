import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import {Student} from '../../interfaces/StudentInfo.model';
import { Subscription, Unsubscribable } from 'rxjs';


@Component({
  selector: 'pm-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {


  private subscription:Subscription;
  protected universityId = '';
  protected studentId = '';
  studentsCreditInfo:Student[] = [];
  //detailView:Student[]=[];
  view:boolean = false;
 
  

  constructor(private service: SharedService, private route: ActivatedRoute) {  }

  ngOnInit(): void {  }

  getStudentInfo():void {
  this.service.getStudentCreditInfo(this.universityId, this.studentId).subscribe((data) => {
      this.studentsCreditInfo = data;
      console.log(this.studentsCreditInfo);
    })
  }

  // viewDetail():void{
  //   //this.detailView = this.studentsCreditInfo;
  //   this.view = !this.view
  // }

  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }

}
  


