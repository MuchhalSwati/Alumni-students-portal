export interface StudDepartment{
    
    univId: number,
    univName: string,
    departmentId: number,
    deptName: string,
    firstName: string,
    lastName:string,
    address: string,
    phoneNumber: number,
    email: string,
    firstYear: number,
    secondYear:number
    thirdYear:number,
    fourth: number,
    fifthYear: string,
    id: number,
    startDate: string,
    lastDate: string

}

export interface Dept{

students: StudDepartment[]

}