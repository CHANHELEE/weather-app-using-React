import {useState,useEffect,CSSProperties} from "react";
import ClipLoader from "react-spinners/ClipLoader";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherBox  from "./component/WeatherBox";
import WeatherButton from "./component/WeatherButton";

/**
 * 
 * 1. 앱이 실행되자마자 현재 위치기반의 날씨가 보인다.
 * 2. 날씨 정보에는 도시, 섭씨 , 화씨, 날씨상태가 있다.
 * 3. 5개의 버튼이 있다 (1개는 현재위치, 4개는 다른도시)
 * 4. 도시버튼을 클릭할때 마다 도시별 날씨가 나온다.
 * 5. 현재위치 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
 * 6. api가 호출 되는 동안 로딩스피너가 실행된다.
 * */
function App() {
  const [weather,setWeather] = useState();
  const [city,setCity]= useState(null);
  const [selectedCity,setSelectedCity]= useState(null);
  const [loading ,setLoading] = useState(false);
  const cities = ["Hanoi","New York","HongKong","London"]
  const getCurrentLocation= () =>{
    navigator.geolocation.getCurrentPosition((position)=>{
      setLoading(true);
      let latitude =position.coords.latitude;
      let longitude = position.coords.longitude;
      setLoading(false);
      getWeatherByCurrentLocation(latitude,longitude);
    });
  }

  const handleCity=(city)=>{
    setCity(city);
    setSelectedCity(city);
  }

  const getWeatherByCurrentLocation= async(latitude,longitude) =>{
    let url = new URL(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=07ddc98b300b9af1e2886d4e41e4cd53&units=metric`)
    setLoading(true);
    let response = await fetch(url);
    setLoading(false);
    let data = await response.json();
    setWeather(data);

  }

  const getWeatherByLocation = async(country) => {
    let url = new URL(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=07ddc98b300b9af1e2886d4e41e4cd53&units=metric`);
    setLoading(true);
    let response = await fetch(url);
    setLoading(false);
    let data = await response.json();
    setWeather(data); 
  }

  useEffect(
    ()=>{
      if(city==null){

        getCurrentLocation();
      }else{
        getWeatherByLocation(city)
      }
    }
    ,[city])

  return (
    <div >
      
      {loading ? (
        <div className="container">
          <ClipLoader color="#FF6347" loading={loading}  size={150}></ClipLoader>
        </div>
      ) :(<div className="container">
          <WeatherBox weather = {weather} setCity={setCity}/>
          <WeatherButton cities={cities}  selectedCity={selectedCity} handleCity={handleCity}/>
        </div>)}
      
    </div>
  );
}

export default App;
