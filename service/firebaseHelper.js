import { database, firebaseAuth } from '../config';

export const saveLogNote = item => {
    try {
       const response= database.ref('/logNote').push({
            name: item
        });
        return response;
    } catch (error) {
        return error;
    }
	
};

export const getAllLogNotes = item => {
    try {
        const logNoteRef = db.ref('/items');
        const response= logNoteRef.orderByChild('data').on('value', snapshot => {
			let data = snapshot.val();
			return Object.values(data);		
		});
        return response;
    } catch (error) {
        return error;
    }
	
};

export const signUp=(data,navigation)=>{
    try {
        const {email,password,name}=data;
        firebaseAuth.createUserWithEmailAndPassword(email, password).then((userCredentials)=>{
            if(userCredentials.user){
              userCredentials.user.updateProfile({
                displayName: name
              }).then((s)=> {
                navigation.navigate('Home');
              })
            }
        })
        .catch(function(error) {
          alert(error.message);
        });
    } catch (error) {
        alert(error.message);
    }
}

export const signIn=(data)=>{
    try {
        const {email,password}=data;
        const response=firebaseAuth.signInWithEmailAndPassword(email, password);
        console.log('signin response---->>',response);
        return response;
    } catch (error) {
        return error;
    }
} 