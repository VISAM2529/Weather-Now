import Weather from "./components/Weather";
import back from "./components/images/wallpaper.jpg"

function App() {
  return (
    <div className="w-screen h-72 phone:scroll-smooth scroll-smooth ">
      <Weather/>
    </div>
  );
}

export default App;
