import React from 'react';
import classnames from 'classnames';

import './Icon.scss';

class Icon extends React.PureComponent {
  render() {
    const { children, name, size, color, inline, indent, indentSize, className, style, onClick } = this.props;

    return (
      <span
        className={className}
        style={{
          ...style,
          cursor: onClick && 'pointer',
        }}
        onClick={onClick}
      >
        <i
          className={name}
          style={{
            fontSize: size,
            color,
          }}
        />
        {children && (
          <>
            &nbsp;
            {children}
          </>
        )}
      </span>
    );
  }
}

export default Icon;
