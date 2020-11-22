
export class User {
    constructor(
        public id: string,
        public fullname: string,
        public email: string,
        public phoneNumber: string,
        public birthDay: Date,
        public accountId: number,
        public image?: string,
    ){}
}