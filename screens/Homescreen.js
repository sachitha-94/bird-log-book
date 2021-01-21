import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, Alert, FlatList, StyleSheet, Image, ScrollView, StatusBar } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("123.db")
import moment from 'moment';
import MapView, { Marker } from 'react-native-maps'
import { NavigationEvents } from "react-navigation";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import { deleteItem, updateList } from '../service/sqliteHelper';
import { getAllLogNotes } from '../service/firebaseHelper';




const Homescreen = (props) => {
    const [logNotes, setLogNotes] = useState([]);
    const [counter, setCounter] = useState(0);

    const [listOfItems, setListOfItems] = useState([])
    const [booleanFlag, setBooleanFlag] = useState(true)
    const [flag, setFlag] = useState(false);
    const [latitude, setLatitude] = useState(60.192059);
    const [longitude, setLongitude] = useState(24.945831);
    //listOfItems.reverse();
    const { navigation } = props;

    useEffect(() => {
        console.log('first hit---->');
        updateListAction();
        setTimeout(() => setBooleanFlag(false), 1000)
        getAllLogNotesAction()
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            getAllLogNotesAction();
            setCounter(counter + 1);
        }, 10000);

        return () => clearInterval(interval)

    }, [counter]);

    useEffect(() => {
        console.log(navigation);
    }, [navigation])

    const getAllLogNotesAction = async () => {
        const data = await getAllLogNotes();
        setLogNotes(data);
        console.log(data);
    }
    const refresh = () => {
        getAllLogNotesAction();
    }

    const deleteItemAction = (id) => {
        deleteItem(id, updateListAction);
    }

    const updateListAction = () => {
        console.log('updateActionHome')
        updateList(setListOfItems);

    }

    const alert = (date, speciesname, id) => {
        Alert.alert(
            'You are about the delete item saved on ' + date,
            'Species name: ' + speciesname,

            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Delete', onPress: () => deleteItemAction(id) },
            ],
            { cancelable: false },
        );
    }


    return (
        <>
            {/* {
                booleanFlag ? (

                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size={60} color="#0000ff" />

                    </View >
                ) : */}
            <View style={{ flex: 1, width: "100%", height: "100%", }}>


                {
                /* <NavigationEvents onDidFocus={() => updateListAction()} /> */}
                {/* {flag &&
                            <View style={{ flex: 0.4, margin: 5 }}>
                                <View style={{ flex: 1 }}>
                                    <MapView

                                        style={{ flex: 1 }}
                                        region={{
                                            latitude: latitude,
                                            longitude: longitude,
                                            latitudeDelta: 0.0322,
                                            longitudeDelta: 0.0221
                                        }} >
                             ;l           <Marker
                                            coordinate={{ latitude: latitude, longitude: longitude }}

                                        />

                                    </MapView>
                                    <Button icon={
                                        <Icon
                                            name="close"
                                            size={15}
                                            color="white"
                                        />}
                                        title="Close map" onPress={() => setFlag(false)}></Button>
                                </View>

                            </View>} */}
                <ScrollView>
                    <StatusBar backgroundColor="green" barStyle='default' />
                    {logNotes && logNotes.length ? logNotes.map((note) => {
                        const relativeTime = moment(Number.parseInt(note.timestamp || '', 10)).fromNow();
                        return (
                        <View key={note.timestamp} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Card>
                                <CardTitle
                                    title={note?.user?.email|| note?.user?.name}
                                    subtitle={relativeTime}
                                />
                                <CardImage
                                    source={{ uri: note.imagePath }}
                                    title={note.birdName}
                                />
                                <CardContent  >
                                    <Text >Elevation - {note.elevation}</Text>
                                    <Text >Habitat   - {note.habitat}</Text>
                                    <Text >Shape     - {note.shape}</Text>
                                    <Text >Size      - {note.size}</Text>
                                </CardContent>
                                <CardAction
                                    separator={true}
                                    inColumn={false}>
                                    <MapView

                                        style={styles.mapView}
                                        region={{
                                            latitude: note.location.latitude || 0,
                                            longitude: note.location.longitude || 0,
                                            latitudeDelta: 0.7002,
                                            longitudeDelta: 0.7001
                                        }}

                                    // onPress={(e) => mapViewOnPress(e.nativeEvent.coordinate)}
                                    >
                                        <MapView.Marker coordinate={note.location} />

                                    </MapView>
                                    {/* <CardButton
                                        onPress={() => { }}
                                        title="Push"
                                        color="blue"
                                    />
                                    <CardButton
                                        onPress={() => { }}
                                        title="Later"
                                        color="blue"
                                    /> */}
                                </CardAction>
                            </Card>
                        </View>)

                    }) : <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 20, borderColor: "grey", borderWidth: 3, margin: 5 }} >No content in your list. Click button to add new observation </Text>
                        </View>}

                    <Button buttonStyle={{ borderRadius: 0, marginTop: 2 }} icon={
                        <Icon
                            name="add"
                            size={15}
                            color="white"
                        />
                    } title="refresh" onPress={() => refresh()}></Button>
                </ScrollView>
            </View>
            {/* } */}
        </>
    )


}

export default Homescreen;
const styles = StyleSheet.create({
    text: {
        fontSize: 20
    },
    textBold: {
        fontSize: 20,
        fontWeight: "bold"
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    mapView: {
        height: 80,
        padding: 10,
        borderRadius: 4,
        flex: 1
    },
});