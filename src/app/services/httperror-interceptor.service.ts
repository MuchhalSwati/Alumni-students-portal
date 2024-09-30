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
      console.log(`Error from constant ${JSON.stringify(errorMessage)}`);
      this.alertify.error(errorMessage);
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

    switch(error.status)
    {
      case 400:
        errorMessage = 'Bad Request: The request cannot be understood'
        break;

      case 404:
        errorMessage = 'Not found: The requested resource could not be found.'
        break;

      case 500:
        errorMessage = 'Internal server error'
        break;
      default:
        errorMessage = 'unexpected error'
    }
  }

  return errorMessage;

}

  
}

