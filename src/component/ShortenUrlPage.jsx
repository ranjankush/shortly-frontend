// import React, { useEffect } from 'react'
// import { useParams } from 'react-router-dom'

// const ShortenUrlPage = () => {
//     const{url}=useParams();

//     useEffect(()=>{
//         if(url){
//             window.location.href=import.meta.env.VITE_BACKEND_URL + `/${url}`;
//         }
//     },[url]);
//   return null;
// }

// export default ShortenUrlPage


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Watch } from "react-loader-spinner";

const ShortenUrlPage = () => {
  const { url } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (url) {
      const timer = setTimeout(() => {
        window.location.href = import.meta.env.VITE_BACKEND_URL + `/${url}`;
      }, 2000); // Wait 2 seconds
      return () => clearTimeout(timer);
    }
  }, [url]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <Watch
        height="80"
        width="80"
        radius="48"
        color="#d32f2f"
        ariaLabel="watch-loading"
        visible={loading}
      />
      <p className="mt-4 text-lg font-semibold text-gray-600">
        Redirecting...
      </p>
    </div>
  );
};

export default ShortenUrlPage;
