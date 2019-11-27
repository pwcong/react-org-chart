import React from 'react';
import ReactDOM from 'react-dom';

import ReactOrgChart from '../src/index';

ReactDOM.render(
  <ReactOrgChart
    data={{
      key: 'root',
      name: '产品研发中心',
      leaders: [
        {
          name: '彭伟聪',
          avatar: ''
        }
      ],
      elementCount: 10
    }}
    getChildren={(node) =>
      new Promise((resolve) => {
        console.log(node);
        resolve([]);
      })}
  />,
  document.getElementById('root')
);
