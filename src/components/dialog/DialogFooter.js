import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Base } from 'bw-axiom';

export default class DialogFooter extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    const { children, className, ...rest } = this.props;
    const classes = classnames(className, 'ax-dialog__footer');

    return (
      <Base { ...rest } className={ classes }>
        { children }
      </Base>
    );
  }
}