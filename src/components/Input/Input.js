import React, { PureComponent } from 'react';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import classnames from 'classnames';
import { empty } from '../../utils/EmptyUtils';
import IconButton from '../IconButton/IconButton';
import Error from '../Error/Error';

import './Input.scss';

class Input extends PureComponent {
  state = {
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    const { active } = this.state;

    if (active && !(this.input.contains(event.target) || this.iconAddition && this.iconAddition.button.current.contains(event.target))) {
      this.setState({ active: false });
    }
  };

  handleFocus = () => {
    this.setState({ active: true });
  }

  handleChange = (event) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(event.target.value);
    }
  }

  handleAdditionIconClick = () => {
    const { onAdditionIconClick, type } = this.props;
    const { showPassword } = this.state;

    if (type === 'password') {
      this.setState({ showPassword: !showPassword });
    }

    if (onAdditionIconClick) onAdditionIconClick();
  }

  setRef = (node, name) => {
    if (node) {
      this[name] = node;
    }
  };

  render() {
    const { className, t, id, type, label, required, value, error, autoFocus, additionIcon, additionIconSize, additionIconTooltip } = this.props;
    const { active, showPassword } = this.state;

    return (
      <div className={classnames(className, 'outlineInput', { error: !empty(error) })}>
        <div className={classnames("outlineInputContainer", { focus: active })}>
          <label className={classnames('', { active: !empty(value) || active, focus: active })} htmlFor={id}>
            {label} 
            {' '}
            {required ? "*" : ""}
          </label>
          
          <input 
            id={id}
            ref={(node) => this.setRef(node, "input")}
            type={type === "password" ? `${showPassword ? 'text' : 'password'}` : (type || "text")}
            autoComplete="off"
            value={value}
            autoFocus={autoFocus}
            onFocus={this.handleFocus}
            onChange={this.handleChange}
          />
          {(additionIcon || type === 'password') && (
            <IconButton 
              ref={(node) => this.setRef(node, "iconAddition")}
              className="additionIcon" 
              icon={additionIcon || type === 'password' && `fas fa-eye${showPassword ? '-slash': ''}`}
              iconSize={additionIconSize || 16}
              tooltip={additionIconTooltip || type === 'password' && showPassword ? t('outlineInput.password.additionIcon.hide.tooltip'): t('outlineInput.password.additionIcon.show.tooltip')}
              onClick={this.handleAdditionIconClick}
            />
          )}
        </div>
        <Error className="errorText" errors={error} />
      </div>
    );
  }
}

export default compose(withTranslation())(Input);
