import { Guid } from 'guid-typescript';

export class User {
    constructor(
        public Id: Guid,
        public fullName:string,
        public email: string,
        public phoneNumber: number,
        public image: File,
        public birthDate: Date, 
    ){}
}