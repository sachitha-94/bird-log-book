
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-native-modal';
import {
    Card,
    CardTitle,
    CardContent, CardAction, CardImage
} from 'react-native-material-cards';
import MapView from 'react-native-maps';

import { getAllLogNotes, removeLogNote } from '../service/firebaseHelper';
import { getLogNoteResponse } from '../actions/logNoteAction';

// import all the components we are going to use
import {
    SafeAreaView,
    StyleSheet,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    Text,
    Button,
    StatusBar
} from 'react-native';

const App = (props) => {

    const { navigation, logNotes, getLogNoteResponseActions, profile } = props;
    const [selectedNote, setSelectedNote] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);



    useEffect(() => {
        getAllLogNotesAction()
    }, []);

    const getAllLogNotesAction = async () => {
        const data = await getAllLogNotes();
        // setLogNotes(data);
        getLogNoteResponseActions(data);
        console.log('logNotes---<<...>>.', data);
    }

    const toggleModalOpen = (data) => {
        setModalVisible(true);
        setSelectedNote(data);
        console.log("onOpen-->>>", selectedNote, isModalVisible);
    };

    const toggleModalClose = () => {
        setModalVisible(false);
        setSelectedNote(null);
        console.log("toggleModalClose-->>>", selectedNote, isModalVisible);
    };
    const removeButtonOnClik = async (key) => {
        await removeLogNote(key);
        await getAllLogNotesAction()
        toggleModalClose();
        console.log('response delete button on cli--->>>', res);
    }
    const addLogNOteOnClick = () => {
        navigation.navigate('Add');
    }
    const renderModal = () => (
        isModalVisible && selectedNote &&
        <Modal
            isVisible={isModalVisible}
            animationInTiming={0}
            coverScreen={false}
            onSwipeComplete={() => toggleModalClose()}
            swipeDirection="right"
        // onBackdropPress={() => toggleModalClose()}
        >
            <Card>
                <CardTitle
                    title={selectedNote?.user?.email || selectedNote?.user?.name}
                // subtitle={relativeTime}
                />
                <CardImage
                    style={styles.cardImage}
                    source={{ uri: selectedNote?.imagePath }}
                    title={selectedNote?.birdName}
                />
                <CardContent  >
                    <Text >Elevation - {selectedNote?.elevation}</Text>
                    <Text >Habitat   - {selectedNote?.habitat}</Text>
                    <Text >Shape     - {selectedNote?.shape}</Text>
                    <Text >Size      - {selectedNote?.size}</Text>
                </CardContent>
                <CardAction
                    separator={true}
                    inColumn={false}>
                    <MapView

                        style={styles.mapView}
                        region={{
                            latitude: selectedNote.location.latitude || 0,
                            longitude: selectedNote.location.longitude || 0,
                            latitudeDelta: 0.7002,
                            longitudeDelta: 0.7001
                        }}

                    // onPress={(e) => mapViewOnPress(e.nativeEvent.coordinate)}
                    >
                        <MapView.Marker coordinate={selectedNote.location} />

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

            <Button
                color="#f44336"
                title="Delete"
                onPress={() => removeButtonOnClik(selectedNote.key)} />
        </Modal>
    )

    return (
        <>
            <StatusBar backgroundColor="green" barStyle='default' />
        <SafeAreaView style={styles.container}>
                {logNotes?.data ? <FlatList
                data={logNotes?.data || []}
                renderItem={({ item }) => {
                    if (profile?.data?.email === item?.user?.email && item?.imagePath)
                        return (
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    margin: 1
                                }}
                            >
                                <TouchableOpacity
                                    activeOpacity={1}
                                    onPress={() => toggleModalOpen(item)}>
                                     <Image
                                    style={styles.imageThumbnail}
                                    source={{ uri: item.imagePath }}
                                />
                                </TouchableOpacity>

                            </View>
                        )
                }}
                //Setting the number of column
                    numColumns={2}
                keyExtractor={(item, index) => index}
                /> :
                    <Button
                        color="#006400"
                        title="Add Log Note"
                        onPress={() => addLogNOteOnClick()}
                        style={{ padding: 30 }}
                    />

                }
        </SafeAreaView>

            { isModalVisible && selectedNote && renderModal()}
        </>
    );
};

const mapStateToProps = state => ({
    logNotes: state.logNotes,
    profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
    getLogNoteResponseActions: bindActionCreators(getLogNoteResponse, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#A9DFBF',
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        margin: 10
    },
    mapView: {
        height: 200,
        padding: 10,
        borderRadius: 4,
        flex: 1
    },
    cardImage: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 400,
        margin: 10
    },
});