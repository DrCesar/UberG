
import crypto from 'crypto';

class User {
    
    constructor(data = {}) {
        this.id = data.id || 0;
        this.name = data.name || '';
        this.email = data.email || '';
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = hashPassword(data.password);
        this.created_at = data.created_at || new Date();
    }

    hashPassword(password) {
        return crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha1').toString('64');
    }

    authenticate(password) {
        return this.password === this.hashPassword(password);
    }
}


export default User;