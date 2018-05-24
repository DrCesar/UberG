
import adminFirebase from 'firebase-admin';
import User from '../models/user.model';

var db = adminFirebase.firestore();
var usersRef = db.collection('users');

const register = function(user) {

    db.runTransaction((tx) => {
        return tx.get(user.email).then(userDoc => {
            if (userDoc.exists)
                return Promise.reject({message: 'Usuario ya existe'});
        });
    })
    .then(() => {
        usersRef.doc(user.email).set(user);
        return {
            success: true,
            message: 'Usuario creado.'
        };
    });


        
}

const signin = function(temp) {

    //var temp = new User(info);
    var userDoc = usersRef.doc(temp.email).get()
        .then(doc => {
            var user = new User(doc.data());

            if (user.authenticate(temp.password)) {
               return {
                    success: true,
                    message: ''
                };
            } else return {
                    success: false,
                    message: 'Usuario y/o contraseña incorrectos'
                };
        })
        .catch(err => {
            return {
                success: false,
                message: 'Usuario y/o contraseña incorrectos'
            };
        });
}

const searchUser = function(id) {

    var userDoc = usersRef.doc(id).get()
        .then(doc => {
            return {
                success: true,
                user: new User(doc.data())
            };
        })
        .catch(err => {
            return {
                success: false,
                user: ''
            };
        });
}


export { register, signin, searchUser }
