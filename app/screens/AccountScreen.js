import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import Icon from '../components/Icon'
import ListItem from '../components/ListItem'
import ListItemSeparator from '../components/ListItemSeparator'
import Screen from '../components/Screen'
import colors from '../config/colors'

const menuItems = [
    {
        title: "My listings",
        icon: {
            name: "format-list-bulleted",
            backgroundColor: colors.primary,
        },
        targetScreen: "Listings"
    },
    {
        title: "My Messages",
        icon: {
            name: "email",
            backgroundColor: colors.secondary,
        },
        targetScreen: "Messages"
    },
]

export default function AccountScreen({ navigation }) {
    return (
        // <Screen style={styles.screen}>
        <View style={styles.screen}>
            <View style={styles.container}>
                <ListItem
                    title="Brian Mwendwa"
                    subTitle="brianmwendwa.mu@gmail.com"
                    image={require('../../assets/user.jpg')}
                />
            </View>
            <View style={styles.container}>
                <FlatList
                    data={menuItems}
                    keyExtractor={menuItem => menuItem.title}
                    ItemSeparatorComponent={ListItemSeparator}
                    renderItem={({ item }) =>
                        <ListItem
                            title={item.title}
                            IconComponent={
                                <Icon name={item.icon.name} backgroundColor={item.icon.backgroundColor} />
                            }
                        // onPress={() => navigation.navigate(item.targetScreen)}
                        />
                    }
                />
            </View>
            <ListItem
                title="log Out"
                IconComponent={
                    <Icon name="logout" backgroundColor={colors.danger} />
                } />
        </View>
        // {/* </Screen> */ }
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    },
    screen: {
        backgroundColor: colors.light,
    }
})
