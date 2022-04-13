import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Icon, Image, Menu, Pressable, HamburgerIcon, Box } from 'native-base';

const TemplateScreenNoHeader = (props) => {

    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

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
    return (

        <>
            <Animated.View                 // Special animatable View
                style={{
                   
                    flexDirection: "column",
                    
                    opacity: fadeAnim,
                    useNativeDriver: true         // Bind opacity to animated value
                }}
            >
                <View style={styles.container2}>
                    <View style={styles.titleContainer2}>
                        <Text style={styles.Title2}> </Text>
                    </View>
                    <View style={styles.containerLogo2}>

                        <Pressable onPress={() => props.setBotonH(true)}>
                            <Icon as={Ionicons} style={styles.icon2} name="eye-outline" />
                            {/* <HamburgerIcon /> */}
                        </Pressable>




                    </View>

                </View>

                {/* <View style={styles.containerFooter}>
                    <Image
                        source={require('../../assets/backgrounds/Colors.png')} alt="Alternate Text" size="lg" />

                </View> */}

            </Animated.View>

        </>
    )
}

export default TemplateScreenNoHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    containerLogo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    titleContainer: {
        alignItems: 'center',
    },
    icon: {
        marginTop: 30,
        fontSize: 20,
        color: 'rgba(1,40,107,1)'
    },
    logo: {
        marginTop: 20,
        width: 89,
        height: 50,
    },
    Title: {
        color: "rgba(1,40,107,1)",
        // fontFamily: "roboto-700",
        fontSize: 18,
        marginLeft: 20,
        marginTop: 30
    },
    containerFooter: {

        flex: 1,
        flexDirection: "column-reverse",
        alignItems: "flex-start",
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    containerLogo2: {
        marginTop:-30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    titleContainer2: {
        alignItems: 'center',
    },
    icon2: {
        marginTop:10,
        fontSize: 20,
        color: 'rgba(1,40,107,1)'
    },
});