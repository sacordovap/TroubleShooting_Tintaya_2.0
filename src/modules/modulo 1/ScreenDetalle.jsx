import { StyleSheet, Text, View, useWindowDimensions, Image, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import TemplateScreen from '../../Template/TemplateScreen'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { FormControl, Input, VStack, Pressable, TextArea, FlatList, HStack, Skeleton, InputGroup, InputRightAddon, useToast } from 'native-base';
import TemplateScreenNoHeader from '../../Template/TemplateScreenNoHeader';
import { Ionicons } from '@expo/vector-icons';
import { getEquiment, getEquimentById, getTroubleShootingById, putTroubleshootingUpdate } from '../services/misServicios';
import SearchableDropDown from 'react-native-searchable-dropdown';
import { Card, Modal, Button } from '@ui-kitten/components';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import ImageView from 'react-native-image-view';
import { useNavigation } from '@react-navigation/native';

//import { FAB, Portal, Provider } from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { SCLAlert, SCLAlertButton } from 'react-native-scl-alert';


const ScreenDetalle = (props) => {

  const [estadoEdicion, setEstadoEdicion] = useState(true)

  // FAB
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const [skeletonLoader, setSkeletonLoader] = useState(false)

  const toast = useToast();
  useEffect(() => {
    setTimeout(() => {
      setSkeletonLoader(true);
    }, 2500);
  })


  //OBTERNER DATA POR ID
  const [formData, setData] = useState();
  const getDataByID = () => {

    const idUrl = props.route.params.id;
    getTroubleShootingById(idUrl).then(rpta => {

      setData(rpta.data.data)
      buscarEquipoId(rpta.data.data.equipment_id)
    })
  }



 
  //GUARDAR CAMBIOS
  const handleSubmit = () => {

    putTroubleshootingUpdate(formData, props.route.params.id).then((rpta) => {

      if (rpta.status === 200) {

        navigation.replace('List')
        toast.show({
          title: "Registro Exitoso",
          status: "success",
          placement: "top",
          description: "Se guardaron los cambios correctamente"
        })
      } else {
        toast.show({
          title: "Error",
          status: "error",
          description: "Ocurrió un error intente nuevamente"
        })

      }
    }).catch(err => {
      toast.show({
        title: "Error",
        status: "error",
        description: "Ocurrió un error intente nuevamente"
      })
    })
  }

  const [cargando, setCargando] = useState(false)

  const [botonH, setBotonH] = useState(false);
  // title
  var titleEvent = formData?.event
  //Fecha
  var fechaDetalle = new Date(formData?.date)

  const fecha = fechaDetalle.getDate() + '/' + (fechaDetalle.getMonth() + 1) + '/' + fechaDetalle.getFullYear()
  const hora = fechaDetalle.getHours() + ':' + fechaDetalle.getMinutes()


  const [visible, setVisible] = useState(false);


  //Alerta
  const [show, setShow] = useState(false)
  //Servicio Alerta
  const handleOpen = () => {
    setShow(true)
  }
  const handleClose = () => {
    setShow(false)
  }

  //EQUIPO POR ID
  const [miEquipo, setMiEquipo] = useState('')
  const buscarEquipoId = (id) => {
    getEquimentById(id).then((rpta) => {
      if (rpta.status === 200) {

        setMiEquipo(rpta.data.data.name)

      }

    })
  }
  const handleChangeText = (nombre, value) => {
    setData({ ...formData, [nombre]: value })
  };
  useEffect(() => {
    getDataByID()

  }, [])

  useEffect(() => {
  })

  //Modal por Equipos
  const [modalBuscarEquipos, setModalBuscarEquipos] = useState(false)
  const [inputBuscarEquipos, setInputBuscarEquipos] = useState('')

  const navigation = useNavigation()

  const [misEquipos, setMisEquipos] = useState([])
  const [miValorModalEquipos, setMiValorModalEquipos] = useState('')
  const traerEquipos = () => {

    getEquiment().then(rpta => {
      setMisEquipos(rpta.data.data)
    })
  }

  // DATEPICKER CONSTS
  const [dateS, setDateS] = useState(new Date());

  const [mode, setMode] = useState('date');
  const [apretoBotonFecha, setApretoBotonFecha] = useState(false);
  const [apretoBotonTime, setApretoBotonTime] = useState(false);
  const [showD, setShowD] = useState(false);
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    console.log(currentDate)
    
    setShowD(false);
    setDateS(currentDate);
  };



  const showMode = (currentMode) => {
    setShowD(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    setApretoBotonFecha(true)

    showMode('date');
  };

  const showTimepicker = () => {
    setApretoBotonTime(true)

    showMode('time');
  };


  useEffect(() => {
    traerEquipos()
  }, [])
  return (

    <>

      {
        botonH ? <TemplateScreen setBotonH={setBotonH} /> : <TemplateScreenNoHeader setBotonH={setBotonH} />
      }


      <View style={[styles.container]}>

        <ScrollView style={{ marginBottom: 75 }} >
          <View style={[{ alignItems: 'center', marginBottom: 35 }, styles.shadows]}>
            <View style={{ borderBottomWidth: 1, borderColor: '#ED8512', width: '100%' }}>
              <Skeleton.Text px="4" lines={2} alignItems="center" isLoaded={skeletonLoader}>
                <Text style={{ textAlign: 'center', color: '#01286B', fontSize: 18 }}>{titleEvent?.toUpperCase()}</Text>
              </Skeleton.Text>
            </View>


            <VStack width="100%" mx="3" maxW="300px" my="4">
              <FormControl>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <View style={{ width: '55%', marginRight: 5 }}><FormControl.Label _text={{
                    bold: true
                  }}>Fecha {!estadoEdicion ? <Pressable style={{marginLeft:5}} onPress={showDatepicker}><Icon as={Ionicons} size={24} name='calendar-outline' /></Pressable> : null} </FormControl.Label>
                    {showD && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={dateS}
                        mode={mode}
                        is24Hour={true}
                        onChange={onChange}
                      />
                    )}
                    <Skeleton.Text px="4" lines={2} isLoaded={skeletonLoader}>
                      <Text style={{ backgroundColor: 'rgba(229, 227, 227, 0.9)', textAlign: 'center', borderRadius: 5, padding: 10 }}>{apretoBotonFecha ? (dateS.getDate() + '/' + (dateS.getMonth() + 1) + '/' + dateS.getFullYear()) : fecha}</Text>
                    </Skeleton.Text>

                  </View>
                  <View style={{ width: '40%', marginLeft: 5}}><FormControl.Label _text={{
                    bold: true
                  }}>Hora{!estadoEdicion ? <Pressable style={{marginLeft:5}} onPress={showTimepicker}><Icon as={Ionicons} size={24} name='time-outline' /></Pressable> : null} </FormControl.Label>
                    <Skeleton.Text px="4" lines={2} isLoaded={skeletonLoader}>
                      <Text style={{ backgroundColor: 'rgba(229, 227, 227, 0.9)', textAlign: 'center', borderRadius: 5, padding: 10 }}>{apretoBotonTime ? (dateS.getHours() + ':' + dateS.getMinutes()) : hora}</Text>
                    </Skeleton.Text>
                  </View>


                </View>


                <FormControl.ErrorMessage _text={{
                  fontSize: 'xs'
                }}>
                  Error Name
                </FormControl.ErrorMessage>


                <FormControl.Label _text={{
                  bold: true
                }}>Superintendente</FormControl.Label>
                <Skeleton.Text px="4" lines={2} isLoaded={skeletonLoader}>
                  <Input defaultValue={formData?.superintendent} placeholder=""
                    isDisabled={estadoEdicion}
                    onChangeText={(value) => handleChangeText('superintendent', value)} />
                </Skeleton.Text>

                <FormControl.Label _text={{
                  bold: true
                }}>Supervisor</FormControl.Label>
                <Skeleton.Text px="4" lines={2} isLoaded={skeletonLoader}>
                  <Input defaultValue={formData?.supervisor} placeholder=""
                    isDisabled={estadoEdicion}
                    onChangeText={(value) => handleChangeText('supervisor', value)} />
                </Skeleton.Text>
                <FormControl.Label _text={{
                  bold: true
                }}>Operarios</FormControl.Label>
                <Skeleton.Text px="4" isLoaded={skeletonLoader}>

                  <Input defaultValue={formData?.operators} placeholder=""
                    isDisabled={estadoEdicion}
                    onChangeText={(value) => handleChangeText('operators', value)} />
                </Skeleton.Text>

                <FormControl.Label _text={{
                  bold: true
                }} my={2}>Equipo Afectado

                  {!estadoEdicion ? (<Pressable onPress={() => setModalBuscarEquipos(true)}><Icon as={Ionicons} size={18} name="search-circle-sharp" /></Pressable>) : (null)}

                </FormControl.Label>
                <Skeleton.Text px="4" lines={2} isLoaded={skeletonLoader}>

                  {/* <Input defaultValue={estadoEdicion ?miEquipo: miValorModalEquipos } placeholder="" */}
                  <Input defaultValue={miEquipo } placeholder=""
                    // isDisabled={estadoEdicion}
                    isDisabled={true}
                  //Aqui falta un modal para cambiar de equipo.
                  />
                </Skeleton.Text>

                <FormControl.ErrorMessage _text={{
                  fontSize: 'xs'
                }}>
                  Error Name
                </FormControl.ErrorMessage>


                <FormControl.Label _text={{
                  bold: true
                }}>Tiempo de Parada</FormControl.Label>
                <Skeleton.Text px="4" lines={2} w="40" isLoaded={skeletonLoader}>

                  <InputGroup w={{
                    base: "70%",
                    md: "285"
                  }}>
                    <Input w={{
                      base: "50%",
                    }}
                      defaultValue={formData?.downtime + ""}
                      keyboardType='numeric'
                      placeholder="0.5"
                      isDisabled={estadoEdicion}
                      onChangeText={(value) => handleChangeText('downtime', value)} />

                    <InputRightAddon children={"hrs"} />
                  </InputGroup>


                </Skeleton.Text>

                <FormControl.Label _text={{
                  bold: true
                }}>Detalle de parada</FormControl.Label>
                <Skeleton.Text px="4" isLoaded={skeletonLoader}>

                  <TextArea defaultValue={formData?.details} h={20}
                    onChangeText={(value) => handleChangeText('details', value)}
                    isDisabled={estadoEdicion}
                    placeholder="Text Area Placeholder" w="100%" maxW="300" />
                </Skeleton.Text>

                <FormControl.Label _text={{
                  bold: true
                }}>Evento Ocurrido</FormControl.Label>
                <Skeleton.Text px="4" isLoaded={skeletonLoader}>

                  <Input defaultValue={formData?.event} placeholder=""
                    isDisabled={estadoEdicion}
                    onChangeText={(value) => handleChangeText('event', value)} />
                </Skeleton.Text>
                <FormControl.ErrorMessage _text={{
                  fontSize: 'xs'
                }}>
                  Error Name
                </FormControl.ErrorMessage>
                <FormControl.Label _text={{
                  bold: true
                }}>Descripción del Evento</FormControl.Label>
                <Skeleton.Text px="4" isLoaded={skeletonLoader}>
                  <TextArea defaultValue={formData?.description + ""} h={20}
                    isDisabled={estadoEdicion}
                    placeholder="Text Area Placeholder" w="100%" maxW="300"
                    onChangeText={(value) => handleChangeText('description', value)}
                  />
                </Skeleton.Text>
                <FormControl.Label _text={{
                  bold: true
                }}>Causas</FormControl.Label>
                <Skeleton.Text px="4" isLoaded={skeletonLoader}>

                  <TextArea defaultValue={formData?.attributed_cause} placeholder=""
                    isDisabled={estadoEdicion}
                    onChangeText={(value) => handleChangeText('attributed_cause', value)} />
                </Skeleton.Text>

                <FormControl.Label _text={{
                  bold: true
                }}>Acciones realizadas</FormControl.Label>
                <Skeleton.Text px="4" isLoaded={skeletonLoader}>

                  <TextArea defaultValue={formData?.take_actions}
                    onChangeText={(value) => handleChangeText('take_actions', value)}
                    h={20} isDisabled={estadoEdicion} placeholder="Text Area Placeholder"
                    multiline={true}
                    w="100%" maxW="300" />
                </Skeleton.Text>

                <FormControl.ErrorMessage _text={{
                  fontSize: 'xs'
                }}>
                  Error Name
                </FormControl.ErrorMessage>

                <FormControl.Label _text={{
                  bold: true
                }}>Resultados</FormControl.Label>
                <Skeleton.Text px="4" isLoaded={skeletonLoader}>

                  <TextArea defaultValue={formData?.results} h={20}
                    onChangeText={(value) => handleChangeText('results', value)}
                    isDisabled={estadoEdicion}
                    placeholder="Text Area Placeholder" w="100%" maxW="300" />
                </Skeleton.Text>


                {/* imagenes para editar */}
                <View style={[{ marginBottom: 35 }, styles.shadows]}>
                  <ScrollView horizontal>
                    <View style={{ flexDirection: 'row', margin: 10 }}>
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
                          <Skeleton h="100%" isLoaded={skeletonLoader}>
                            <Image
                              source={{ uri: formData?.attachments[0].url }}
                              style={styles.image} />
                            {
                              !estadoEdicion ? (
                                <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.5)', width: '90%', justifyContent: 'center', borderRadius: 7 }}>
                                  <Pressable onPress={() => console.log('img1')} style={{ marginRight: 10 }}>
                                    <Icon as={Ionicons} size={35} name="image-outline" color={'rgba(0255,255,255,0.8)'} />
                                  </Pressable>
                                  {/* <Pressable style={{ marginLeft: 10 }}>
                                                            <Icon as={Ionicons} size={35} name="camera-outline" color={'rgba(0255,255,255,0.8)'} />
                                                        </Pressable> */}
                                  <Pressable onPress={() => console.log('img1Setvisible')} style={{ marginLeft: 10 }} >
                                    <Icon as={Ionicons} size={35} name="scan" color={'rgba(0255,255,255,0.8)'} />
                                  </Pressable>
                                </View>
                              ) : (null)
                            }
                          </Skeleton>
                          {/* <View style={{ flexDirection: 'row' }}>
                          <Pressable style={{ marginRight: 10 }}>
                            <Icon as={Ionicons} size={45} name="image-outline" />
                          </Pressable>
                          <Pressable style={{ marginLeft: 10 }}>
                            <Icon as={Ionicons} size={45} name="camera-outline" />
                          </Pressable>
                        </View> */}
                        </View>
                      </View>
                      <View style={{ marginLeft: 20 }}>
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
                          <Skeleton h="100%" isLoaded={skeletonLoader}>
                            <Image
                              source={{ uri: formData?.attachments[1].url }}
                              style={styles.image} />
                            {
                              !estadoEdicion ? (
                                <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.5)', width: '90%', justifyContent: 'center', borderRadius: 7 }}>
                                  <Pressable onPress={() => console.log('img2')} style={{ marginRight: 10 }}>
                                    <Icon as={Ionicons} size={35} name="image-outline" color={'rgba(0255,255,255,0.8)'} />
                                  </Pressable>
                                  {/* <Pressable style={{ marginLeft: 10 }}>
                                                            <Icon as={Ionicons} size={35} name="camera-outline" color={'rgba(0255,255,255,0.8)'} />
                                                        </Pressable> */}
                                  <Pressable onPress={() => console.log('img2Setvisible')} style={{ marginLeft: 10 }} >
                                    <Icon as={Ionicons} size={35} name="scan" color={'rgba(0255,255,255,0.8)'} />
                                  </Pressable>
                                </View>
                              ) : (null)
                            }
                          </Skeleton>
                          {/* <View style={{ flexDirection: 'row' }}>
                          <Pressable style={{ marginRight: 10 }}>
                            <Icon as={Ionicons} size={45} name="image-outline" />
                          </Pressable>
                          <Pressable style={{ marginLeft: 10 }}>
                            <Icon as={Ionicons} size={45} name="camera-outline" />
                          </Pressable>
                        </View> */}
                        </View>
                      </View>
                    </View>
                  </ScrollView>
                </View>
              </FormControl>
            </VStack>



          </View>

        </ScrollView>

      </View>
      <ActionButton buttonColor="#01286B">
        <ActionButton.Item buttonColor='#fc6464' title="Salir" onPress={() =>
          {toast.show({
            status: "error", title: "Se canceló la operación"
          }),
        navigation.goBack()}
        }

        >
          <Icon name="md-close-circle" style={styles.actionButtonIcon} />
        </ActionButton.Item>

        {
          estadoEdicion ?
            <ActionButton.Item buttonColor='#3498db' title="Editar Registro"
              onPress={() => {
                setEstadoEdicion(false);
                toast.show({
                  status: "info",
                  title: "Modo Edición"
                })
              }} _dark={{
                bg: "coolGray.800"
              }} _light={{
                bg: "white"
              }}>
              <Icon name="md-pencil" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            :
            <ActionButton.Item buttonColor='#3498db' title="Editando" onPress={() => toast.show({
              status: "warning", title: "Ya estas en modo Edición"
            })} _dark={{
              bg: "coolGray.800"
            }} _light={{
              bg: "white"
            }}>
              <Icon name="md-pencil" style={styles.actionButtonIcon} />
            </ActionButton.Item>
        }

        {
          estadoEdicion ?
            (<></>)
            :
            <ActionButton.Item buttonColor='#1abc9c' title="Guardar Cambios" onPress={() => { handleSubmit() }}>
              <Icon name="md-save" style={styles.actionButtonIcon} />
            </ActionButton.Item>
        }


      </ActionButton>

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

      <SCLAlert
        show={show}
        onRequestClose={() => { handleClose() }}
        theme="success"
        title="Aviso"
        subtitle="Reporte generado con éxito"
        headerIconComponent={<Ionicons name="ios-thumbs-up" size={32} color="white" />}
      >
        <SCLAlertButton theme="info" onPress={() => {

          setShow(false);
          navigation.navigate('Home')

        }}>Continuar</SCLAlertButton>
      </SCLAlert>
      <Modal
        visible={modalBuscarEquipos}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setModalBuscarEquipos(false)}>
        <Card disabled={true} style={{ width: (useWindowDimensions().width) - 50 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, paddingBottom: 7, borderBottomWidth: 1 }}>
            <Text style={{ textAlign: 'left' }}>Búsqueda Rápida</Text>
            <Pressable style={{ backgroundColor: '#FC441C', borderRadius: 5, padding: 3 }} onPress={() => setModalBuscarEquipos(false)}>
              <Icon as={Ionicons} size={18} name="close-outline" style={{ color: 'white' }} />
            </Pressable>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center', maxHeight: (useWindowDimensions().height) - 350 }}>

            <SearchableDropDown

              onTextChange={(text) => console.log("")}
              //On text change listner on the searchable input
              onItemSelect={(item) => setInputBuscarEquipos(item)}
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
              items={misEquipos}
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
            <Text style={{ textAlign: 'left', borderTopWidth: 1, paddingTop: 5, fontWeight: 'bold' }}>Nombre del Equipo</Text>
            <Text style={{ textAlign: 'left', marginLeft: 5, marginTop: 5 }}>{inputBuscarEquipos?.name}</Text>
          </View>
          <Button style={{ backgroundColor: '#062D73', borderRadius: 5 }}
            onPress={() => {
              setModalBuscarEquipos(false)
              setMiValorModalEquipos(inputBuscarEquipos?.name)
              setMiEquipo(inputBuscarEquipos?.name)
              formData.equipment_id = inputBuscarEquipos?.id
            }}
            accessoryRight={<Icon as={Ionicons} size={18} name='search' color={'white'} />}>
            Registrar campo
          </Button>
        </Card>
      </Modal>
    </>
  )
}

export default ScreenDetalle

const styles = StyleSheet.create({
  containerFooter: {

    flex: 1,
    zIndex: -1,
    flexDirection: "column-reverse",
    alignItems: "flex-start",
  },
  container: {

    marginBottom: 20,
    marginHorizontal: 20,



  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  containerFooter: {

    position: 'absolute',
    zIndex: -1,
    width: 150,
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',

  },
  image: {
    width: '95%',
    height: '97%',
    resizeMode: 'cover',
    position: 'absolute'
  },
})