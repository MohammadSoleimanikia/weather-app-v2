import useFetch from "../hooks/useFetch";

export default function Weather({ city }) {
  const { data, loading, error } = useFetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
      import.meta.env.VITE_API_KEY
    }`,
    city
  );

  if (loading) return <p className="text-blue-500">Loading weather... ⏳</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!data) return null; // just in case

  return (
    <div className="flex flex-col md:flex-row justify-between w-full md:w-8/12">
      <div className="flex items-center justify-center">
        <h1 className="text-3xl md:text-6xl font-semibold mt-5">
          {data.name}, {data.sys.country}
        </h1>
      </div>

      <div className="text-center mt-5">
        <img
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
          alt={data.weather[0].description}
          className="w-24 h-24 mx-auto md:w-40 md:h-40"
        />
        <p className="font-semibold text-lg md:text-4xl capitalize">
          {data.weather[0].description}
        </p>
      </div>

      <div className="flex flex-col  md:mt-5 text-center  pt-4">
        <h2 className="text-5xl font-light">{Math.floor(data.main.temp)}°C</h2>

        <div className="grid grid-cols-2 border-t-2 border-neutral-300 mt-5 md:mt-10">
          <div className="flex flex-col items-center">
            <p className="font-semibold text-lg">Humidity</p>
            <p className="text-sm">{data.main.humidity}%</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-semibold text-lg">Wind</p>
            <p className="text-sm">{data.wind.speed} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
}
