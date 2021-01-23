import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView, StatusBar } from 'react-native';
import moment from 'moment';
import MapView from 'react-native-maps'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, CardTitle, CardContent, CardAction, CardImage } from 'react-native-material-cards'
import { getAllLogNotes } from '../service/firebaseHelper';
import { getLogNoteResponse, } from '../actions/logNoteAction';

const Homescreen = (props) => {
    // const [logNotes, setLogNotes] = useState([]);
    const [counter, setCounter] = useState(0);
    const { navigation, logNotes, getLogNoteResponseActions } = props;

    useEffect(() => {
        getAllLogNotesAction()
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            getAllLogNotesAction();
            setCounter(counter + 1);
        }, 60000);

        return () => clearInterval(interval)

    }, [counter]);

    useEffect(() => {
        console.log('logNotes=======>>>>', logNotes);

    }, [logNotes]);

    const getAllLogNotesAction = async () => {
        const data = await getAllLogNotes();
        // setLogNotes(data);
        getLogNoteResponseActions(data);
        console.log('logNotes---<<...>>.', data);
    }

    // const alert = (date, speciesname, id) => {
    //     Alert.alert(
    //         'You are about the delete item saved on ' + date,
    //         'Species name: ' + speciesname,

    //         [
    //             {
    //                 text: 'Cancel',
    //                 onPress: () => console.log('Cancel Pressed'),
    //                 style: 'cancel',
    //             },
    //             { text: 'Delete', onPress: () => deleteItemAction(id) },
    //         ],
    //         { cancelable: false },
    //     );
    // }


    return (
        <View style={{ flex: 1, width: "100%", height: "100%", }}>
                <ScrollView>
                    <StatusBar backgroundColor="green" barStyle='default' />
                {logNotes?.data?.length ? logNotes.data.map((note) => {
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

                    }) 
                    : <View style={{ flex: 1, justifyContent: "center", alignItems: "center", flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 20, borderColor: "grey", borderWidth: 3, margin: 5 }} >Loading... </Text>
                    </View>
                }
                </ScrollView>
        </View>
    )


}

const mapStateToProps = state => ({
    logNotes: state.logNotes,
});

const mapDispatchToProps = dispatch => ({
    getLogNoteResponseActions: bindActionCreators(getLogNoteResponse, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homescreen)

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