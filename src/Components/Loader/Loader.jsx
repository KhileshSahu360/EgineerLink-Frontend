import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import MoonLoader from "react-spinners/MoonLoader";
import HashLoader from "react-spinners/HashLoader";
import './Loader.css';

function Loader({color}) {
  let [loading, setLoading] = useState(true);

  return (
    <div className="sweet-loading">

      <BeatLoader
        color={color}
        loading={loading}
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
const CircleLoader = ({color, size}) => {
  const [loading, setLoading] = useState(true);
  return(
    <div className="sweet-loading">

      <MoonLoader
        color={color}
        loading={loading}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}
const FadLoader = ({color, size}) => {
  const [loading, setLoading] = useState(true);
  return(
    <div className="sweet-loading">

      <HashLoader
        color={color}
        loading={loading}
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}
export { CircleLoader, FadLoader };
export default Loader;