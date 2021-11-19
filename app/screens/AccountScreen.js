import React, { useContext } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import Firebase from '../config/Firebase'
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider'
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

const auth = Firebase.auth()

export default function AccountScreen({ navigation }) {
    const { user } = useContext(AuthenticatedUserContext);

    const handleLogout = async () => {
        try {
            await auth.signOut()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <ListItem
                    title={user.displayName}
                    subTitle={user.email}
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
                onPress={handleLogout}
                IconComponent={
                    <Icon
                        name="logout" backgroundColor={colors.danger} />
                } />
        </View>
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
