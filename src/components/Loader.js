// components/Loader.js
import React , {useState} from 'react';
import PulseLoader from 'react-spinners/PulseLoader';

function Loader() {
    let [loading, setLoading] = useState(true);
  return (
    <div style={{marginTop:'150px'}}>
        <div className="sweet-loading text-center">
      <PulseLoader
        color="#000"
        loading={true}
        css=""
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    </div>
  );
}

export default Loader;