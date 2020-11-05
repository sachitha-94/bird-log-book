import Firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAn5GD0rQydkt7wxY6zk_2MHdnU6RAJGuc",
	authDomain: "pocket-bird.firebaseapp.com",
	databaseURL: "https://pocket-bird.firebaseio.com",
	projectId: "pocket-bird",
	storageBucket: "pocket-bird.appspot.com",
	messagingSenderId: "904687870615",
	appId: "1:904687870615:web:359a903d4b12766ee53fd2",
	measurementId: "G-W0SV9K688M"
  };
const app = Firebase.initializeApp(firebaseConfig);
export const database = app.database();
export const firebaseAuth = app.auth();
