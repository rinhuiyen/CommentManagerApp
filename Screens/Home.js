import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import * as post from '../Data/post.json';

export default function Home({ navigation }) {

    const dataPosts = post;
    const data = Object.keys(dataPosts).map(key => ({
        key, ...dataPosts[key]
    }));

    let handleSelect = (item) => {
        navigation.navigate('Comments',
            { post: item }
        )
    }

    return (
        <View>
            <FlatList
                data={data}
                renderItem={({ item }) =>
                    <View style={styles.inputStyle}>
                        <TouchableOpacity onPress={() => handleSelect(item)}>
                            <View style={styles.innerText}>
                                <View style={styles.innerInnerText}>
                                <Text style={styles.title}>Title: {item.title} </Text>
                                    <Text>By UserId: {item.userId}</Text>
                                    <Text>Content: </Text>
                                    <Text>{item.body}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>
    );

}

const styles = StyleSheet.create({
    text: {
        padding: 5,
        fontSize: 15,
        textAlign: 'center',
        alignItems: 'center',
    },
    innerText: {
        padding: 5,
        fontSize: 20,
        flexDirection: 'row',
    },
    innerInnerText: {
        padding: 5
    },
    inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        borderColor: "#ccc",
        borderBottomWidth: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20

    }
});