export interface PasswrdRes {
    success: boolean;
    message: string;
    data?:  any;
}

export class resetpswd {
    email:string | null='';
    password:string | null='';
    confirmPassword:string | null='';
    resetId :string | null='';
}
