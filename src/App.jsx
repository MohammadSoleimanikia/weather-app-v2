import { useState } from 'react'
import './App.css'
import Input from './components/Input'
import Weather from './components/Weather';
import WeatherSlider from './components/WeatherSlider';


function App() {
  
  const [city,setCity]=useState('tehran');
  return (
    <div className='w-screen h-screen flex items-center flex-col justify-between p-2 bg-blue-100'>
    <Input updateCity={setCity} type="text"/>
    <Weather city={city}/>
    <WeatherSlider city={city}/>
    </div>
  )
}

export default App
