import React from 'react'
import Cont from './Cont';
import data from './data.json';

const Notifications = () => {
  return (
    <>
      {data.map((item) => (
        <Cont key={item.id} data={item} />
      ))}
    </>
  );
}


export default Notifications