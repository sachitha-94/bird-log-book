import { firebaseDatabase, firebaseAuth, firebaseStorage } from '../config';
import { setAsyncStorageData } from './asyncStorageHelper';
import { EMAIL } from '../constants';
export const saveLogNote = item => {
    try {
        console.log('saveLogNote');
        const response = firebaseDatabase.ref('/logNote').push(item);
        return response;
    } catch (error) {
        return error;
    }

};

export const getAllLogNotes = item => {
    try {
        const logNoteRef = firebaseDatabase.ref('/logNote');
        let list = [];
        logNoteRef.on('value', snapshot => {
            let data = snapshot.val();
            const list1 = data ? Object.values(data) : [];
            list = list1.sort((a, b) => {
                if (a.timestamp < b.timestamp) return 1;
                if (a.timestamp > b.timestamp) return -1;
                return 0;
            });
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

// export const uploadImage = async (uploadUri) => {
//     try {
//         // console.log('uploadImage==>', uploadUri);
//         const timetamp = Date.now();
//         const imageName = `${timetamp}.jpg`;
//         console.log('uploadImage==> imageName===>', imageName);
//         firebaseStorage.ref(imageName).putFile(uploadUri).then((snapshot) => {
//             //You can check the image is now uploaded in the storage bucket
//             console.log(`${imageName} has been successfully uploaded.`);
//         }).catch((e) => console.log('uploading image error => ', e));
//         // console.log('uploadImage==> reference===>', reference);        // 2
//         // let task = reference.putFile(uploadUri);               // 3
//         // console.log('uploadImage==> task===>', task);
//         // task.then(() => {                                 // 4
//         //     console.log('Image uploaded to the bucket!');
//         // }).catch((e) => console.log('uploading image error => ', e));
        
//     } catch (error) {
        
//     }
// }



export const uploadImage = async (uri) => {

    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });
    const timetamp = Date.now();
    const imageName = `${timetamp}.jpg`;
    const ref = firebaseStorage.ref('images').child(imageName);
    const snapshot = await ref.put(blob);
    const downloadUrl = await ref.getDownloadURL();
    blob.close();
    return downloadUrl;
}