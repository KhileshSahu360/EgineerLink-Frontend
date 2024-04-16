import { useState } from "react";
import BeatLoader from "react-spinners/BeatLoader";

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

export default Loader;