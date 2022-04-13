import { StyleSheet, Text, View, useWindowDimensions, Image, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import TemplateScreen from '../../Template/TemplateScreen'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { FormControl, Input, VStack, Pressable, Icon, TextArea, FlatList, HStack, ScrollView, InputGroup, InputLeftAddon, InputRightAddon, useToast } from 'native-base';
import TemplateScreenNoHeader from '../../Template/TemplateScreenNoHeader';
import { Ionicons } from '@expo/vector-icons';
import { getEquiment, getSuperIntendent } from '../services/misServicios';
import SearchableDropDown from 'react-native-searchable-dropdown';
import { Card, Modal, Button } from '@ui-kitten/components';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import ImageView from 'react-native-image-view';
import { useNavigation } from '@react-navigation/native';
import imgDefault from '../../../assets/logos/Logo_Antapaccay.png'

const AddReporte = () => {
    const toast = useToast();
    const [dateS, setDateS] = useState(new Date())

    const [miObjeto, setMiObjeto] = useState({
        event: '',
        date: dateS,
        description: '',
        attributed_cause: '',
        superintendent: '',
        supervisor: '',
        operators: '',
        downtime: '',
        details: '',
        take_actions: '',
        results: '',
        equipment_id: '',
        attachments: []
    })
    const [botonH, setBotonH] = useState(false);
    const [superIntendente, setSuperIntendente] = useState([])
    const [inputSuperIntendente, setInputSuperIntendente] = useState('')
    const [miValorModalSuperIntendente, setMiValorModalSuperIntendente] = useState('')
    const traerSuperIntendente = () => {
        getSuperIntendent(1).then((rpta) => {
            setSuperIntendente(rpta.data.data)
        })
    }
    useEffect(() => {
        traerSuperIntendente()
    }, [])
    const [equipos, setEquipos] = useState([])

    const traerEquipos = () => {

        getEquiment().then(rpta => {
            setEquipos(rpta.data.data)
        })
    }

    useEffect(() => {
        traerEquipos()
    }, [])


    const miArraySuperIntendentes = superIntendente.map(function (value) {
        return { name: value }
    })
    const [modalBuscarSuperIntendente, setModalBuscarSuperIntendente] = useState(false);
    const [modalBuscarEquipos, setModalBuscarEquipos] = useState(false)
    const [inputEquipos, setInputEquipos] = useState('')
    const [miValorModalEquipos, setMiValorModalEquipos] = useState('')

    // DATEPICKER CONSTANTES

    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        console.log(currentDate)
        setShow(false);
        setDateS(currentDate);
        miObjeto.date = currentDate
    };


    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    const [comproboCampo, setComproboCampo] = useState(true)
    var array = new Array()


    const comprobarCambos = () => {
        var aux = 0
        if (miObjeto.event == "") {
            setComproboCampo(false)
            aux = 0

        } else if (miObjeto.date == "") {
            setComproboCampo(false)
            aux = 0
        } else if (miObjeto.description == "") {
            setComproboCampo(false)
            aux = 0
        } else if (miObjeto.attributed_cause == "") {
            setComproboCampo(false)
            aux = 0

        } else if (miObjeto.superintendent == "") {
            setComproboCampo(false)
            aux = 0

        } else if (miObjeto.supervisor == "") {
            setComproboCampo(false)
            aux = 0


        } else if (miObjeto.operators == "") {
            setComproboCampo(false)
            aux = 0

        } else if (miObjeto.downtime == "") {
            setComproboCampo(false)
            aux = 0

        } else if (miObjeto.details == "") {
            setComproboCampo(false)
            aux = 0

        } else if (miObjeto.take_actions == "") {
            setComproboCampo(false)
            aux = 0

        } else if (miObjeto.results == "") {
            setComproboCampo(false)
            aux = 0

        } else if (miObjeto.equipment_id == "") {
            setComproboCampo(false)
            aux = 0

        } else if (miObjeto.attachments == null) {
            setComproboCampo(false)
            aux = 0

        } else {
            setComproboCampo(true)
            aux = 1
        }



    }

    const comprobarVacio = () => {
        let cont = 0;
        if (miObjeto.superintendent == '') {
            array.push("- Superintendente")
        } else {
            array.splice(1, 1)
        }
        if (miObjeto.supervisor == '') {
            array.push("- Supervisor")
        } else {
            array.splice(2, 1)
        }
        if (miObjeto.operators == '') {
            array.push("- Operarios")
        } else {
            array.splice(3, 1)
        }
        if (miObjeto.equipment_id == '') {
            array.push("- Equipo Afectado")
        } else {
            array.splice(4, 1)
        }
        if (miObjeto.downtime == '') {
            array.push("- Tiempo de Parada")
        } else {
            array.splice(5, 1)
        }
        if (miObjeto.details == '') {
            array.push("- Detalle de parada")
        } else {
            array.splice(6, 1)
        }
        if (miObjeto.event == '') {
            array.push("- Evento Ocurrido")
        } else {
            array.splice(7, 1)
        }
        if (miObjeto.description == '') {
            array.push("- Descripción del Evento")
        } else {
            array.splice(8, 1)
        }
        if (miObjeto.attributed_cause == '') {
            array.push("- Causa del Evento")
        } else {
            array.splice(9, 1)
        }
        if (miObjeto.take_actions == '') {
            array.push("- Acciones Realizadas")
        } else {
            array.splice(10, 1)
        }
        if (miObjeto.results == '') {
            array.push("- Resultados")
        } else {
            array.splice(11, 1)
        }

        console.log(array)
        toast.show({
            title: "Completar campos",
            status: "danger",
            description: "Los siguientes campos deben ser completados: " + "\n" + array.join("\n")
        })
    }

    useEffect(() => {
        comprobarCambos()
    })



    const [pickedImagePath, setPickedImagePath] = useState('');
    const [pickedImagePath2, setPickedImagePath2] = useState('');
    const [dataFoto, setDataFoto] = useState(

        {
            model_type: 2,
            attachmentable_type: "App\\Models\\equipos\\Troubleshooting",
            attachmentable_id: 1,
            base64: ""
        }

    )
    const [dataFoto2, setDataFoto2] = useState(

        {
            model_type: 2,
            attachmentable_type: "App\\Models\\equipos\\Troubleshooting",
            attachmentable_id: 2,
            base64: ""
        }

    )

    const showImagePicker = async () => {
        // Apreguntar por los permisos
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Te has negado a permitir que esta aplicación acceda a tus fotos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            base64: true,
        });
        if (!result.cancelled) {
            setPickedImagePath(result.uri);

            const source = { uri: 'data:image/jpeg;base64,' + result.base64 };
            // console.warn(source.uri);
            dataFoto.base64 = source.uri
            miObjeto.attachments[0] = dataFoto
        }
    }
    const showImagePicker2 = async () => {
        // Apreguntar por los permisos
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Te has negado a permitir que esta aplicación acceda a tus fotos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            base64: true,
        });
        if (!result.cancelled) {
            setPickedImagePath2(result.uri);

            const source = { uri: 'data:image/jpeg;base64,' + result.base64 };
            // console.warn(source.uri);
            dataFoto2.base64 = source.uri
            miObjeto.attachments[1] = dataFoto2
        }
    }
    const [isImageViewVisible, setisImageViewVisible] = useState(false);
    const [isImageViewVisible2, setisImageViewVisible2] = useState(false);
    const [miOpcionImagen, setMiOpcionImagen] = useState(0);
    const images = [
        {
            source: {
                uri: pickedImagePath
            },
            title: 'Evidencias',
            width: 806,
            height: 720,
        },
    ];
    const images2 = [
        {
            source: {
                uri: pickedImagePath2
            },
            title: 'Evidencias',
            width: 806,
            height: 720,
        },
    ];
    console.log(miObjeto)
    const height = Dimensions.get('window').height;
    const navigation = useNavigation()

    return (
        <>

            {
                botonH ? <TemplateScreen setBotonH={setBotonH} /> : <TemplateScreenNoHeader setBotonH={setBotonH} />
            }

            <View style={[styles.container, botonH ? { marginTop: 2 } : { marginTop: -30 }]}>

                <ScrollView>
                    <View style={{ flex: 1 }}>
                        <ProgressSteps marginBottom={32} borderWidth={3} completedProgressBarColor={'#ED8512'} progressBarColor={'#062D73'} activeStepIconBorderColor={'#062D73'} completedStepIconColor={'#ED8512'}>
                            <ProgressStep scrollable={false} nextBtnText='Siguiente' nextBtnTextStyle={{ color: '#FFFFFF', margin: 5 }} nextBtnStyle={{ backgroundColor: '#01286B', borderRadius: 7 }}>
                                <ScrollView>
                                    <View style={[{ alignItems: 'center', marginBottom: 35 }, styles.shadows]}>
                                        <View style={{ borderBottomWidth: 1, borderColor: '#ED8512', width: '100%' }}>
                                            <Text style={{ textAlign: 'center', color: '#01286B' }}>REGISTRO DE INCIDENTES</Text>
                                        </View>
                                        <VStack width="100%" mx="3" maxW="300px" my="4">
                                            <FormControl>
                                                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                                    <View style={{ width: '55%', marginRight: 5 }}><FormControl.Label _text={{
                                                        bold: true
                                                    }}>Fecha <Pressable onPress={showDatepicker}><Icon as={Ionicons} size={6} name='calendar-outline' /></Pressable></FormControl.Label>

                                                        <Text style={{ backgroundColor: 'rgba(229, 227, 227, 0.9)', textAlign: 'center', borderRadius: 5, padding: 10 }}>{dateS.getDate() + '/' + (dateS.getMonth() + 1) + '/' + dateS.getFullYear()}</Text>

                                                    </View>
                                                    <View style={{ width: '40%', marginLeft: 5 }}><FormControl.Label _text={{
                                                        bold: true
                                                    }}>Hora <Pressable onPress={showTimepicker}><Icon as={Ionicons} size={6} name='time-outline' /></Pressable></FormControl.Label>
                                                        <Text style={{ backgroundColor: 'rgba(229, 227, 227, 0.9)', textAlign: 'center', borderRadius: 5, padding: 10 }}>{dateS.getHours() + ':' + dateS.getMinutes()}</Text>
                                                    </View>


                                                </View>

                                                {show && (
                                                    <DateTimePicker
                                                        testID="dateTimePicker"
                                                        value={dateS}
                                                        mode={mode}
                                                        is24Hour={true}
                                                        onChange={onChange}
                                                    />
                                                )}
                                                <FormControl.ErrorMessage _text={{
                                                    fontSize: 'xs'
                                                }}>
                                                    Error Name
                                                </FormControl.ErrorMessage>


                                                <FormControl.Label _text={{
                                                    bold: true
                                                }}>Superintendente <Pressable onPress={() => setModalBuscarSuperIntendente(true)}><Icon as={Ionicons} size={6} name="search-circle-sharp" /></Pressable> </FormControl.Label>


                                                <Input variant="rounded" defaultValue={miObjeto.superintendent} placeholder="Juan Ramírez Choque" onChangeText={value => setMiObjeto({
                                                    ...miObjeto,
                                                    superintendent: value
                                                })} />
                                                <FormControl.Label _text={{
                                                    bold: true
                                                }}>Supervisor</FormControl.Label>
                                                <Input defaultValue={miObjeto.supervisor} placeholder="Mariana Tapia" onChangeText={value => setMiObjeto({
                                                    ...miObjeto,
                                                    supervisor: value
                                                })} />
                                                <FormControl.Label _text={{
                                                    bold: true
                                                }}>Operarios</FormControl.Label>
                                                <Input defaultValue={miObjeto.operators} placeholder="César Solórzano" onChangeText={value => setMiObjeto({
                                                    ...miObjeto,
                                                    operators: value
                                                })} />
                                            </FormControl>
                                        </VStack>
                                    </View>
                                </ScrollView>
                            </ProgressStep>

                            <ProgressStep nextBtnText='Siguiente' previousBtnText='Anterior' nextBtnTextStyle={{ color: '#FFFFFF', margin: 5 }} nextBtnStyle={{ backgroundColor: '#01286B', borderRadius: 7, marginRight: -30 }} previousBtnTextStyle={{ color: '#FFFFFF', margin: 5 }} previousBtnStyle={{ backgroundColor: '#01286B', borderRadius: 7, marginLeft: -30 }}>
                                <ScrollView>

                                    <View style={[{ alignItems: 'center', marginBottom: 35 }, styles.shadows]}>
                                        <View style={{ borderBottomWidth: 1, borderColor: '#ED8512', width: '100%' }}>
                                            <Text style={{ textAlign: 'center', color: '#01286B' }}>EQUIPO Y TIEMPO DE PARADA</Text>
                                        </View>
                                        <VStack width="100%" mx="3" maxW="300px" my="4">
                                            <FormControl>
                                                <FormControl.Label _text={{
                                                    bold: true
                                                }}>Equipo Afectado <Pressable onPress={() => setModalBuscarEquipos(true)}><Icon as={Ionicons} size={6} name="search-circle-sharp" /></Pressable></FormControl.Label>
                                                <Input editable={false} defaultValue={inputEquipos?.name} placeholder="Molino SAG" onChangeText={value => setMiObjeto({
                                                    ...miObjeto,
                                                    equipment_id: value
                                                })} />

                                                <FormControl.ErrorMessage _text={{
                                                    fontSize: 'xs'
                                                }}>
                                                    Error Name
                                                </FormControl.ErrorMessage>


                                                <FormControl.Label _text={{
                                                    bold: true
                                                }}>Tiempo de Parada</FormControl.Label>

                                                <InputGroup w={{
                                                    base: "70%",
                                                    md: "285"
                                                }}>

                                                    <Input defaultValue={miObjeto.downtime} w={{
                                                        base: "50%",
                                                    }} keyboardType='numeric' placeholder="0.5" onChangeText={value => setMiObjeto({
                                                        ...miObjeto,
                                                        downtime: value
                                                    })} />
                                                    <InputRightAddon children={"hrs"} />
                                                </InputGroup>

                                                <FormControl.Label _text={{
                                                    bold: true
                                                }}>Detalle de parada</FormControl.Label>
                                                <TextArea defaultValue={miObjeto.details} h={20} placeholder="El Molino SAG se detuvo durante desde las 10:30 hrs hasta las 11:00 hrs, debido a ..." w="100%" maxW="300" onChangeText={value => setMiObjeto({
                                                    ...miObjeto,
                                                    details: value
                                                })} />


                                            </FormControl>
                                        </VStack>


                                    </View>
                                </ScrollView>
                            </ProgressStep>
                            <ProgressStep nextBtnText='Siguiente' previousBtnText='Anterior' nextBtnTextStyle={{ color: '#FFFFFF', margin: 5 }} nextBtnStyle={{ backgroundColor: '#01286B', borderRadius: 7, marginRight: -30 }} previousBtnTextStyle={{ color: '#FFFFFF', margin: 5 }} previousBtnStyle={{ backgroundColor: '#01286B', borderRadius: 7, marginLeft: -30 }}>
                                <ScrollView>

                                    <View style={[{ alignItems: 'center', marginBottom: 35 }, styles.shadows]}>
                                        <View style={{ borderBottomWidth: 1, borderColor: '#ED8512', width: '100%' }}>
                                            <Text style={{ textAlign: 'center', color: '#01286B' }}>EVENTO Y CAUSAS ASOCIADAS</Text>
                                        </View>
                                        <VStack width="100%" mx="3" maxW="300px" my="4">
                                            <FormControl>
                                                <FormControl.Label _text={{
                                                    bold: true
                                                }}>Nombre del Evento Ocurrido</FormControl.Label>
                                                <Input defaultValue={miObjeto.event} placeholder="Parada del Molino SAG" onChangeText={value => setMiObjeto({
                                                    ...miObjeto,
                                                    event: value
                                                })} />
                                                <FormControl.ErrorMessage _text={{
                                                    fontSize: 'xs'
                                                }}>
                                                    Error Name
                                                </FormControl.ErrorMessage>
                                                <FormControl.Label _text={{
                                                    bold: true
                                                }}>Descripción del Evento</FormControl.Label>
                                                <TextArea defaultValue={miObjeto.description} h={20} placeholder="A las 10:30 hrs se detuvo el Molino SAG para realizar el mantenimiento correspondiente ..." w="100%" maxW="300" onChangeText={value => setMiObjeto({
                                                    ...miObjeto,
                                                    description: value
                                                })} />
                                                <FormControl.Label _text={{
                                                    bold: true
                                                }}>Causa del Evento</FormControl.Label>
                                                <TextArea defaultValue={miObjeto.attributed_cause} h={20} placeholder="Se realizó el mantenimiento respectivo según ..." w="100%" maxW="300" onChangeText={value => setMiObjeto({
                                                    ...miObjeto,
                                                    attributed_cause: value
                                                })} />

                                            </FormControl>
                                        </VStack>
                                    </View>
                                </ScrollView>
                            </ProgressStep>

                            <ProgressStep nextBtnText='Siguiente' previousBtnText='Anterior' nextBtnTextStyle={{ color: '#FFFFFF', margin: 5 }} nextBtnStyle={{ backgroundColor: '#01286B', borderRadius: 7, marginRight: -30 }} previousBtnTextStyle={{ color: '#FFFFFF', margin: 5 }} previousBtnStyle={{ backgroundColor: '#01286B', borderRadius: 7, marginLeft: -30 }}>
                                <ScrollView>

                                    <View style={[{ alignItems: 'center', marginBottom: 35 }, styles.shadows]}>
                                        <View style={{ borderBottomWidth: 1, borderColor: '#ED8512', width: '100%' }}>
                                            <Text style={{ textAlign: 'center', color: '#01286B' }}>ACCIONES TOMADAS</Text>
                                        </View>
                                        <VStack width="100%" mx="3" maxW="300px" my="4">
                                            <FormControl>
                                                <FormControl.Label _text={{
                                                    bold: true
                                                }}>Acciones realizadas</FormControl.Label>
                                                <TextArea defaultValue={miObjeto.take_actions} h={20} placeholder="1. Revisión de Componentes del Molino ..." w="100%" maxW="300" onChangeText={value => setMiObjeto({
                                                    ...miObjeto,
                                                    take_actions: value
                                                })} />

                                                <FormControl.ErrorMessage _text={{
                                                    fontSize: 'xs'
                                                }}>
                                                    Error Name
                                                </FormControl.ErrorMessage>
                                                <View style={{ borderBottomWidth: 1, borderColor: '#ED8512', width: '100%', marginVertical: 10 }}>
                                                    <Text style={{ textAlign: 'center', color: '#01286B' }}>RESULTADOS OBTENIDOS</Text>
                                                </View>
                                                <FormControl.Label _text={{
                                                    bold: true
                                                }}>Resultados</FormControl.Label>
                                                <TextArea defaultValue={miObjeto.results} h={20} placeholder="La revisión se realizó correctamente, solucionando todos los problemas encontrados." w="100%" maxW="300" onChangeText={value => setMiObjeto({
                                                    ...miObjeto,
                                                    results: value
                                                })} />
                                            </FormControl>
                                        </VStack>
                                    </View>
                                </ScrollView>
                            </ProgressStep>
                            <ProgressStep
                                finishBtnText={!comproboCampo ? "Completar" : "Enviar"}

                                nextBtnText='Siguiente'
                                previousBtnText='Anterior'
                                nextBtnTextStyle={{ color: !comproboCampo ? '#1E1918' : '#FFFFFF', margin: 5 }}
                                nextBtnStyle={{ backgroundColor: !comproboCampo ? '#F75A39' : '#01286B', borderRadius: 7, marginRight: -30 }}
                                previousBtnTextStyle={{ color: '#FFFFFF', margin: 5 }}
                                previousBtnStyle={{ backgroundColor: '#01286B', borderRadius: 7, marginLeft: -30 }}
                                onSubmit={() => !comproboCampo ? comprobarVacio() : navigation.navigate('Resumen', { miObjeto }, setBotonH)}
                            >
                                <View style={[{ marginBottom: 35 }, styles.shadows]}>
                                    <View style={{ borderBottomWidth: 1, borderColor: '#ED8512', width: '100%', marginBottom: 20 }}>
                                        <Text style={{ textAlign: 'center', color: '#01286B' }}>REGISTRO DE INCIDENTES</Text>
                                    </View>
                                    <ScrollView horizontal>
                                        <FormControl style={{ flexDirection: 'row', margin: 10 }}>

                                            <View style={{ marginRight: 20 }}>

                                                <FormControl.Label _text={{
                                                    bold: true
                                                }}>Evidencia N° 1</FormControl.Label>

                                                <View style={{
                                                    shadowColor: "#000",
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: 3,
                                                    },
                                                    shadowOpacity: 0.2,
                                                    shadowRadius: 4.65,
                                                    elevation: 6,
                                                    width: 200,
                                                    height: 200,
                                                    backgroundColor: 'rgba(255,255,255,0.5)',
                                                    borderRadius: 7,
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    {

                                                        <Image

                                                            source={pickedImagePath == '' ? require('../../../assets/logos/Logo_color.png') : ({ uri: pickedImagePath })}
                                                            style={pickedImagePath == '' ? styles.image2 : styles.image}
                                                        />

                                                    }
                                                    <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.5)', width: '90%', justifyContent: 'center', borderRadius: 7 }}>
                                                        <Pressable onPress={showImagePicker} style={{ marginRight: 10 }}>
                                                            <Icon as={Ionicons} size={35} name="image-outline" color={'rgba(0255,255,255,0.8)'} />
                                                        </Pressable>
                                                        {/* <Pressable style={{ marginLeft: 10 }}>
                                                            <Icon as={Ionicons} size={35} name="camera-outline" color={'rgba(0255,255,255,0.8)'} />
                                                        </Pressable> */}
                                                        <Pressable onPress={() => setisImageViewVisible(true)} style={{ marginLeft: 10 }} >
                                                            <Icon as={Ionicons} size={35} name="scan" color={'rgba(0255,255,255,0.8)'} />
                                                        </Pressable>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={{ marginRight: 20 }}>

                                                <FormControl.Label _text={{
                                                    bold: true
                                                }}>Evidencia N° 2</FormControl.Label>

                                                <View style={{
                                                    shadowColor: "#000",
                                                    shadowOffset: {
                                                        width: 0,
                                                        height: 3,
                                                    },
                                                    shadowOpacity: 0.2,
                                                    shadowRadius: 4.65,
                                                    elevation: 6,
                                                    width: 200,
                                                    height: 200,
                                                    backgroundColor: 'rgba(255,255,255,0.5)',
                                                    borderRadius: 7,
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    {

                                                        <Image

                                                            source={pickedImagePath2 == '' ? require('../../../assets/logos/Logo_color.png') : ({ uri: pickedImagePath2 })}
                                                            style={pickedImagePath2 == '' ? styles.image2 : styles.image}
                                                        />

                                                    }
                                                    <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.5)', width: '90%', justifyContent: 'center', borderRadius: 7 }}>
                                                        <Pressable onPress={showImagePicker2} style={{ marginRight: 10 }}>
                                                            <Icon as={Ionicons} size={35} name="image-outline" color={'rgba(0255,255,255,0.8)'} />
                                                        </Pressable>
                                                        {/* <Pressable style={{ marginLeft: 10 }}>
                                                            <Icon as={Ionicons} size={35} name="camera-outline" color={'rgba(0255,255,255,0.8)'} />
                                                        </Pressable> */}
                                                        <Pressable onPress={() => setisImageViewVisible2(true)} style={{ marginLeft: 10 }} >
                                                            <Icon as={Ionicons} size={35} name="scan" color={'rgba(0255,255,255,0.8)'} />
                                                        </Pressable>
                                                    </View>
                                                </View>
                                            </View>


                                        </FormControl>
                                    </ScrollView>
                                </View>
                            </ProgressStep>
                        </ProgressSteps>
                    </View>
                </ScrollView>


            </View>
            <View style={styles.containerFooter}>
                <View style={{ width: 120, height: 120 }}>
                    <Image
                        source={require('../../../assets/backgrounds/Colors.png')} style={{
                            height: '100%',
                            width: '100%',
                            resizeMode: 'cover',

                        }} />
                </View>
            </View>

            {/* {
                botonH ? (<View style={styles.containerFooter}>
                    <Image
                        source={require('../../../assets/backgrounds/Colors.png')} alt="Alternate Text" size="xl" />
    
                </View>) : null
            } */}
            {/* Modal SUPERINTENDENTES */}
            <Modal
                visible={modalBuscarSuperIntendente}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setModalBuscarSuperIntendente(false)}>
                <Card disabled={true} style={{ width: (useWindowDimensions().width) - 50 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, paddingBottom: 7, borderBottomWidth: 1 }}>
                        <Text style={{ textAlign: 'left' }}>Búsqueda Rápida</Text>
                        <Pressable style={{ backgroundColor: '#FC441C', borderRadius: 5, padding: 3 }} onPress={() => setModalBuscarSuperIntendente(false)}>
                            <Icon as={Ionicons} size={5} name="close-outline" style={{ color: 'white' }} />
                        </Pressable>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', maxHeight: (useWindowDimensions().height) - 350 }}>

                        <SearchableDropDown

                            onTextChange={(text) => console.log("")}
                            //On text change listner on the searchable input
                            onItemSelect={(item) => setInputSuperIntendente(item)}
                            //onItemSelect called after the selection from the dropdown
                            containerStyle={{ padding: 5, width: 200 }}
                            //suggestion container style
                            textInputStyle={{
                                //inserted text style
                                padding: 5,

                                borderWidth: 1,
                                borderColor: '#ccc',
                                backgroundColor: '#FAF7F6',
                            }}
                            itemStyle={{
                                //single dropdown item style
                                padding: 10,

                                marginTop: 2,
                                backgroundColor: '#FAF9F8',
                                borderColor: '#bbb',
                                borderWidth: 1,
                            }}
                            itemTextStyle={{
                                //text style of a single dropdown item
                                color: '#222',
                            }}
                            itemsContainerStyle={{
                                //items container style you can pass maxHeight
                                //to restrict the items dropdown hieght
                                maxHeight: '90%',
                            }}
                            items={miArraySuperIntendentes}
                            //mapping of item array
                            defaultIndex={0}
                            //default selected item index
                            placeholder="Búsqueda"
                            //place holder for the search input
                            resetValue={false}
                            //reset textInput Value with true and false state
                            underlineColorAndroid="transparent"
                        //To remove the underline from the android input
                        />

                    </View>
                    <View style={{ marginTop: 20, marginBottom: 10 }}>
                        <Text style={{ textAlign: 'left', borderTopWidth: 1, paddingTop: 5, fontWeight: 'bold' }}>Nombre de Superintendente</Text>
                        <Text style={{ textAlign: 'left', marginLeft: 5, marginTop: 5 }}>{inputSuperIntendente?.name}</Text>
                    </View>
                    <Button style={{ backgroundColor: '#062D73', borderRadius: 5 }}
                        onPress={() => {
                            setModalBuscarSuperIntendente(false)
                            setMiValorModalSuperIntendente(inputSuperIntendente?.name)
                            miObjeto.superintendent = inputSuperIntendente?.name
                        }}
                        accessoryRight={<Icon as={Ionicons} size={5} name='search' color={'white'} />}>
                        Registrar campo
                    </Button>
                </Card>
            </Modal>
            {/* Modal EQUIPOS */}
            <Modal
                visible={modalBuscarEquipos}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setModalBuscarEquipos(false)}>
                <Card disabled={true} style={{ width: (useWindowDimensions().width) - 50 }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, paddingBottom: 7, borderBottomWidth: 1 }}>
                        <Text style={{ textAlign: 'left' }}>Búsqueda Rápida</Text>
                        <Pressable style={{ backgroundColor: '#FC441C', borderRadius: 5, padding: 3 }} onPress={() => setModalBuscarEquipos(false)}>
                            <Icon as={Ionicons} size={5} name="close-outline" style={{ color: 'white' }} />
                        </Pressable>
                    </View>

                    <View style={{ justifyContent: "center", alignItems: 'center', maxHeight: (useWindowDimensions().height) - 400, marginTop: -15, marginBottom: -15 }}>

                        <SearchableDropDown

                            onTextChange={(text) => console.log("")}
                            //On text change listner on the searchable input
                            onItemSelect={(item) => setInputEquipos(item)}
                            //onItemSelect called after the selection from the dropdown
                            containerStyle={{ padding: 5, width: "100%" }}
                            //suggestion container style
                            textInputStyle={{
                                //inserted text style
                                padding: 5,

                                borderWidth: 1,
                                borderColor: '#ccc',
                                backgroundColor: '#FAF7F6',
                            }}
                            itemStyle={{
                                //single dropdown item style
                                padding: 10,

                                marginTop: 2,
                                backgroundColor: '#FAF9F8',
                                borderColor: '#bbb',
                                borderWidth: 1,
                            }}
                            itemTextStyle={{
                                //text style of a single dropdown item
                                color: '#222',
                            }}
                            itemsContainerStyle={{
                                //items container style you can pass maxHeight
                                //to restrict the items dropdown hieght
                                maxHeight: '80%',

                            }}
                            items={equipos}
                            //mapping of item array
                            defaultIndex={0}
                            //default selected item index
                            placeholder="Búsqueda"
                            //place holder for the search input
                            resetValue={false}
                            //reset textInput Value with true and false state
                            underlineColorAndroid="transparent"
                        //To remove the underline from the android input
                        />


                    </View>
                    <View style={{ marginTop: 20, marginBottom: 10 }}>
                        <Text style={{ textAlign: 'left', borderTopWidth: 1, paddingTop: 5, fontWeight: 'bold' }}>Nombre de Equipo</Text>
                        <Text style={{ textAlign: 'left', marginLeft: 5, marginTop: 5 }}>{inputEquipos?.name}</Text>
                    </View>
                    <Button style={{ backgroundColor: '#062D73', borderRadius: 5 }}
                        onPress={() => {
                            setModalBuscarEquipos(false)
                            setMiValorModalEquipos(inputEquipos?.name)
                            miObjeto.equipment_id = inputEquipos?.id
                        }}
                        accessoryRight={<Icon as={Ionicons} size={5} name='search' color={'white'} />}>
                        Registrar campo
                    </Button>
                </Card>
            </Modal>
            <ImageView
                isSwipeCloseEnabled={true}
                onClose={() => setisImageViewVisible(false)}
                images={images}
                imageIndex={0}
                isPinchZoomEnabled={true}
                isVisible={isImageViewVisible}

            />
            <ImageView
                isSwipeCloseEnabled={true}
                onClose={() => setisImageViewVisible2(false)}
                images={images2}
                imageIndex={0}
                isPinchZoomEnabled={true}
                isVisible={isImageViewVisible2}

            />
        </>
    )
}

export default AddReporte

const styles = StyleSheet.create({
    containerFooter: {

        position: 'absolute',
        zIndex: -1,
        width: 150,
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',

    },
    container: {
        flex: 1,
        marginHorizontal: 20,


    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    image: {
        width: '95%',
        height: '97%',
        resizeMode: 'cover',
        position: 'absolute'
    },
    image2: {
        width: '92%',
        height: '97%',
        resizeMode: 'contain',
        position: 'absolute'
    }
})