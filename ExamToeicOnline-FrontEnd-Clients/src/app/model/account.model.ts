
export class Account {
    constructor(
        public username: string,
        public userId: string,
        private _token: string,
        public _tokenExpirationDate: Date,
        public password?: string,
        public isActive?: boolean,
        public isAdmin?: boolean,
        public id?: number
    ){}

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
          return null;
        }
        return this._token;
      }
}