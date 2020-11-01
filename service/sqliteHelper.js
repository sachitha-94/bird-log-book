import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("123.db")



export const saveItem = (data,callBack) => {
    console.log('save',data,callBack)
    const {rarity, notes, speciesname, latitude, longitude, date, image}=data;
    try {
        db.transaction(tx => {
            tx.executeSql('insert into list (rarity, notes, speciesname,latitude, longitude, date, image) values (?,?,?,?,?,?,?);',
                [rarity, notes, speciesname, latitude, longitude, date, image])

        }, null, callBack
        )
    }
    catch (error) {
        console.log(error);
    }
    // props.navigation.navigate("Home")


}

export const createDb = () => {
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
export const updateList = (callBack) => {
    try {
        db.transaction(tx => {
            tx.executeSql('select* from list;', [], (_, { rows }) =>
            callBack(rows._array)
            )
        })
    }
    catch (error) {
        console.log(error)
    }

}

export const deleteItem = (id,callBack) => {
    try {
        db.transaction(
            tx => {
                tx.executeSql('delete from list where id = ?;', [id])
            },
            null,
            callBack
        )
    }
    catch (error) {
        console.log(error)
    }
}
