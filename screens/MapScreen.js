import React, { useEffect, useState } from 'react';
import {  View,StyleSheet} from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import {updateList} from '../service/sqliteHelper';

const MapScreen=()=>{
    const [listOfItems, setListOfItems] = useState([]);

    useEffect(() => {
        updateListAction();
    }, []);

    const updateListAction = () => {
        updateList(setListOfItems);
    }

    return ( 
            <View style={{ flex: 1 }}>
                <MapView

                    style={{ flex: 1 }}
                    region={{
                        latitude: 7.8731,
                        longitude: 80.7718,
                        latitudeDelta: 2.5,
                        longitudeDelta: 2.5
                    }} >
                    {listOfItems && listOfItems.map((item)=>(
                    <Marker
                        coordinate={{ latitude: item.latitude, longitude: item.longitude }}

                    />))}

                </MapView>
            </View>)
}

export default MapScreen;

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