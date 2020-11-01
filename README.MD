# Bird watching Application React Native


### Application for bird watchers will allow you to save your observations locally to your phone.
### Insturctions with Android APK.
- You can drop the apk straight to Android Studio and runn it. 

Apllication will collect coordinates and allow you to insert photo of yor observation to your phones localstorage.

### Insturctions to sue application without APK

##### Step to get this application working locally

- download content from repositroy and open with desired editor.
- Now you need to install node and npm. After installment run npm instll in the project root. If you have Node and npm,just run the npm install in the project root to download all dependencies needed to run the project.
- Then i recommend to install locally [Expo](https://expo.io/learn). This makes it much easier to run and bluid projects. 
- Now you need to start your project in terminal. expo start or npm start will open the project on a local server and provide a QR code that can be scanned with your phone. The Expo app which can be found in the google Play store or App store will be used to scann the code. You can also run the application by choosing Run on Andoir device/emulator when the project will start in your Android studio.  


### Description of applciation and solutions.

Firstime working with SQLite and sotring photos in base64 format. 
Had little problems here and there, but in the end everything worked out. 

On the first page it will on the initial render show that list is empy and you can add from the button below. 
In the second page saving is disabled untill you have fille all areas other than choose photo. Premissions are asked to use your location and camera roll. After saving there will be an window with confirmation message of saving or discarding entry. After acceptance will automatically navigate to main page with the view of observation list. Eeach list element can be deleted or shown on a hidden map view. List is rendered with desired information about observation post newest post is the first one one the list. 


-Juan C





