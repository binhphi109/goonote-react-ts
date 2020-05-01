import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { Tooltip } from '@material-ui/core';
import { empty } from '../../utils/EmptyUtils';
import Icon from '../Icon/Icon';

import './Button.scss';

class Button extends PureComponent {
  button = React.createRef();

  click = () => this.button.current.click();

  disableClick = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  render() {
    const {
      className,
      action,
      text,
      style,
      children,
      tooltip,
      icon,
      iconSize,
      iconColor,
      disabled,
      onClick,
    } = this.props;

    return (
      <Tooltip title={empty(tooltip) ? '' : tooltip} disableHoverListener={empty(tooltip)}>
        <div
          className={classnames('buttonContainer', { action, disabled }, className)}
          style={style}
          ref={this.button}
          onClick={disabled ? this.disableClick : onClick}
        >
          {icon ? (
            <Icon icon={icon} iconSize={iconSize} iconColor={iconColor} inline indent>
              {text != null ? text : children}
            </Icon>
          ) : (
            <>{text != null ? text : children}</>
          )}
        </div>
      </Tooltip>
    );
  }
}

export default Button;
