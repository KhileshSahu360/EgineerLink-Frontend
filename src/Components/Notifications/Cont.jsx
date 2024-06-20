import React from 'react';
import './Cont.css';

function Cont({ data }) {
  return (
    <div className="cont">
      <div className="img" style={{ backgroundImage: `url(${data.image})` }}>
      </div>

      <div className="info">
        <div>
          <span style={{ fontWeight: '900' }}>{data.name}</span>
          {data.comment && (
            <span> Commented: {data.comment.length > 40 ? `${data.comment.substring(0, 40)}...` : data.comment}</span>
          )}
          {data.like && <span> {data.like}</span>}
        </div>
        <div style={{ margin: '5px 0px', border: '1px solid black', width: '95%' }} />
      </div>

      <div className="post" style={{ backgroundImage: `url(${data.image})` }}>
      </div>
    </div>
  );
}

export default Cont;
