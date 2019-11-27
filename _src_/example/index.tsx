import React from 'react';
import ReactDOM from 'react-dom';
import OrgChart from '../react/org-chart';
import fakeData from '../utils/fake-data';

const root = document.getElementById('root');
const tree = fakeData();

const props = {
  tree: {
    id: 1,
    person: {
      id: 1,
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/spbroma/128.jpg',
      department: '',
      name: 'Imelda Haley',
      title: 'CEO',
      totalReports: 5
    },
    hasChild: true,
    children: []
  },
  loadChildren: () => {
    // this could also just be `return tree.children`
    return Promise.resolve(tree.children);
  },
  lineType: 'angle'
};

ReactDOM.render(React.createElement(OrgChart, props, null), root);
