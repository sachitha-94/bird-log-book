
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getAllLogNotes } from '../service/firebaseHelper';
import { getLogNoteResponse, } from '../actions/logNoteAction';

// import all the components we are going to use
import {
    SafeAreaView,
    StyleSheet,
    View,
    FlatList,
    Image
} from 'react-native';

const App = (props) => {

    const { navigation, logNotes, getLogNoteResponseActions } = props;
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        getAllLogNotesAction()
    }, []);

    const getAllLogNotesAction = async () => {
        const data = await getAllLogNotes();
        // setLogNotes(data);
        getLogNoteResponseActions(data);
        console.log('logNotes---<<...>>.', data);
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={logNotes?.data || []}
                renderItem={({ item }) => {
                    if (item?.imagePath)
                        return (
                            <View
                                style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    margin: 1
                                }}>
                                <Image
                                    style={styles.imageThumbnail}
                                    source={{ uri: item.imagePath }}
                                />
                            </View>
                        )
                }}
                //Setting the number of column
                numColumns={3}
                keyExtractor={(item, index) => index}
            />
        </SafeAreaView>
    );
};

const mapStateToProps = state => ({
    logNotes: state.logNotes,
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
});