
export class User {
    constructor(
        public id: string,
        public fullname: string,
        public email: string,
        public phoneNumber: string,
        public birthDate: Date | null,
        public accountId?: number | null,
        public image?: string | null,
    ) { }
}