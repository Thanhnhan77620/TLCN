import { User } from './user.model';
export class Account {
    constructor(
        public id: number,
        public username: string,
        public password: string,
        public isActive: boolean,
        public user:User

    ){}
}