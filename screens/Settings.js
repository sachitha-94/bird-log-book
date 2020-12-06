import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Image, Dimensions, TouchableOpacity, AsyncStorage, Link } from 'react-native';
import { firebaseAuth } from '../config';
import { signUp, signIn, getCurrentUserProfile, signOut } from '../service/firebaseHelper';
import { profileRequest, profileResponse } from '../actions/profileAction';
import { getAsyncStorageData } from '../service/asyncStorageHelper';
import { EMAIL } from '../constants';
const Settings = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedScreen, setSelectedScreen] = useState('SIGNIN');

  const { navigation, dispatch, profile, profileResponseActions } = props


  const handleSignUp = () => {
    // TODO: Firebase stuff...
    console.log('handlesignup')
    const data = { name, email, password };
    const response = signUp(data, navigation);
  }
  const handleSignIn = () => {
    // TODO: Firebase stuff...
    console.log('handleLogin')
    const data = { email, password };
    signIn(data, navigation);
    const user = getCurrentUserProfile();
    profileResponseActions(user);
    const emailA = getAsyncStorageData(EMAIL);
    console.log('asincEmail-->', emailA);

  }
  const handleSignOutButton = () => {
    signOut();
    const user = getCurrentUserProfile();
    profileResponseActions(user);
    console.log('user---->>', user);
  }

  useEffect(() => {
    const user = getCurrentUserProfile();
    profileResponseActions(user);
  }, [])
  useEffect(() => {
    console.log(profile);
  }, [profile])

  const renderSignInScreen = () => (
    <>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        style={styles.textInput}
        onChangeText={email => setEmail(email)}
        value={email}
      />
      <TextInput
        secureTextEntrys
        placeholder="Password"
        autoCapitalize="none"
        style={styles.textInput}
        onChangeText={password => setPassword(password)}
        value={password}
      />
      <TouchableOpacity onPress={handleSignIn}>
        <View style={styles.signupBtn}>
          <Text style={styles.buttonText}>Log In</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setSelectedScreen('SIGNUP')}>
        <Text style={styles.registerText} >Don't you have an account? Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignOutButton}>
        <View style={styles.signupBtn}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </View>
      </TouchableOpacity>
    </>
  );
  const renderSignUpScreen = () => (
    <>
      <TextInput
        placeholder="Name"
        autoCapitalize="none"
        style={styles.textInput}
        onChangeText={name => setName(name)}
        value={name}
      />
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        style={styles.textInput}
        onChangeText={email => setEmail(email)}
        value={email}
      />
      <TextInput
        secureTextEntrys
        placeholder="Password"
        autoCapitalize="none"
        style={styles.textInput}
        onChangeText={password => setPassword(password)}
        value={password}
      />
      <TouchableOpacity onPress={handleSignUp}>
        <View style={styles.signupBtn}>
          <Text style={styles.buttonText}>Create Account</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSelectedScreen('SIGNIN')}>
        <Text style={styles.registerText} >Do you have an account? Sign In</Text>
      </TouchableOpacity>

    </>

  )

  return (
    <ImageBackground source={require('../images/bgImg.png')} style={{ width: '100%', height: '100%' }}>
      <View style={styles.container}>
        <View style={styles.headingSection}><Image source={require('../images/userImg.png')} style={{ width: 100, height: 100 }} /></View>
        <Text style={styles.heading}>Login</Text>
        {/* {errorMessage &&
            <Text style={{ color: 'red' }}>
              {errorMessage}
            </Text>} */}
        {selectedScreen === 'SIGNIN' && renderSignInScreen()}
        {selectedScreen === 'SIGNUP' && renderSignUpScreen()}

      </View>
    </ImageBackground>
  );

}

const mapStateToProps = state => ({
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  profileRequestActions: bindActionCreators(profileRequest, dispatch),
  profileResponseActions: bindActionCreators(profileResponse, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings)




const heightConst = Dimensions.get('screen').height;
const styles = StyleSheet.create({
  container: {
    height: heightConst - 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headingSection: {
    borderColor: 1,
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 35
  },
  heading: {
    color: '#006400',
    fontSize: 26,
    marginBottom: 10
  },
  textInput: {
    height: 60,
    width: '90%',
    borderColor: '#006400',
    borderWidth: 1,
    marginTop: 8,
    fontSize: 25
    // color: '#fff'
  },
  signupBtn: {
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: '#006400',
    borderWidth: 1,
    // borderColor: '#fff',
    width: 200,
    height: 40,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    fontSize: 30
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  },
  registerText: {
    backgroundColor: 'transparent',
    color: '#32CD32',
    margin: 10,
    fontSize: 20
  }
})

// const styles = StyleSheet.compose(stylesSheet);

// export default Login;