import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {Observable, catchError, throwError } from "rxjs";
import { AlertifyService } from "./Alertify.service";
@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor{
  constructor(private alertify:AlertifyService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return next.handle(req).pipe(
      catchError((error:HttpErrorResponse)=>{
        const errorMessage = this.setError(error)
      console.log(error);
      this.alertify.error(error.message);
     return throwError(() => new Error(error.message));
      })
    );
  }

  
setError(error: HttpErrorResponse):string{

  let errorMessage = 'unknow error occured';
  if(error.error instanceof ErrorEvent)
  {
     errorMessage = error.error.message;
  }
  else{
    if(error.status !==0)
    {
      errorMessage = error.error;
    }
  }

  return errorMessage;

}

  
}

