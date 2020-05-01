import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import './RegisterPage.scss';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

class RegisterPage extends React.Component {
  componentDidMount() {
    
  }

  render() {
    const { t } = this.props;

    return (
      <div>{t('register.title')}</div>
    );
  }
}

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
)(RegisterPage);
