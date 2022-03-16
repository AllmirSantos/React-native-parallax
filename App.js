import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    View,
    Button,
    Text,
    StatusBar,
    Linking,
    TouchableOpacity,
} from 'react-native';

 

const { width } = Dimensions.get('window');
const headerHeight = 300;
const headerFinalHeight = 60;
const imageSize = (headerHeight / 4) * 2;



export default function ScrollViewAnimatedHeader() {
    const scrollY = useRef(new Animated.Value(0)).current;
    const [textWidth, setTextWidth] = useState(0);
  
    const offset = headerHeight - headerFinalHeight;
    const translateHeader = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [0, -offset],
        extrapolate: 'clamp',
    });
    const translateImageY = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [0, -(headerFinalHeight - headerHeight) / 2],
        extrapolate: 'clamp',
    });
    const translateImageX = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [
            0,
            -(width / 2) + (imageSize * headerFinalHeight) / headerHeight,
        ],
        extrapolate: 'clamp',
    });
    const scaleImage = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [1, headerFinalHeight / headerHeight],
        extrapolate: 'clamp',
    });
    const translateName = scrollY.interpolate({
        inputRange: [0, offset / 2, offset],
        outputRange: [0, 10, -width / 2 + textWidth / 2 + headerFinalHeight],
        extrapolate: 'clamp',
    });
    const scaleName = scrollY.interpolate({
        inputRange: [0, offset],
        outputRange: [1, 0.8],
        extrapolate: 'clamp',
    });
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="#3a0164" />
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false },
                )}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(x => (
                    <View style={styles.item} key={x} />
                ))} 
                <View style={styles.BoxInfor}>
                         <Text style={styles.BoxInforNome}>Feito por Almir Stark  </Text>
                   
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.BoxInforGit}>
            <Text style={styles.BtnText}>Git </Text>
            

                         </TouchableOpacity>
            <Animated.View
                pointerEvents='none'
                style={[styles.header, { transform: [{ translateY: translateHeader }] }]}>
                <Animated.View
                    style={[
                        styles.image,
                        {
                            transform: [
                                { translateY: translateImageY },
                                { translateX: translateImageX },
                                { scale: scaleImage },
                            ],
                        },
                    ]}>
                    <Image
                        source={{
                            uri: 'https://img.quizur.com/f/img5fc3cda4304da9.87240304.jpg?lastEdited=1606667688',
                        }}
                        style={styles.img}
                        resizeMode="cover"
                    />
                </Animated.View>
                <Animated.Text
                    onTextLayout={e => setTextWidth(e.nativeEvent.lines[0].width)}
                    style={[
                        styles.name, 
                        { transform: [{ translateX: translateName }, { scale: scaleName }] },
                    ]}>
                        <Text style={styles.NomeHeader}>Senhor Stark</Text>

                </Animated.Text>
                <Animated.Text
                    onTextLayout={e => setTextWidth(e.nativeEvent.lines[0].width)}
                    style={[
                        styles.profisao,
                        { transform: [{ translateX: translateName }, { scale: scaleName }] },
                    ]}>
                    <Text style={styles.FuncaoHeader}>Programador</Text>

                </Animated.Text>
                
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        height: 100,
        marginBottom: 5,
        borderRadius: 5,
        backgroundColor: 'grey',
        marginHorizontal: 5,
    },
    header: {
        height: headerHeight,
        backgroundColor: '#4B0082',
        position: 'absolute',
         width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
        paddingTop: headerHeight + 5,
    },
    image: {
        height: imageSize,
        width: imageSize,
        borderRadius: headerHeight,
         backgroundColor: 'red',
    },
    img: {
       height: imageSize,
        width: imageSize,

       borderRadius: headerHeight,
    },
    name: {
        bottom: 27,
        position: "absolute",
        height:25,
        letterSpacing: 2,
        textAlign: 'center',
    },
    profisao: {
      bottom: 5,
      position: "absolute",
      height: 25,
      letterSpacing: 2,
  },
    NomeHeader: {
      color: "#fff",
      fontSize: 20,
      width: '100%',
    },
    FuncaoHeader: {
      color: "#fff",
      fontSize: 15,
    },
    BoxInfor:{
        backgroundColor: "#000",
        height: 30,
        alignItems: 'center',
        display: 'flex',
        width: "100%",
        textAlign: 'center',
    },
    BoxInforNome:{
        color: "#fff",
        top: 5,
    },
    BoxInforGit:{
        backgroundColor:"#4B0082",
        display: "flex",
        alignItems: "center",
        paddingVertical: 10,
        position: "absolute",
        width: 60,
        height: 60,
        bottom: 5,
        right: 5,
        borderRadius: 50,
        elevation: 5,
        shadowOffset:{
            width:2,
            height:2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
    },
    BtnText:{
        color: "#fff",
        fontSize: 22,
        top: 5,
    }
});

//BY ALMIR STARK