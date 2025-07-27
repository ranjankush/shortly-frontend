// import React from 'react'
// import ShortenItem from './ShortenItem'

// const ShortenUrlList = ({ data }) => {
//   return (
//     <div className='my-6 space-y-4'>
//         {data.map((item) => (
//             <ShortenItem key={item.id} {...item} />
//         ))}
//     </div>
//   )
// }

// export default ShortenUrlList/

import React from 'react';
import ShortenItem from './ShortenItem';

const ShortenUrlList = ({ data }) => {
  if (!Array.isArray(data)) {
    return <p className="text-red-500">No data available to display.</p>;
  }

  return (
    <div className="my-6 space-y-4">
      {data.map((item) => (
        <ShortenItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ShortenUrlList;
