import React from 'react';
import classNames from 'classnames';

import './Error.scss';

class Error extends React.PureComponent {
  render() {
    const { className, errors, full } = this.props;

    if (!errors || errors.length === 0) {
      return null;
    }

    return (
      <div className={classNames('errorContainer', className)}>
        {full
          ? errors.map((error, index) => <div key={`${error.message}`}>{error.message}</div>)
          : errors[0].message}
      </div>
    );
  }
}

export default Error;
