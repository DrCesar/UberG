import { db } from './firebase';

// User API

// export const doCreateUser = (id, username, email) =>
//   db.ref(`users/${id}`).set({
//     username,
//     email,
//   });

export const createRide = (description, destiny, id_user, origin, time) =>
    db.collection('rides').add({
        description: description,
        destiny: destiny,
        id_user: id_user,
        origin: origin,
        time: time
    });

export const createUser = (uid, name) =>
    db.collection('users').add({
        id_user: uid,
        isDriver: false,
        name: name,
        rating: 4
    })

export const getNameByUserId = (uid) =>
    db.collection('users').where('id_user','==',uid).get();

export const getRidesByOrigin = (par) =>
    db.collection('rides').where('origin','==',par).get();

export const getRidesByDestiny = (par) =>
    db.collection('rides').where('destiny','>=',par).get();
// createRide('asdf', 'asdf', 'asdf', 'asdf', 'asdf');
