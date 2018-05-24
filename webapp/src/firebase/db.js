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


// createRide('asdf', 'asdf', 'asdf', 'asdf', 'asdf');
