import React from 'react';
import { View,StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

function ListItemSeperator() {
    return (
        <View style={ styles.lineSeparator}/>
    );
}

export default ListItemSeperator;

const styles = StyleSheet.create({
    lineSeparator:{
        width: "100%",
        height: 1,
        backgroundColor:Colors.light.tint
    }
})