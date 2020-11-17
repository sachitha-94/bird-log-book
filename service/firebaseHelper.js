import { database, firebaseAuth } from '../config';
import { setAsyncStorageData } from './asyncStorageHelper';
import { EMAIL } from '../constants';

export const saveLogNote = item => {
    try {
        console.log('saveLogNote');
        const response = database.ref('/logNote').push(item);
        return response;
    } catch (error) {
        return error;
    }

};

export const getAllLogNotes = item => {
    try {
        const logNoteRef = database.ref('/logNote');
        let list = [];
        logNoteRef.orderByChild('timestamp').on('value', snapshot => {
            let data = snapshot.val();
            list = data ? Object.values(data) : [];
        });
        return list;
    } catch (error) {
        return error;
    }

};

export const signUp = (data, navigation) => {
    try {
        const { email, password, name } = data;
        firebaseAuth.createUserWithEmailAndPassword(email, password).then((userCredentials) => {
            if (userCredentials.user) {
                userCredentials.user.updateProfile({
                    displayName: name
                }).then((s) => {
                    setAsyncStorageData(EMAIL, email);
                    navigation.navigate('Home');
                })
            }
        })
            .catch(function (error) {
                alert(error.message);
            });
    } catch (error) {
        alert(error.message);
    }
}

export const signIn = (data, navigation) => {
    try {
        const { email, password } = data;
        const response = firebaseAuth.signInWithEmailAndPassword(email, password).then((s) => {
            setAsyncStorageData(EMAIL, email);
            navigation.navigate('Home');
        })
    } catch (error) {
        return error;
    }
}


export const getCurrentUserProfile = () => {
    try {
        const user = firebaseAuth.currentUser;
        if (user === null) return null
        const data = {
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            emailVerified: user.emailVerified,
            uid: user.uid,
        }
        return data;

    } catch (error) {
        return error;
    }
}

export const signOut = async () => {
    try {
        console.log('signOut')
        await firebaseAuth.getInstance().signOut();
        firebaseAuth.onAuthStateChanged((user) => {
            if (user) {

                console.log('User is signed in.')
            } else {
                console.log('User is signed out.')
                // ..
            }
        })
    } catch (e) {
        // an error
    }
}