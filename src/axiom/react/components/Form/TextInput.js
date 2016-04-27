import React, { Component, cloneElement } from 'react';
import classnames from 'classnames';
import { enhance, addDisplayName, addPropTypes, addClassName, findComponent } from '../../utils/components';
import { blacklist } from '../../utils/props';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';

export class TextInput extends Component {
  static propTypes = {
    children: { node: true },
    icon: { string: true },
    valid: { bool: true },
    invalid: { bool: true },
    thinking: { bool: true },
  };

  getIcon() {
    const {icon, valid, invalid, thinking} = this.props;

    if (valid) return 'check';
    if (invalid) return 'times';
    if (thinking) return 'circle-o-notch';

    return icon;
  }

  render() {
    const { className, children, icon, valid, invalid, thinking } = this.props;
    const button = findComponent(children, Button);
    const iconClasses = classnames({'ax-icon-spin': thinking});
    const classes = classnames(className,
      'ax-input__group', {
        'ax-input--valid': valid === true,
        'ax-input--invalid': invalid === true,
      }
    );

    return (
      <label className={classes}>
        <div className="ax-input__button-container">
          <div className="ax-input__icon-container">
            <input className="ax-input" {...blacklist(this.props, ['children', 'className'])} />

            {do {
              if (icon) {
                <div className="ax-input__icon">
                  <Icon className={iconClasses} name={this.getIcon(icon)} size="lg" />
                </div>
              }
            }}
          </div>

          {do {
            if (button) {
              cloneElement(button, {
                className: 'ax-input__button',
              })
            }
          }}
        </div>
      </label>
    );
  }
}

export default enhance(
  TextInput,
  addDisplayName('TextInput'),
  addPropTypes('global'),
  addClassName('global'),
);