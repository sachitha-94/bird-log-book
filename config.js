import Firebase from 'firebase';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAvUvWkLMVTnFC9fpEJnMvNgOt-xuLV3nc",
	authDomain: "pocket-bird-767a5.firebaseapp.com",
	databaseURL: "https://pocket-bird-767a5-default-rtdb.firebaseio.com",
	projectId: "pocket-bird-767a5",
	storageBucket: "pocket-bird-767a5.appspot.com",
	messagingSenderId: "949623098981",
	appId: "1:949623098981:web:f2ee94837891c7c0e8408c",
	measurementId: "G-NJMVB2G9HF"
  };
const app = Firebase.initializeApp(firebaseConfig);
export const firebaseDatabase = app.database();
export const firebaseAuth = app.auth();
export const firebaseStorage = app.storage();

