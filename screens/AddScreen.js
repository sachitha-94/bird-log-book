import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Alert, Image, StyleSheet, Text, TextInput, Button, } from 'react-native';
import { Picker } from '@react-native-community/picker';
import * as ImagePicker from 'expo-image-picker';
import { Input, Icon } from 'react-native-elements';
import * as Location from 'expo-location';
import moment from 'moment';
import * as Permissions from 'expo-permissions';
import { useForm, Controller } from "react-hook-form";
import DropDownPicker from 'react-native-dropdown-picker';
import MapView, { Marker } from 'react-native-maps'
import Constants from 'expo-constants';
// import uuid from 'react-native-uuid';
import { createDb, saveItem, updateList } from '../service/sqliteHelper';
import { saveLogNote } from '../service/firebaseHelper';
import { elevationList, habitatList, sizeList, shapeList } from '../constants/common'
// import Select from '../components/select';

const AddLogNote = (props) => {
  // const [birdName, setBirdName] = useState('');
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  // const [elevation, setElevation] = useState(elevationList);
  // const [habitat, setHabitat] = useState(habitatList);
  // const [size, setSize] = useState(sizeList);
  // const [shape, setShape] = useState(shapeList);
  // const [color, setColor] = useState("");
  // const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);
  const [imageNormal, setImageNormal] = useState(null);
  const date = moment().format('MMMM Do YYYY h:mm a ');

  const { register, setValue, handleSubmit, control, reset, errors } = useForm();

  const { profile } = props;

  const getCurrentLocation = async () => {
    console.log('getCurrentLocation')
    const currentLocation = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
    setLocation(currentLocation.coords);
    console.log(currentLocation)
  }

  useEffect(() => {
    console.log('useEffect===>1')
    getPermissions();
    getCurrentLocation();
    createDb();
    updateListAction();


  }, []);

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,

      aspect: [4, 3],
      base64: true,
      quality: 0.20
    });

    if (!result.cancelled) {
      setImageNormal(result.uri);
      setImage(result.base64)
    }
  };


  const saveItemAction = async () => {
    const data = { rarity, notes, speciesname, latitude, longitude, date, image };
    await saveItem(data, updateListAction);

    props.navigation.navigate("Home")
    console.log('save')

  }

  const updateListAction = () => {
    console.log('update')
    // updateList(setListOfItems);

  }


  const getPermissions = async () => {
    const { status, expires, permissions } = await Permissions.askAsync(
      Permissions.LOCATION,
      Permissions.CAMERA_ROLL
    );
    if (status !== 'granted') {
      Alert.alert('No permission to access location');
    }

  }
  const alert = (date, speciesname, rarity, notes) => {
    Alert.alert(
      date,
      'Save ' + speciesname + ", which is a " + rarity + " sighting.",
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'Save', onPress: () => saveItemAction() },
      ],
      { cancelable: false },
    );
  }


  const onSubmit = data => {
    console.log(profile);
    const timestamp = Date.now()
    // const logNoteId = uuid.v1();
    const logNoteData = { ...data, userId: profile.data.uid, location, timestamp }
    console.log('logNoteData ==..>>', logNoteData);
    const res = saveLogNote(logNoteData);
    console.log('saveLogNote ==..>>', res);
  };

  const onChange = arg => {
    return {
      value: arg.nativeEvent.text,
    };
  };
  const mapViewOnPress = (coordinate) => {
    setLocation(coordinate);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Bird name</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="birdName"
        rules={{ required: true }}
      />
      <Text style={styles.label}>Location</Text>
      <MapView

        style={styles.mapView}
        region={{
          latitude: location.latitude || 0,
          longitude: location.longitude || 0,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        }}
        onPress={(e) => mapViewOnPress(e.nativeEvent.coordinate)}
      >
        <MapView.Marker coordinate={location} />

      </MapView>

      <Text style={styles.label}>Elevation</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <DropDownPicker
            items={elevationList}
            containerStyle={{ height: 40 }}
            style={{ backgroundColor: '#fafafa' }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={item => onChange(
              item.value
            )}
          />
        )}
        name="elevation"
        rules={{ required: true }}
      />
      <Text style={styles.label}>Habitat</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <DropDownPicker
            items={habitatList}
            containerStyle={{ height: 40 }}
            style={{ backgroundColor: '#fafafa' }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={item => onChange(
              item.value
            )}
          />
        )}
        name="habitat"
        rules={{ required: true }}
      />

      <Text style={styles.label}>Size</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <DropDownPicker
            items={sizeList}
            containerStyle={{ height: 40 }}
            style={{ backgroundColor: '#fafafa' }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={item => onChange(
              item.value
            )}
          />
        )}
        name="size"
        rules={{ required: true }}
      />

      <Text style={styles.label}>Shape</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <DropDownPicker
            items={shapeList}
            containerStyle={{ height: 40 }}
            style={{ backgroundColor: '#fafafa' }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={item => onChange(
              item.value
            )}
          />
        )}
        name="shape"
        rules={{ required: true }}
      />

      <View style={styles.button}>
        <Button
          style={styles.buttonInner}
          color
          title="Save"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
}

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(AddLogNote)
// const heightConst = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#ec5990',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#0e101c',
  },
  input: {
    backgroundColor: 'white',
    //   borderColor: 'none',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  mapView: {
    height: 80,
    padding: 10,
    borderRadius: 4,
    flex: 1
  },
});