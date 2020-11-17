import { Guid } from 'guid-typescript';

export class User {
    constructor(
        public username: string,
        public id: string,
        private _tokenExpirationDate: Date
    ){}
}