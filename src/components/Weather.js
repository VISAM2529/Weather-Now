import React, { useEffect, useState } from "react";
import humidity from "./images/humidity.png";
import sea from "./images/sea.png";
import maxtemp from "./images/maxtemp.png";
import mintemp from "./images/mintemp.png";
import windd from "./images/wind.png";
import {MdMyLocation} from "react-icons/md"
import ReactModal from "react-modal";
import {RxCross2} from "react-icons/rx"
import back from "./images/wallpaper.jpg"
function Weather() {
  const [lattitude, setLattitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [city, setCity] = useState(null);
  const [wind, setWind] = useState(null);
  const [name, setName] = useState(null);
  const [country, setCountry] = useState(null);
  const [weather,setWeather]=useState(null)
  const setLat = (event) => {
    if (event.target.value === "") {
      openLat();
    } else {
      setLattitude(event.target.value);
    }
  };

  const setLong = (event) => {
    if (event.target.value === "") {
      openLong();
    } else {
      setLongitude(event.target.value);
    }
  };

  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  const time = `${current.getHours()} : ${current.getMinutes()} : ${current.getSeconds()}`;

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longitude}&units=metric&appid=18b985ddf26498ac53cc42ea9bc4057a`;
      const response = await fetch(url);
      const responseJson = await response.json();
      setCity(responseJson.main);
      setWind(responseJson.wind);
      setName(responseJson);
      setCountry(responseJson.sys);
      setWeather(responseJson.weather)
      console.log(responseJson);
    };
    fetchApi();
  }, [lattitude, longitude]);


  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius : "10px"
    },
  };

  const [latIsOpen, setLatIsOpen] = React.useState(false);

  function openLat() {
    setLatIsOpen(true);
  }


  function closeLat() {
    setLatIsOpen(false);
  }


  const [longIsOpen, setLongIsOpen] = React.useState(false);

  function openLong() {
    setLongIsOpen(true);
  }


  function closeLong() {
    setLongIsOpen(false);
  }

  return (
    <div>
    <div>
    <ReactModal
        isOpen={latIsOpen}
        style={customStyles}
      >
        <div className="flex flex-col gap-10 px-5 py-5">
          <div className="flex items-center justify-end">
          <button onClick={closeLat} className="text-3xl text-red-600 hover:scale-150 ease-in-out duration-500"><RxCross2/></button>
          </div>
          <div className="flex flex-col gap-16">
          <h1 className="text-xl">Lattitude Cannot Be Empty</h1>
        <button onClick={closeLat} className="bg-blue-600  text-white py-3 text-xl hover:rounded-3xl ease-in-out duration-300 hover:bg-blue-500">OK</button>
        
          </div>
       </div>
      </ReactModal>
      
      
      <ReactModal
        isOpen={longIsOpen}
        style={customStyles}
      >
        <div className="flex flex-col gap-10 px-5 py-5">
          <div className="flex items-center justify-end">
          <button onClick={closeLong} className="text-3xl text-red-600 hover:scale-150 ease-in-out duration-500"><RxCross2/></button>
          </div>
          <div className="flex flex-col gap-10">
          <h1 className="text-xl">Longitude Cannot Be Empty</h1>
        <button onClick={closeLong} className="bg-blue-600  text-white py-3 text-xl hover:rounded-3xl ease-in-out duration-300 hover:bg-blue-500">OK</button>
        
          </div>
       </div>
      </ReactModal>
    </div>
      <div className="flex flex-col gap-10">
        <div className="px-8 py-5 phone:px-3">
          <ul className="flex items-center justify-between text-white">
            <div>
              <li className="text-4xl font-extrabold border-x-2 border-y-2 border-white rounded-lg px-3 py-3 phone:text-xl">
                Weather Now
              </li>
            </div>
            <div className="flex items-center gap-10 font-bold phone:gap-5 ">
            {!name || !country ? (
                <p></p>
              ) : (
                <li className="text-2xl flex items-center gap-2 phone:text-sm phone:hidden">
                  <MdMyLocation/>
                  {name.name}-{country.country}
                </li>
              )}
              <div className="flex items-center gap-2 phone:flex-col">
                <input
                  type="search"
                  placeholder="Lattitude"
                  defaultValue={lattitude}
                  onChange={setLat}
                  className="w-40 h-10 bg-transparent rounded-3xl border-x-2 border-y-2 border-white text-lg px-3 phone:text-sm"
                />
                <input
                  type="search"
                  placeholder="Longitude"
                  defaultValue={longitude}
                  onChange={setLong}
                  className="w-40 h-10 bg-transparent rounded-3xl border-x-2 border-y-2 border-white text-lg px-2 phone:text-sm"
                />
              </div>
              
            </div>
          </ul>
        </div>
        {!city || !country ? (
          <p></p>
        ) : (
          <div className="flex flex-col gap-2 ease-in-out duration-150 phone:gap-10 ">
            <div className="flex  items-center justify-center gap-0.5 phone:flex phone:flex-col">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm w-40 h-96 flex flex-col items-center gap-5 hover:-translate-y-1 hover:scale-105 cursor-pointer ease-in-out duration-500 phone:flex-row phone:h-16 phone:w-80 phone:justify-center text-white">
                <h1 className="text-3xl py-20 rotate-90 phone:rotate-0 phone:text-sm">Humidity</h1>
                <h1 className="text-2xl phone:text-sm">{city.humidity} %</h1>
                <img src={humidity} className="w-24 phone:w-10" />
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm w-40 h-96 flex flex-col items-center gap-5 hover:-translate-y-1 hover:scale-105 cursor-pointer ease-in-out duration-500 phone:flex-row phone:h-16 phone:w-80 phone:justify-center text-white">
                <h1 className="text-3xl py-20 rotate-90 phone:rotate-0 phone:text-sm">Sea Level</h1>
                <h1 className="text-2xl phone:text-sm">{city.sea_level}</h1>
                <img src={sea} className="w-24 phone:w-10" />
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm w-40 h-96 flex flex-col items-center gap-5 hover:-translate-y-1 hover:scale-105 cursor-pointer ease-in-out duration-500 phone:flex-row phone:h-16 phone:w-80 phone:justify-center text-white">
                <h1 className="text-3xl py-20 rotate-90 phone:rotate-0 phone:text-sm phone:px-5">Max Temp</h1>
                <h1 className="text-2xl phone:text-sm">{city.temp_max} °C</h1>
                <img src={maxtemp} className="w-24 phone:w-10" />
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm w-40 h-96 flex flex-col items-center gap-5 hover:-translate-y-1 hover:scale-105 cursor-pointer ease-in-out duration-500 phone:flex-row phone:h-16 phone:w-80 phone:justify-center text-white">
                <h1 className="text-3xl py-20 rotate-90 phone:rotate-0 phone:text-sm phone:px-5">Min Temp</h1>
                <h1 className="text-2xl phone:text-sm">{city.temp_min} °C</h1>
                <img src={mintemp} className="w-24 phone:w-10" />
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm w-40 h-96 flex flex-col items-center gap-5 hover:-translate-y-1 hover:scale-105 cursor-pointer ease-in-out duration-500 phone:flex-row phone:h-16 phone:w-80 phone:justify-center text-white">
                <h1 className="text-3xl py-20 rotate-90 phone:rotate-0 phone:text-sm">Wind</h1>
                <h1 className="text-2xl phone:text-sm">{wind.speed}km/hr</h1>
                <img src={windd} className="w-24 phone:w-10" />
              </div>
            </div>
            <div className="px-24 phone:px-10 text-white">
              <div className="flex items-center justify-between max-w-full bg-white bg-opacity-10 backdrop-blur-sm py-5 phone:max-w-xl ">
                <div className="flex flex-col items-center px-10 text-3xl gap-2 ">
                  <h1 className="font-extrabold phone:text-md">{name.name}</h1>
                  <h1 className="font-bold phone:text-xl">[ {country.country} ]</h1>
                  
                </div>
                <h1 className="phone:text-xs phone:hidden">Current Weather : {weather[0].description}</h1>
                <div className="flex flex-col px-10 items-center text-2xl phone:text-sm">
                  <h1>{time}</h1>
                  <h1>{date}</h1>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
