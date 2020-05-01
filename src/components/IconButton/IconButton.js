import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import classnames from 'classnames';
import { empty } from '../../utils/EmptyUtils';
import Icon from '../Icon/Icon';

import './IconButton.scss';

class Button extends React.PureComponent {
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
      onClick,
      className,
      style,
      icon,
      iconColor,
      iconSize,
      tooltip,
      disabled,
    } = this.props;

    return (
      <Tooltip
        title={empty(tooltip) ? '' : tooltip}
        disableHoverListener={empty(tooltip)}
      >
        <div
          ref={this.button}
          className={classnames('iconButton', className)}
          style={style}
          onClick={disabled ? this.disableClick : onClick}
        >
          <IconButton
            size="small"
            disabled={disabled}
          >
            <Icon name={icon} color={iconColor} size={iconSize} />
          </IconButton>
        </div>
      </Tooltip>
    );
  }
}

export default Button;
