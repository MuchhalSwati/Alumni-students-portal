import { AbstractControl, ValidationErrors } from "@angular/forms";

export function dateValidator(control:AbstractControl):ValidationErrors|null{
const startDate = control.get('startDate');
const lastDate = control.get('lastDate');

if(startDate !=null && lastDate !=null && startDate < lastDate)
{
return null
}

return {dateValid:true};
}