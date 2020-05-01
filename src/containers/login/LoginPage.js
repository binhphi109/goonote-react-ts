import _ from 'lodash';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import React from 'react';

import { empty } from '../../utils/EmptyUtils';
import { filter } from '../../utils/ListUtils';
import { setToPath } from '../../utils/JsonUtils';
import Button from '../../components/Button/Button';
import Error from '../../components/Error/Error';
import Input from '../../components/Input/Input';
import MasterPage from '../master/MasterPage';
import UserActions from '../../redux/UserRedux';

import './LoginPage.scss';
import Icon from '../../components/Icon/Icon';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      login: UserActions.login,
    },
    dispatch
  );

const initialState = {
  item: {
    username: '',
    password: '',
  },
  dirty: false,
};

class LoginPage extends React.PureComponent {
  state = {
    ...initialState,
  };

  handleChange = (name, value) => {
    const { item, errors } = this.state;

    const newItem = _.cloneDeep(item);
    setToPath(newItem, name, value);

    if (errors !== undefined) {
      this.validate(newItem);
    }

    this.setState({
      item: newItem,
      dirty: true,
    });
  };

  handleSave = () => {
    const { t } = this.props;
    const { item } = this.state;

    this.validate(item, () => {
      this.props
        .login(item.username, item.password)
        .then(() => {
          this.reset();
        })
        .catch(error => {
          this.setState({
            item: {
              username: '',
              password: '',
            },
            errors: [
              {
                field: 'login',
                message: t('login.action.save.error'),
              },
            ],
          });
        });
    });
  };

  validate = (item, callback) => {
    const { t } = this.props;
    const newErrors = [];

    if (empty(item.username)) {
      newErrors.push({
        field: 'username',
        message: t('login.username.error.required'),
      });
    }

    if (empty(item.password)) {
      newErrors.push({
        field: 'password',
        message: t('login.password.error.required'),
      });
    }

    this.setState({
      errors: newErrors,
    });

    if (newErrors.length === 0) {
      if (callback) callback();
    }
  };

  reset = () => {
    this.setState(initialState);
  };

  render() {
    const { t } = this.props;
    const { item, errors } = this.state;

    return (
      <div id="loginPage" className="loginPage">
        <MasterPage>
          <div className="content-card">
            <div className="contentTitle">{t('login.title')}</div>

            <Input
              id="username"
              className="username"
              label={t('login.username.label')}
              value={item.username}
              onChange={value => this.handleChange('username', value)}
              error={filter(errors, 'field', 'username')}
              required
            />

            <Input
              id="password"
              className="password"
              type="password"
              label={t('login.password.label')}
              value={item.password}
              onChange={value => this.handleChange('password', value)}
              error={filter(errors, 'field', 'password')}
              required
            />

            <Error className="loginError" errors={filter(errors, 'field', 'login')} />

            <div className="contentAction">
              <Button className="loginButton" onClick={this.handleSave} action>
                {t('login.action.save')}
              </Button>
            </div>
          </div>
        </MasterPage>
      </div>
    );
  }
}

export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProps))(LoginPage);
