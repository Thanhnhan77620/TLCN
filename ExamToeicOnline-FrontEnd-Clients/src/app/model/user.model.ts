export class User {
    constructor(
        public id: number,
        public isActive:boolean,
        public username: string,
        public password: string,
        public userId:string,
        public token?: string,
    ){}
}