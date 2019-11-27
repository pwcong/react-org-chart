import { createElement, PureComponent } from 'react';
import { init } from '../chart';

export default class OrgChart extends PureComponent<any> {
  render() {
    const { id } = this.props;

    return createElement('div', {
      id
    });
  }

  static defaultProps = {
    id: 'react-org-chart'
  };

  componentDidMount() {
    console.log('mount');

    const { id, tree, ...options } = this.props;

    init({ id: `#${id}`, data: tree, ...options });
  }
}
