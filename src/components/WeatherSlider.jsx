import { useRef } from "react";
import useFetch from "../hooks/useFetch";

export default function WeatherSlider({city,...props}){
    const sliderRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    
    const {data,error,loading}=useFetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${
        import.meta.env.VITE_API_KEY
      }`)
    
  if (loading) return <p className="text-blue-500">Loading weather... ⏳</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!data) return null; // just in case
        const next24hData = data.list.slice(0, 8).map((item) => ({
            hour: new Date(item.dt_txt).getHours(),
            temp: Math.round(item.main.temp),
            humidity: item.main.humidity,
            wind: Math.round(item.wind.speed),
            icon: item.weather[0].icon,
          }));
  
    const startDrag = (e) => {
      isDragging.current = true;
      startX.current = e.pageX || e.touches[0].pageX;
      scrollLeft.current = sliderRef.current.scrollLeft;
    };
  
    const stopDrag = () => {
      isDragging.current = false;
    };
  
    const handleDrag = (e) => {
      if (!isDragging.current) return;
      const x = e.pageX || e.touches[0].pageX;
      const walk = (x - startX.current) * -1;
      sliderRef.current.scrollLeft = scrollLeft.current + walk;
    };
  
    return (
      <div
        className="overflow-x-auto  whitespace-nowrap px-4 py-4  md:flex md:justify-center w-full md:w-10/12"
        ref={sliderRef}
        onMouseDown={startDrag}
        onMouseMove={handleDrag}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onTouchStart={startDrag}
        onTouchMove={handleDrag}
        onTouchEnd={stopDrag}
        style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
        {...props}
      >
        {next24hData.map((item, index) => (
          <div
            key={index}
            className="inline-block w-40 mx-2 p-4 rounded-xl bg-blue-300 shadow-md text-center"
          >
            <img
              src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
              alt="weather icon"
              className="mx-auto"
            />
            <p className="text-lg font-bold">{item.hour}:00</p>
            <p>🌡️ {item.temp}°C</p>
            <p>💧 {item.humidity}%</p>
            <p>💨 {item.wind} km/h</p>
          </div>
        ))}
      </div>
    );
  };
  