import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, Alert, FlatList, StyleSheet, Image } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("123.db")
import MapView, { Marker } from 'react-native-maps'
import { NavigationEvents } from "react-navigation";
import {deleteItem,updateList} from '../service/sqliteHelper';




const Homescreen = (props) => {
    const [listOfItems, setListOfItems] = useState([])
    const [booleanFlag, setBooleanFlag] = useState(true)
    const [flag, setFlag] = useState(false);
    const [latitude, setLatitude] = useState(60.192059);
    const [longitude, setLongitude] = useState(24.945831);

    //listOfItems.reverse();

    useEffect(() => {
        updateListAction();
        setTimeout(() => setBooleanFlag(false), 1000)
    }, []);

    const deleteItemAction = (id) => {
        deleteItem(id,updateListAction);
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
            {
                booleanFlag ? (

                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size={60} color="#0000ff" />

                    </View >
                ) : <View style={{ flex: 1, width: "100%", height: "100%", }}>
                        {/* <NavigationEvents onDidFocus={() => updateListAction()} /> */}
                        {flag &&
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
                                        <Marker
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

                            </View>}

                        {listOfItems.length ? (
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <FlatList style={{ marginHorizontal: "3%", }}
                                    keyExtractor={item => item.id.toString()}
                                    data={listOfItems}
                                    renderItem={({ item }) => (
                                        <View style={{ flex: 1, padding: 20, borderBottomColor: "grey", borderBottomWidth: 2 }}>
                                            <Text><Text style={styles.textBold}>Date: </Text><Text style={styles.text}>{item.date}</Text> </Text>
                                            <Text><Text style={styles.textBold}>Species name: </Text><Text style={styles.text}>{item.speciesname}</Text> </Text>
                                            <Text><Text style={styles.textBold}>Rarity: </Text><Text style={styles.text} >{item.rarity}</Text></Text>
                                            <Text><Text style={styles.textBold}>Notes: </Text><Text style={styles.text} >{item.notes}</Text></Text>
                                            <Text style={{ paddingBottom: 10 }}><Text style={{ fontSize: 20, fontWeight: "bold" }}>Lat: </Text><Text style={styles.text} >{item.latitude} </Text>
                                                <Text style={styles.textBold}>Long: </Text><Text style={styles.text} >{item.longitude}</Text>
                                            </Text>


                                            {item.image &&
                                                <Image style={{ width: "100%", height: 200 }} source={{ uri: `data:image/gif;base64,${item.image}` }} />}
                                            <View style={{ justifyContent: "space-around", alignItems: "flex-start", paddingTop: 10, flexDirection: "row" }}>
                                                <Button
                                                    icon={
                                                        <Icon
                                                            name="delete"
                                                            size={15}
                                                            color="white"
                                                        />}
                                                    title="Delete" onPress={() => alert(item.date, item.speciesname, item.id)}></Button>
                                                {item.latitude &&
                                                    <Button
                                                        icon={
                                                            <Icon
                                                                name="lock-open"
                                                                size={15}
                                                                color="white"
                                                            />}
                                                        title="See on map" onPress={() => { setLatitude(item.latitude), setLongitude(item.longitude), setFlag(true) }}></Button>}
                                            </View>
                                        </View>
                                    )}
                                />
                            </View>) : <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 20, borderColor: "grey", borderWidth: 3, margin: 5 }} >No content in your list. Click button to add new observation </Text>
                            </View>}

                        {/* <Button buttonStyle={{ borderRadius: 0, marginTop: 2 }} icon={
                            <Icon
                                name="add"
                                size={15}
                                color="white"
                            />
                        } title="Add new observation" onPress={() => props.navigation.navigate("Add")}></Button> */}
                    </View>
            }
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




});