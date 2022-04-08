import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator, Image } from "react-native";
import {
    NativeBaseProvider,
    Box, Text,
    Pressable,
    Heading,
    IconButton,
    Icon, HStack,
    Avatar, VStack,
    Spacer, Center,
    useToast,
    Divider,
    Select,
    Input,
    Modal,
    FormControl,
    Button,

} from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";

import TemplateScreen from '../../Template/TemplateScreen'
import { getSearch, getTroubleShooting, deleteTroubleshootingById } from '../services/misServicios'
import { useNavigation } from '@react-navigation/native'
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';
import TemplateScreenNoHeader from '../../Template/TemplateScreenNoHeader';
//import { Button, Card, Modal } from '@ui-kitten/components';


const ListReportes = (props) => {

    const toast = useToast();
    //LOADING
    const [cargando, setCargando] = useState(true)

    const [listData, setListData] = useState([]);
    const traerTroubles = () => {
        setTextoBuscar('')
        setCargando(true)
        getTroubleShooting().then(rpta => {
            setListData(rpta.data.data)
            setCargando(false)
        })
    }


    useEffect(() => {
        traerTroubles()
        traerBusqueda()
    }, [])

    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [search, setSearch] = useState('');
    let [service, setService] = React.useState("");

    const traerBusqueda = () => {
        setCargando(true)
        getSearch(selectOption, textoBuscar).then(rpta => {
            //getSearch( service, search).then(rpta => {
            console.log('search')
            setListData(rpta.data.data)
            setCargando(false)


            // console.log("searrch" + rpta.data.data)
        })
    }
    const navigation = useNavigation();

    //ELIMINAR

    const [IdEliminar, setIdEliminar] = useState()
    //console.log(IdEliminar)
    const eliminarTroubleshooting = () => {

        deleteTroubleshootingById(IdEliminar).then((rpta) => {
            if (rpta.status === 200) {
                //Se comprueba que se eliminó correctamente
                setShow(false)
                traerTroubles() //Se llama otra vez para setear la variable de estado y recargar la página automáticamente al borrar un usuario
                toast.show({
                    title: "Eliminación exitosa",
                    status: "success",
                    description: "Se ha eliminado correctamente el Troubleshooting"
                })
            }
            else {
                toast.show({
                    title: "Error",
                    status: "error",
                    description: "Ocurrió un error, intente nuevamente"
                })
            }
        })
    }



    //SWIPELIST

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };


    const onRowDidOpen = rowKey => {
        // console.log("This row opened", rowKey);
    };

    //ALERTA
    const [show, setShow] = useState(false)
    //


    const renderItem = ({
        item,
        index
    }) =>

        <Box>
            <Pressable
                onPress={() =>
                    toast.show({
                        title: "Aviso",
                        status: "information",
                        description: "Deslice a la izquierda para más acciones"
                    })} _dark={{
                        bg: "coolGray.800"
                    }} _light={{
                        bg: "white"
                    }}>
                <Box pl="4" pr="5" py="2" style={[styles.shadows, { backgroundColor: 'rgba(192, 190, 190, 0.26)' }]}>
                    <HStack alignItems="center" space={3}>
                        <Avatar size="48px" source={{
                            uri: item?.equipment == null ? 'https://yosirvoblog.files.wordpress.com/2016/05/fir-reporte-de-incidentes-de-edificios.png' : item.equipment?.cover
                        }} />
                        <VStack width="85%">
                            <Text color="coolGray.800" _dark={{
                                color: "warmGray.50"
                            }} bold>
                                {(item.event).slice(0, 25) + " ..."}
                            </Text>
                            <Text color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }}>
                                {item.superintendent}
                            </Text><Text color="coolGray.600" _dark={{
                                color: "warmGray.200"
                            }}>
                                {(new Date(item.date)).toLocaleDateString()}
                                {"\t"}
                                {(new Date(item.date)).toLocaleTimeString()}
                            </Text>
                        </VStack>
                        <Spacer />
                        <Text fontSize="xs" color="coolGray.800" _dark={{
                            color: "warmGray.50"
                        }} alignSelf="flex-start">
                            {item.timeStamp}
                        </Text>
                    </HStack>
                </Box>
                <Divider />
            </Pressable>
        </Box>





    const renderHiddenItem = (data, rowMap) => <HStack flex="1" pl="2">
        <Pressable w="70" ml="auto" bg="coolGray.200"
            justifyContent="center"
            onPress={() =>
                navigation.navigate('Detalle',
                    {
                        id: data.item.id
                        // ,traerTroubles
                    })
            }

            _pressed={{
                opacity: 0.5
            }}>
            <VStack alignItems="center" space={2}>
                <Icon as={<Entypo name="eye" />} size="xs" color="coolGray.800" />
                <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
                    Más
                </Text>
            </VStack>
        </Pressable>
        <Pressable w="70" bg="red.500"
            justifyContent="center"
            onPress={() => {
                setIdEliminar(data.item.id)
                setShow(true)
            }}

            _pressed={{
                opacity: 0.5
            }}>
            <VStack alignItems="center" space={2}>
                <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
                <Text color="white" fontSize="xs" fontWeight="medium">
                    Eliminar
                </Text>
            </VStack>
        </Pressable>
    </HStack>

    const [modalBuscar, setModalBuscar] = useState(false)
    const [selectOption, setSelectOption] = useState(0)
    const [textoBuscar, setTextoBuscar] = useState('')
    const handleChange = text => setTextoBuscar(text);


    const [botonH, setBotonH] = useState(true);

    return (

        <>
            {
                botonH ? <TemplateScreen setBotonH={setBotonH} /> : <TemplateScreenNoHeader setBotonH={setBotonH} />
            }

            <View style={styles.container}>
                {/* <Text>{filteredDataSource[0]?.event}</Text> */}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{
                        color: "rgba(1,40,107,1)",
                        // fontFamily: "roboto-700",
                        fontSize: 18,
                        marginBottom: 7

                    }}>Lista de Reportes</Text>
                    {
                        textoBuscar !== '' ?
                            <Pressable onPress={() => { traerTroubles() }}>
                                <Icon as={Ionicons} size={5} name='close-outline' color={'rgba(1,40,107,1)'} />
                            </Pressable>
                            :
                            <Pressable onPress={() => { setModalBuscar(true) }}>
                                <Icon as={Ionicons} size={5} name='search' color={'rgba(1,40,107,1)'} />
                            </Pressable>
                    }

                </View>
                {cargando ?

                    <View style={{ alignSelf: 'center' }}>
                        <ActivityIndicator size="large" color="#01286B" />
                    </View>
                    :
                    <SwipeListView

                        //
                        data={listData}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        rightOpenValue={-130} previewRowKey={"0"}
                        previewOpenValue={-40}
                        showsVerticalScrollIndicator={false}
                        previewOpenDelay={3000}
                        onRowDidOpen={onRowDidOpen} />
                }

            </View>
            
            {/* IMAGE FOOTER */}
            {/* <View style={styles.containerFooter}>
                <View style={{ width: 120, height: 120 }}>
                    <Image
                        source={require('../../../assets/backgrounds/Colors.png')} style={{
                            height: '100%',
                            width: '100%',
                            resizeMode: 'cover',

                        }} />
                </View>
            </View> */}

            <SCLAlert
                show={show}
                onRequestClose={() => setShow(false)}
                theme="danger"
                title="Aviso"
                subtitle="Está seguro que desea eliminar este reporte?"
                headerIconComponent={<Ionicons name="trash-outline" size={32} color="white" />}
            >
                <SCLAlertButton theme="info" onPress={() => {

                    eliminarTroubleshooting()
                }}>Aceptar</SCLAlertButton>
                <SCLAlertButton theme="info" onPress={() => {
                    setShow(false);
                }}>Cancelar</SCLAlertButton>
            </SCLAlert>

            <Modal isOpen={modalBuscar} onClose={() => setModalBuscar(false)}>
                <Modal.Content maxWidth="400px">

                    <Modal.Header>
                        <Text style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 16 }}>
                            Búsqueda Personalizada
                        </Text></Modal.Header>
                    <Modal.Body>
                        <FormControl>
                            <FormControl.Label><Text style={{ textAlign: 'left', fontWeight: 'bold' }}>
                                Tipo
                            </Text></FormControl.Label>
                            <Select
                                selectedValue={selectOption}
                                w="75%"
                                accessibilityLabel="Seleccione una opción"
                                placeholder="Selecciones un tipo"
                                _selectedItem={{

                                    endIcon: <Ionicons name="checkmark-circle-outline" size={32} color="#062D73" />
                                }} mt={1} onValueChange={itemValue => setSelectOption(itemValue)}>
                                <Select.Item label="Evento" value="1" />
                                <Select.Item label="Causa" value="2" />
                                <Select.Item label="Equipo" value="3" />
                            </Select>
                        </FormControl>
                        <FormControl mt="3">
                            <FormControl.Label><Text style={{ textAlign: 'left', fontWeight: 'bold' }}>
                                Cadena de Búsqueda
                            </Text></FormControl.Label>
                            <Input
                                value={textoBuscar}

                                maxW="300px"
                                onChangeText={handleChange}
                                placeholder="Liner" />
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                                setModalBuscar(false)
                                //setTextoBuscar('')
                            }}>
                                Cerrar
                            </Button>
                            <Button
                                style={{ backgroundColor: '#062D73' }}
                                onPress={() => {
                                    traerBusqueda(),
                                        setModalBuscar(false)
                                }}>
                                Buscar
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>

            {/* <Modal
                visible={modalBuscar}
                backdropStyle={styles.backdrop}
                onBackdropPress={() => setModalBuscar(false)}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Card disabled={true} style={{ width: '70%' }}>
                        <Text>Welcome to UI Kitten 😻</Text>
                        <Select selectedValue={selectOption} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <Ionicons name="checkmark-circle-outline" size={32} color="black" />
                        }} mt={1} onValueChange={itemValue => setSelectOption(itemValue)}>
                            <Select.Item label="Evento" value="1" />
                            <Select.Item label="Causa" value="2" />
                            <Select.Item label="Equipo" value="3" />
                        </Select>
                        <Input value={textoBuscar} w="75%" maxW="300px" onChangeText={handleChange} placeholder="Value Controlled Input" />
                        <Button onPress={() => { traerBusqueda(), setModalBuscar(false) }}>
                            Buscar
                        </Button>
                    </Card>
                </View>
            </Modal> */}
        </>
    )
}


export default ListReportes

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        height: '80%',
        marginHorizontal: 20,
        marginTop: 20
    },
    shadows: {

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    shadows: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0.2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 0.84,

        elevation: 0.3,
    },
    containerFooter: {

        position: 'absolute',
        zIndex: -1,
        width: 150,
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',

    },
})
