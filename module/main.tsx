import { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity , Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function main(){
    const clear = require('./assets/clear.png');
    const cloud = require('./assets/cloud.png');
    const drizzle = require('./assets/drizzle.png');
    const rain = require('./assets/rain.png');
    const sonw = require('./assets/snow.png');
    const [city, setCity] = useState('chennai');
    const inputRef=useRef<TextInput | null> (null);
    const[weatherData , setweatherData]=useState<{
        humidity: number,
        windspeed: number,
        temperature: number,
        pressure: number,
        sealevel: number,
        location: string,
        icon: any,
        alcolor: any,
    }| null>(null);
    const allIcon:Record<string,any>={
        "01d":clear,
        "01n":clear,
        "02d":clear,
        "02n":clear,
        "03d":cloud,
        "03n":cloud,
        "04d":drizzle,
        "04n":drizzle,
        "09d":rain,
        "09n":rain,
        "10d":rain,
        "10n":rain,
        "13d":sonw,
        "13n":sonw,
    };
    const allcolor: Record<string, string[]> = {
        "01d": ['#4c669f', '#3b5998'], 
        "01n": ['#2c3e50', '#4ca1af'],  
        "02d": ['#2193b0', '#6dd5ed'],  
        "02n": ['#2c3e50', '#4ca1af'],  
        "03d": ['#bdc3c7', '#2c3e50'], 
        "03n": ['#636e72', '#2c3e50'],  
        "04d": ['#757f9a', '#d7dde8'], 
        "04n": ['#4b6cb7', '#182848'],  
        "09d": ['#373B44', '#4286f4'],  
        "09n": ['#141E30', '#243B55'],  
        "10d": ['#373B44', '#4286f4'], 
        "10n": ['#141E30', '#243B55'],  
        "13d": ['#E6DADA', '#274046'],  
        "13n": ['#3E5151', '#DECBA4'],  
    };
    
    const search= async()=>{
        try{
            // let queryCity = city.trim() || "Chennai";
            if(!city) {
                // city=="chennai"
                // alert("enter a city name");
                // city="chennai";
                return ;
            }
            const apiKey = '858044da6a4fdf74a3bd631ac57768d8'; 
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const icon=allIcon[data.weather[0].icon] || clear;
            const alcolor =allcolor[data.weather[0].icon] || clear;
            setweatherData({
                humidity: data.main.humidity,
                windspeed: data.wind.speed,
                temperature: Math.floor(data.main.temp - 273),
                pressure:data.main.pressure,
                sealevel:data.main.sea_level,
                location: data.name,
                icon :icon,
                alcolor: alcolor,

            })
        }
        catch(error){
            console.log(error)  
        }
    }
    useEffect(()=>{ 
        search();
    },[])
    return(
        // <LinearGradient colors={allcolor[weatherData?.icon] || ['#4c669f', '#3b5998']} style={styles.container}>
        
        <LinearGradient colors={weatherData?.alcolor || ['#4c669f', '#3b5998']} style={styles.linearGradient}>
        <View style={styles.container}>
            <TextInput ref={inputRef} style={styles.search} onChangeText={setCity} />
            <TouchableOpacity style={styles.image} onPress={search}>
                <Image source={require('./search.png')} style={styles.searchimg} />
            </TouchableOpacity>
            <Image source={weatherData?.icon} style={styles.img} />
            <View style={styles.viewlocation}>
                <Text style={styles.degree}>{weatherData?.temperature}°C</Text>
                <Text style={styles.location}>{weatherData?.location}</Text>
            </View>
            <View style={styles.climet}>
              <View style={styles.humidity}>
                <View>
                    <Image source={require('./assets/humidity.png')}/>
                </View>
                <View>
                    <Text style={styles.clitext}>{weatherData?.humidity}%</Text>
                    <Text style={styles.clitext}>Humidity</Text>
                </View>
              </View>
              <View style={styles.wind}>
              <View>
                   <Image source={require('./assets/wind.png')}/>
               </View>
                <View>
                   <Text style={styles.clitext}>{weatherData?.windspeed}km</Text>
                   <Text style={styles.clitext}>Wind Speed</Text>
                </View>
              </View>
            </View>
            


            <View style={styles.climetn}>
              <View style={styles.pressure}>
                <View>
                    <Image source={require('./assets/pressure.png')} style={styles.nimg}/>
                </View>
                <View>
                    <Text style={styles.clintext}>{weatherData?.pressure}hpa</Text>
                    <Text style={styles.clintext}>Pressure</Text>
                </View>
              </View>
              <View style={styles.sealevel}>
              <View>
                   <Image source={require('./assets/sealevel.png')} style={styles.nimg}/>
               </View>
                <View>
                   <Text style={styles.clintext}>{weatherData?.sealevel}hpa</Text>
                   <Text style={styles.clintext}>Sea Level</Text>
                </View>
              </View>
            </View>
        </View>
        </LinearGradient> 
        // </LinearGradient>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:'#eec9d2',
        width:'100%',
       
    },
    linearGradient:{
        flex:1,
        // bottom:59,
        // width:'100%',
        // height:'100%',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
    },

    search:{
        backgroundColor:'white',
        width:250,
        height:50,
        top:80,
        left:50,
        justifyContent: 'center',
        alignContent:'center',
        textAlign: 'center',
        borderRadius:50,
        borderColor:'black',
        borderWidth:0.3,
    },
    image:{
        width:45,
        height:45,
        justifyContent: 'center',
        alignItems:'center',
        left:320,
        top:33,
        // borderRadius:50,
    },
    searchimg:{
        height:25,
        width:25,
    },
    img:{
        top:40,
        left:100,
    },
    viewlocation:{
        top:70,
        left:100,
    },
    degree:{
        left:20,
        fontSize:70,
    },
    location:{
        fontSize:30,
        left:30,
        fontWeight:'normal',
        fontFamily:'Arial',
    },
    climet:{
        // flex:1,
        top:140,
        flexDirection:'row',
        justifyContent: 'center',
        gap:40,
        fontSize:20,
    },
    humidity:{
        flexDirection:'row',
        gap:20,

    },
    wind:{
        flexDirection:'row',
        gap:20
    },
    clitext:{
        bottom:5,
        fontSize:17,
    },
    climetn:{
        top:200,
        flex:1,
        flexDirection:'row',
        justifyContent: 'center',
        gap:40,
        fontSize:20,

    },
    nimg:{
        height:50,
        width:40,
    },
    pressure:{
        flexDirection:'row',
        gap:20,

    },
    sealevel:{
        flexDirection:'row',
        gap:20,

    },
    clintext:{
        bottom:5,
        fontSize:17,
    }
})