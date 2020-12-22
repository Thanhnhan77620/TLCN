  
import { Guid } from 'guid-typescript';
import { Subscription } from 'rxjs';

export class UserUpdate {
    constructor(
        public id: string,
        public fullName: string,
        public birthDate: Date,
        public phone: string,
        public email: string,
        public image: File
    ){}

}