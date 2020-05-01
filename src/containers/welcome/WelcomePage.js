import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import './WelcomePage.scss';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

class WelcomePage extends React.Component {
  componentDidMount() {
    
  }

  render() {
    const { t } = this.props;

    return (
      <div>{t('welcome.title')}</div>
    );
  }
}

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
)(WelcomePage);
