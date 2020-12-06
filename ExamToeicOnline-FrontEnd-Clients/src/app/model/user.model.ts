import { Guid } from 'guid-typescript';

export class User {
    constructor(
        public username: string,
        public id: string,
        public fullname: string,
        public email: string,
        public phoneNumber: string,
        public birthDate: Date | null,
        public accountId?: number | null,
        public image?: string | null,
    ) { }
}