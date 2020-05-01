import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { compose } from 'recompose';
import Tooltip from '@material-ui/core/Tooltip';
import { empty } from '../../utils/EmptyUtils';
import Icon from '../Icon/Icon';

import './ButtonBase.scss';

class ButtonBase extends PureComponent {
  button = React.createRef();

  click = () => {
    this.button.current.click();
  };

  disableClick = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  render() {
    const {
      text,
      children,
      icon,
      iconColor,
      iconSize,
      onClick,
      tooltip,
      className,
      style,
      disabled,
    } = this.props;

    return (
      <Tooltip
        title={empty(tooltip) ? '' : tooltip}
        disableHoverListener={empty(tooltip)}
      >
        <div
          ref={this.button}
          className={classNames('buttonBase', className, disabled)}
          style={style}
          onClick={disabled ? this.disableClick : onClick}
        >
          {icon ? (
            <Icon name={icon} color={iconColor} size={iconSize}>
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

export default compose()(ButtonBase);
