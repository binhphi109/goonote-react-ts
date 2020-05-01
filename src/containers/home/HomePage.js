import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import './HomePage.scss';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
}, dispatch);

class HomePage extends React.Component {
  componentDidMount() {
    
  }

  render() {
    const { t } = this.props;

    return (
      <div>{t('home.title')}</div>
    );
  }
}

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
)(HomePage);
