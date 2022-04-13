import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Icon, Image, Menu, Pressable, HamburgerIcon, Box } from 'native-base';
import { Avatar, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const TemplateScreen = (props) => {

    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
    const [keyboardStatus, setKeyboardStatus] = useState(false);



    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 1250,
                useNativeDriver: true
            }
        ).start();
    }, [fadeAnim])

    const [Estado, setEstado] = useState(false);
    const showAlert = () => {
        setEstado(true);
    };
    const hideAlert = () => {
        setEstado(false);
    };
    const navigation = useNavigation();

    const cerrarSesion = async () => {
        try {
            await AsyncStorage.removeItem('token')
            navigation.navigate('Login')
        } catch (e) {
            console.log(e)
        }

        console.log('Done.')
    }
    const MenuIcon = (props) => (
        <Icon as={Ionicons} size={5} name='ellipsis-vertical' />
    );


    const LogoutIcon = (props) => (
        <Icon as={Ionicons} size={5} name="log-out-outline" />
    );
    const OcultarIcon = (props) => (
        <Icon as={Ionicons} size={5} name="eye-outline" />
    );
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };
    const renderMenuAction = () => (
        <TopNavigationAction style={{ marginTop: 21 }} icon={MenuIcon} onPress={toggleMenu} />
    );
    const renderOverflowMenuAction = () => (
        <React.Fragment>
            <Avatar
                style={styles.logo}
                shape={"square"}
                size='giant'
                resizeMode="contain"
                source={require('../../assets/logos/Logo_color.png')} />
            <OverflowMenu
                anchor={renderMenuAction}
                visible={menuVisible}
                onBackdropPress={toggleMenu}
            >
                <MenuItem accessoryLeft={LogoutIcon} title='Logout' onPress={() => { cerrarSesion() }} />
                <MenuItem accessoryLeft={OcultarIcon} title='Ocultar Header' onPress={() => { props.setBotonH(false) }} />
            </OverflowMenu>

        </React.Fragment>
    );
    const renderTitle = (props) => (
        <View style={styles.titleContainer} >
            <Text style={styles.rutOp}>TROUBLESHOOTING</Text>
        </View>
    );

    return (
        <>
            <Animated.View                 // Special animatable View
                style={{

                    flexDirection: "column",
                    opacity: fadeAnim,   
                    useNativeDriver: true      // Bind opacity to animated value
                }}
            >
                <TopNavigation
                    style={{ backgroundColor: '#f0f2f0' }}
                    title={renderTitle}
                    accessoryRight={renderOverflowMenuAction}
                    accessoryLeft={props.miNombre == 'Home' ? null :
                        <Pressable onPress={() => navigation.navigate('Home')}>
                            <Icon style={{ marginTop: 20, marginRight: -10 }}
                                as={Ionicons}
                                size={7}
                                name="arrow-back-circle-outline"
                                color={'#01286B'} />
                        </Pressable>}
                />
            </Animated.View>
        </>


    )
}

export default TemplateScreen
const styles = StyleSheet.create({

    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    logo: {
        marginTop: 20,
        width: 89,
        height: 50,
    },
    rutOp: {
        color: "rgba(1,40,107,1)",
        // fontFamily: "roboto-700",
        fontSize: 15,
        marginLeft: 25,
        marginTop: 20
    },
});