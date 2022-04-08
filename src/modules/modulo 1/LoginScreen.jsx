import { StyleSheet, Text, View, ImageBackground, Dimensions, ScrollView, Image, StatusBar, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { Box, Button, FormControl, Icon, Input, Stack, useToast, } from 'native-base';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { postLogin } from '../services/loginService';
import { useAuth } from '../context/authState';
import Asyncstorage from "@react-native-async-storage/async-storage"
import { useNavigation } from '@react-navigation/native';
//import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';

import { Ionicons } from '@expo/vector-icons';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
const image = require('../../../assets/backgrounds/Pantalla_login.png')
const logo_blanco = require('../../../assets/logos/Logo_blanco.png')
import { EvilIcons } from '@expo/vector-icons';

const LoginScreen = () => {

    const [formularioDatos, setFormularioDatos] = useState({
        email: '',
        password: '',
    })

    const [cargando, setCargando] = useState(false)

    const [Estado, setEstado] = useState(false);
    const showAlert = () => {
        setEstado(true);
    };
    const hideAlert = () => {
        setEstado(false);
    };

    const [textoCambiante, setTextoCambiante] = useState('Ingresar')

    const { token, setToken } = useAuth()
    const navigation = useNavigation();

    const toast = useToast();

    const doLogin = () => {
        setCargando(true)
        setTextoCambiante('Cargando')
        postLogin(formularioDatos).then((response) => {
            setToken(response.data.token)
            Asyncstorage.setItem('token', response.data.token).then((response) => {

                handleOpen()

            })
            setCargando(false)
            navigation.navigate('Home')
            setTextoCambiante('Ingreso Exitoso')
        }, err => {
            setCargando(false)
            toast.show({
                title: "Error",
                status: "error",
                description: "Usuario no encontrado"
            })
        })
    }


    //loader
    const [visible, setVisible] = useState(false);

    const [show, setShow] = useState(false)

    const handleOpen = () => {
        setShow(true)
    }

    const handleClose = () => {
        setShow(false)
    }

    return (

        <ScrollView style={{ flex: 1, backgroundColor: '#02286B' }}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor="rgba(200, 200, 200, 0.29)" animated={true} />


            <ImageBackground source={image} style={styles.image}>

                <View style={styles.portadaView}>
                    <Text style={styles.portadaViewText}>
                        TROUBLESHOOTING
                    </Text>
                    <Text style={styles.portadaViewTextSmall}>
                        Registro de Solución de Problemas
                    </Text>
                    <Image source={logo_blanco} style={styles.logo_blanco} />
                </View>

            </ImageBackground>

            {/* Aqui sigue el cuerpo de bienvenida */}
            <View style={styles.bodyContainer}>

                <View style={{ padding: 40 }}>
                    <Text style={{ color: "white", fontSize: 34, fontFamily: 'Roboto', lineHeight: 28.13, paddingTop: 5 }}>
                        Bienvenido
                    </Text>

                    <Text style={{ color: 'white', fontFamily: 'Roboto', fontSize: 14, lineHeight: 16.41 }}>
                        Iniciar Sesión para Continuar
                    </Text>
                    <>
                        <View style={{ marginTop: 50 }}>
                            <FormControl>
                                <Stack space={5}>
                                    <Stack backgroundColor={"#023285"} style={styles.cajasTexto}>
                                        <FormControl.Label _text={{ color: '#669EFF', fontSize: 14 }}>USUARIO</FormControl.Label>
                                        <Input onChangeText={value => setFormularioDatos({ ...formularioDatos, email: value })}
                                            fontSize={16} color={'white'}
                                            variant="underlined"
                                            InputLeftElement={
                                                <Icon
                                                    as={<FontAwesomeIcon
                                                        name="user"
                                                        style={styles.iconUser} />}
                                                    size={2} />}
                                            p={2}
                                            placeholder="UsuarioTinyata" />
                                    </Stack>
                                    <Stack backgroundColor={"#023285"} style={styles.cajasTexto}>
                                        <FormControl.Label _text={{ color: '#669EFF', fontSize: 14 }}>CONTRASEÑA</FormControl.Label>
                                        <Input onChangeText={value => setFormularioDatos({ ...formularioDatos, password: value })}
                                            fontSize={16}
                                            color={'white'}
                                            variant="underlined"
                                            InputLeftElement={
                                                <Icon
                                                    as={<FontAwesomeIcon
                                                        name="lock"
                                                        style={styles.iconUser} />}
                                                    size={2} />}
                                            p={2}
                                            placeholder="*******"
                                            secureTextEntry={true} />
                                    </Stack>
                                    {
                                        !cargando ?
                                            (<Button onPress={() => doLogin()} backgroundColor={'white'} _text={{ color: '#01286B' }}>Ingresar</Button>)
                                            :
                                            (<Button disabled={true} backgroundColor={'white'} _text={{ color: '#01286B' }}>
                                                <ActivityIndicator size="small" color="#01286B" />
                                            </Button>)
                                    }

                                </Stack>
                            </FormControl>
                        </View>
                    </>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: 30, marginBottom: 20 }}>
                    <Text style={{ color: "white", textAlign: 'center', fontSize: 11, fontFamily: 'Roboto', lineHeight: 12.89 }}>
                        Versión 2.0
                    </Text>
                </View>
            </View>
            {/* <AwesomeAlert
                show={Estado}
                showProgress={false}
                title="Bienvenido"
                titleStyle={{ fontSize: 22, marginBottom: 10 }}
                messageStyle={{ fontSize: 18, marginBottom: 10 }}
                message="Inicio de Sesión Exitoso"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                cancelText="No"
                confirmText="Continuar"
                cancelButtonStyle={{ width: 100, alignItems: 'center', marginTop: 10 }}
                confirmButtonStyle={{ width: 100, alignItems: 'center' }}
                confirmButtonColor="#AEDEF4"
                cancelButtonColor="#DD6B55"
                onConfirmPressed={() => {
                    console.log('Ingresé')
                    navigation.navigate('Home')
                    hideAlert();
                }}
            /> */}

            {/* <SCLAlert
                show={show}
                onRequestClose={() => { handleClose() }}
                theme="info"
                title="Login"
                subtitle="Ingreso exitoso"
                headerIconComponent={<Ionicons name="ios-thumbs-up" size={32} color="white" />}
            >
                <SCLAlertButton theme="info" onPress={() => {
                    console.log('Ingresé')
                    setShow(false);
                    navigation.navigate('Home')

                }}>Continuar</SCLAlertButton>
            </SCLAlert> */}

        </ScrollView>


    );
};

export default LoginScreen;

const styles = StyleSheet.create({

    lottie: {
        width: 100,
        height: 100,
    },
    cajasTexto: {
        padding: 10
    },
    inputLogin: {
        color: 'red',
    },
    labelsStyle: {
        color: '#669EFF'
    },
    iconUser: {
        color: "white",
        fontSize: 15,
        height: 15,
        width: 19,
        marginLeft: 10
    },
    container: {
        flex: 1,
        backgroundColor: '#01286B'

    },
    portadaView: {
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(1, 40, 107, 0.5)',


    },
    logo_blanco: {
        width: 155.61,
        height: 120.78,
        marginTop: 60
    },
    portadaViewText: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
    },
    portadaViewTextSmall: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    image: {
        height: Dimensions.get('window').height / 1.7,
    },
    bodyContainer: {
        flex: 0.5,
        backgroundColor: '#01286B',
    }
});
