import React, { useEffect, useState } from 'react';
import {  View,StyleSheet} from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAllLogNotes } from '../service/firebaseHelper';
import { getLogNoteResponse, } from '../actions/logNoteAction';

const MapScreen = (props) => {
    const { logNotes, getLogNoteResponseActions } = props;

    useEffect(() => {
        getAllLogNotesAction();
    }, []);

    const getAllLogNotesAction = async () => {
        const data = await getAllLogNotes();
        getLogNoteResponseActions(data);
    }

    return ( 
            <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                showsUserLocation
                region={{
                        latitude: 7.8731,
                        longitude: 80.7718,
                        latitudeDelta: 2.5,
                        longitudeDelta: 2.5
                    }} >
                {logNotes?.data?.map((item) => (
                    <Marker
                        coordinate={item?.location}

                    />))}

                </MapView>
            </View>)
}


const mapStateToProps = state => ({
    logNotes: state.logNotes,
});

const mapDispatchToProps = dispatch => ({
    getLogNoteResponseActions: bindActionCreators(getLogNoteResponse, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)

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