import React, { useState, useEffect } from 'react'
import { Picker, View, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Input, Button, Icon } from 'react-native-elements';
import * as Location from 'expo-location';
import moment from 'moment';
import * as Permissions from 'expo-permissions';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("123.db")


const AddResult = (props) => {
    const [speciesname, setspeciesname] = useState('');
    const [rarity, setRarity] = useState("");
    const [notes, setNotes] = useState("");
    const [pickerItems, setPickerItems] = useState(["Common", "Rare", "Extremely rare"])
    const [location, setLocation] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [listOfItems, setListOfItems] = useState([])
    const [index, setIndex] = useState(0);
    const [image, setImage] = useState(null)
    const [imageNorma, setImageNormal] = useState(null);
    const date = moment().format('MMMM Do YYYY h:mm a ')


    useEffect(() => {
        getPermissions();
        getLocation();
        createDb();
        updateList();
        getLocation();


    }, []);

    getLocation = async () => {
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true })
        setLocation(location)
        setLongitude(location.coords.longitude)
        setLatitude(location.coords.latitude);

    }
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


    const saveItem = () => {
        try {
            db.transaction(tx => {
                tx.executeSql('insert into list (rarity, notes, speciesname,latitude, longitude, date, image) values (?,?,?,?,?,?,?);',
                    [rarity, notes, speciesname, latitude, longitude, date, image])

            }, null, updateList
            )
        }
        catch (error) {
            console.log(error);
        }
        props.navigation.navigate("Home")


    }

    createDb = () => {
        try {
            db.transaction(tx => {
                tx.executeSql('create table if not exists list (id integer primary key not null, rarity text, notes text, speciesname text, latitude number, longitude number, date blob, image blob );');
                //   console.log(tx.executeSql)
            })
        }
        catch (error) {
            console.log(error)
        }

    }
    const updateList = () => {
        try {
            db.transaction(tx => {
                tx.executeSql('select* from list;', [], (_, { rows }) =>
                    setListOfItems(rows._array)
                )
            })
        }
        catch (error) {
            console.log(error)
        }

    }


    getPermissions = async () => {
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
                { text: 'Save', onPress: () => saveItem() },
            ],
            { cancelable: false },
        );
    }



    return (
        <View style={{ flex: 1, width: "100%", height: "100%", }}>
            <View style={{ flex: 1, paddingTop: 30 }}>
                <View style={{ padding: 20 }}>
                    <Input inputStyle={{ height: 30 }}
                        clearButtonMode="always"
                        placeholder='Species name'
                        label="Species"
                        onChangeText={(speciesname) => setspeciesname(speciesname)}
                    />
                </View>
                <View style={{ padding: 20 }}>
                    <Input
                        placeholder='Notes'
                        label="Notes"
                        onChangeText={(notes) => setNotes(notes)}
                    />
                </View>
                <View style={{ padding: 20 }}>
                    <Picker style={{ height: 30, width: "100%" }}
                        selectedValue={rarity}
                        onValueChange={(itemValue, itemIndex) => {
                            setRarity(itemValue), setIndex(itemIndex);
                        }}>

                        <Picker.Item style={{ color: "grey" }} key={'unselectable'} label={"Choose rarity"} value={0} />
                        {
                            pickerItems.map((item, index) =>
                                <Picker.Item key={index} label={item} value={item} />)
                        }
                    </Picker>
                </View>

                <View style={{ justifyContent: "center", alignItems: "center", paddingTop: 10, margin: 10 }}>
                    {image &&
                        <Image source={{ uri: imageNorma }} style={{ margin: 10, width: "100%", height: 200 }} />}
                    <Button
                        icon={<Icon name="photo-camera" size={15} color="white" />}
                        title="Pick an image from camera roll"
                        onPress={pickImage}
                    />
                </View>
                <View style={{ padding: 20 }}>
                    <Button
                        disabled={!date || !speciesname || !rarity}
                        icon={<Icon name="check-box" size={15} color="white" />}
                        title="Add to list ttt" onPress={() => alert(date, speciesname, rarity, notes)}></Button>
                </View>
            </View>
        </View >
    )
}

export default AddResult
