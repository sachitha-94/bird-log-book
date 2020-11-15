import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Image, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native';
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
      <Button
        title="Don't you have an account? Sign Up" color="transparent"
        onPress={() => setSelectedScreen('SIGNUP')}
      />
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
      <Button
        title="Do you have an account? Sign In" color="transparent"
        onPress={() => setSelectedScreen('SIGNIN')}
      />
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
    color: '#fff',
    fontSize: 26,
    marginBottom: 10
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: '#fff',
    borderWidth: 1,
    marginTop: 8,
    color: '#fff'
  },
  signupBtn: {
    borderRadius: 5,
    marginBottom: 5,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    width: 100,
    height: 35,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center'
  }
})

// const styles = StyleSheet.compose(stylesSheet);

// export default Login;