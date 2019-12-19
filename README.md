# React Org Chart
Organization Chart written in React. Preview demo here [https://pwcong.github.io/react-org-chart/index.html](https://pwcong.github.io/react-org-chart/index.html)

### How to use
```tsx

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
          avatar: 'https://avatars2.githubusercontent.com/u/13917544?s=460&v=4'
        }
      ],
      members: Array.from(Array(10)).map(() => ({
        name: '人员',
        avatar: ''
      })),
      hasChildren: true
    }}
    getChildren={(node) =>
      new Promise((resolve) => {
        counter++;
        resolve(
          Array.from(Array(3)).map((_, i) => ({
            id: `sub-${counter}-${i}`,
            name: '子部门',
            hasChildren: true
          }))
        );
      })}
  />,
  document.getElementById('root')
);

```