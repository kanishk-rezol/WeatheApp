import React, { useEffect, useRef } from "react";
import { Animated, Image, View, StyleSheet, SafeAreaView } from "react-native";
import Main from './main';

export default function Start() {
    const opacityAnim1 = useRef(new Animated.Value(0)).current;
    const opacityAnim2 = useRef(new Animated.Value(0)).current;
    const opacityAnim3 = useRef(new Animated.Value(0)).current;
    const opacityAnim4 = useRef(new Animated.Value(0)).current;
    const boxTop = useRef(new Animated.Value(600)).current;
    const boxBottom = useRef(new Animated.Value(600)).current;
    const mainBox = useRef(new Animated.Value(500)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(opacityAnim1, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim2, {
                toValue: 1,
                duration: 1000,
                delay: 100,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim3, {
                toValue: 1,
                duration: 1000,
                delay: 200,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim4, {
                toValue: 1,
                duration: 1000,
                delay: 300,
                useNativeDriver: true,
            }),
            Animated.timing(boxTop, {
                toValue: 250,
                duration: 1000,
                delay: 400,
                useNativeDriver: false,
            }),
            Animated.timing(boxBottom, {
                toValue: 250,
                duration: 1000,
                delay: 500,
                useNativeDriver: false,
            }),
            Animated.timing(mainBox,{
                toValue:0,
                duration: 1000,
                delay: 600,
                useNativeDriver: false,
            })
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <Animated.Image
                    source={require("./assets/clear.png")}
                    style={[styles.image, { opacity: opacityAnim1 }]}
                />
                <Animated.Image
                    source={require("./assets/cloud.png")}
                    style={[styles.image, { opacity: opacityAnim2 }]}
                />
                <Animated.Image
                    source={require("./assets/drizzle.png")}
                    style={[styles.image, { opacity: opacityAnim3 }]}
                />
                <Animated.Image
                    source={require("./assets/rain.png")}
                    style={[styles.image, { opacity: opacityAnim4 }]}
                />
            </SafeAreaView>

            <Animated.View
                style={[styles.box1,{top: boxTop,},]}/>
            <Animated.View
                style={[styles.box2,{bottom: boxBottom, },]}/>
            <Animated.View style={[styles.main,{left: mainBox,},]}>
                <Main/>
            </Animated.View>    
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#f5f5f5",
    },
    safeArea: {
        alignItems: "center",
        flexDirection: "row",
    },
    image: {
        width: 50,
        height: 50,
        margin: 10,
    },
    box1: {
        backgroundColor: "#8bcfd1",
        position: "absolute",
        height: 2000,
        width: 2000,
        top: 600, 
        left: 0,
        transform: [{ rotate: "45deg" }],
    },
    box2: {
        backgroundColor: "#8bcfd1",
        position: "absolute",
        height: 2000,
        width: 2000,
        bottom: 600, 
        right: 0,
        transform: [{ rotate: "45deg" }],
    },
    main:{
        width:"100%",
        height:"100%",
        position:'absolute',
        left:500
    }
});
