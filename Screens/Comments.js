import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput } from 'react-native';
import * as rawComments from '../Data/comment.json';
import * as rawPost from '../Data/post.json';

export default function Comments({ navigation, route }) {

    const [post, setPost] = React.useState();
    const [comments, setComments] = React.useState(null);
    const [search, setSearch] = React.useState('');
    const [showComments, setShowComments] = React.useState(false);
    const [showSearchedComments, setShowSearchedComments] = React.useState(false);
    const dataComments = rawComments;

    React.useEffect(() => {
        getComments(),
            getSelectedPost(),
            setShowSearchedComments(true)
    }, []);

    let getComments = () => {

        let selectedPost = route.params.post
        var tempComments = []
        var relatedComments = []

        Object.entries(dataComments).map(([key, val]) => tempComments.push({ key, ...val }))
        for (var count in tempComments) {
            var counter = tempComments[count]

            if (counter.postId == selectedPost.id) {
                relatedComments.push(counter)
                setShowComments(true)
            }
        }
        setComments(relatedComments)

    }

    let getSelectedPost = () => {
        let selectedPost = route.params.post
        var post = []
        var allPost = []

        Object.entries(rawPost).map(([key, val]) => allPost.push({ key, ...val }))
        for (var count in allPost) {
            var counter = allPost[count]

            if (counter.id == selectedPost.id) {
                post.push(counter)
            }
        }
        setPost(post)
    }


    let filterSearch = (list) => {

        return list.filter(
            (listItem) =>
                listItem.name.toLowerCase().includes(search.toLowerCase())
                ||
                listItem.email.toLowerCase().includes(search.toLowerCase())
                ||
                listItem.body.toLowerCase().includes(search.toLowerCase())
        );

    }



    return (

        <View>
            <FlatList
                data={post}
                renderItem={({ item }) =>
                    <View style={styles.inputStyle}>
                        <View style={styles.innerText}>
                            <View style={styles.innerInnerText}>
                                <Text style={styles.title}>Title: {item.title} </Text>
                                <Text>By UserId: {item.userId}</Text>
                                <Text>Content: </Text>
                                <Text>{item.body}</Text>
                            </View>
                        </View>
                    </View>
                }
                ListFooterComponent={
                    <>
                        {
                            showComments ?
                                <TextInput
                                    onChangeText={(search) => setSearch(search)}
                                    style={styles.searchBar}
                                    placeholder="Enter Keyword to Search"
                                />

                                :
                                <View style={styles.innerText}>
                                    <View style={styles.innerInnerText}>
                                        <Text style={styles.user}>There are no comments on this post.</Text>
                                    </View>
                                </View>

                        }
                        {
                            showSearchedComments ?
                                <View>
                                    {filterSearch(comments).map((listItem, index) => (
                                        <View key={index} >
                                            <View style={styles.inputStyle}>
                                                <View style={styles.innerText}>
                                                    <View style={styles.innerInnerText}>
                                                        <Text style={styles.user}>Name: {listItem.name} </Text>
                                                        <Text style={styles.user}>Email: {listItem.email}</Text>
                                                        <Text>Content: {listItem.body}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </View>

                                :
                                <>
                                </>
                        }
                    </>
                }
            />

        </View>

    );

}

const styles = StyleSheet.create({
    text: {
        padding: 5,
        fontSize: 20,
        textAlign: 'center',
        alignItems: 'center',
    },
    innerText: {
        padding: 5,
        fontSize: 20,
        flexDirection: 'row',
    },
    inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        borderColor: "#ccc",
        borderBottomWidth: 1,
    },
    searchBar: {
        fontSize: 24,
        margin: 10,
        width: '90%',
        height: 50,
        backgroundColor: 'white',
        padding: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20

    },
    user: {
        fontWeight: 'bold',
    }
});