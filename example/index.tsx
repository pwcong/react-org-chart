import React from 'react';
import ReactDOM from 'react-dom';

import ReactOrgChart from '../src/index';

let counter = 0;

ReactDOM.render(
  <ReactOrgChart
    height={'100vh'}
    data={{
      id: 'root',
      name: '产品研发中心',
      leaders: [
        {
          name: '彭伟聪',
          avatar: ''
        }
      ],
      members: Array.from(Array(10)).map(() => ({
        name: '名称',
        avatar: ''
      }))
    }}
    getChildren={(node) =>
      new Promise((resolve) => {
        counter++;
        resolve(
          Array.from(Array(3)).map((_, i) => ({
            id: `sub-${counter}-${i}`,
            name: '子部门'
          }))
        );
      })}
  />,
  document.getElementById('root')
);
