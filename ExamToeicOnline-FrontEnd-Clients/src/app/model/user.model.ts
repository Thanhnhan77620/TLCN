import { Guid } from 'guid-typescript';

export class User {
    constructor(
       public username: string,
       public password: string,
       public exp: string
    ){}
}