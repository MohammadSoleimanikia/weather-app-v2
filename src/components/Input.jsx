import { useRef, useState } from "react";

export default function Input({ updateCity, ...props }) {
  const cityRef = useRef();
  const [error, setError] = useState(null);

  function handleCitySubmit() {
    const cityName = cityRef.current.value.trim();

    if (cityName === "") {
      setError("Please enter a city name");
      return; // Stop execution here!
    }

    // Clear error if valid
    setError(null);
    updateCity(cityName);
    cityRef.current.value = "";
  }
  function handleChange(){
    setError(null)
  }

  return (
    <div className="mt-5 bg-blue-300 rounded-md p-2 w-8/12  flex justify-between mb-5">
      <input
        placeholder={error || "City name"}
        className={`w-full outline-none bg-blue-300 ${error ? "placeholder-red-500" : ""}`}
        ref={cityRef}
        onChange={handleChange}
        {...props}
      />
      <button
        className="ml-1 hover:bg-blue-200 rounded-md p-1"
        onClick={handleCitySubmit}
      >
        Submit
      </button>
    </div>
  );
}
