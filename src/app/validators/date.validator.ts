import { AbstractControl, ValidationErrors } from "@angular/forms";

export function dateValidator(control:AbstractControl):ValidationErrors|null{
const startDate = control.get('startDate')?.value;
const lastDate = control.get('lastDate')?.value;

console.log('Start date:', startDate?.value);
console.log('End date:', lastDate?.value);
if(startDate !=null && lastDate !=null && startDate < lastDate)
{
return null
}
else{
return {dateValid:true};
}
}

// return startDate !==null && lastDate !== null && startDate < lastDate
// ? null : {dateValid:true};



//}
