import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import classnames from 'classnames';
import ButtonBase from '../../components/ButtonBase/ButtonBase';

import './MasterPage.scss';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({}, dispatch);

class MasterPage extends React.Component {
  state = {
    scrolled: false,
  };

  handleScroll = () => {
    const { scrolled } = this.state;
    const page = document.getElementById('master-page');

    if (page.scrollTop === 0 && scrolled) {
      this.setState({ scrolled: false });
    }

    if (page.scrollTop > 1 && scrolled === false) {
      this.setState({ scrolled: true });
    }
  };

  navigateTo = url => {
    this.props.history.push(url);
  };

  render() {
    const { scrolled } = this.state;
    const { t, children } = this.props;

    return (
      <div
        id="master-page"
        className="master-page"
        onScroll={this.handleScroll}
      >
        <div className={classnames('navbar', { scrolled })}>
          <div className="menu">
            <div className="menu-group menu-group-left">
              <div className="menu-item menu-left logo">
                {t('master.menu.title')}
              </div>
            </div>
            <div className="menu-group">
              <ButtonBase
                className="menu-item menu-right button"
                icon="fas fa-sign-in-alt"
                iconSize={14}
                onClick={() => this.navigateTo('/v2/login')}
              >
                {t('master.menu.login')}
              </ButtonBase>
              <ButtonBase
                className="menu-item menu-right button"
                icon="fas fa-home"
                iconSize={14}
                onClick={() => this.navigateTo('/v2')}
              >
                {t('master.menu.home')}
              </ButtonBase>
            </div>
            {/* <ContextMenu className="menu-item menu-right toggle" icon="fas fa-ellipsis-v">
              <Icon 
                icon="fas fa-sign-in-alt" 
                iconSize={14}
                onClick={() => this.navigateTo('/v2/login')}
                >
                {t('master.menu.login')}
              </Icon>
              <Icon 
                icon="fas fa-home" 
                iconSize={14}
                onClick={() => this.navigateTo('/v2')}
                >
                {t('master.menu.home')}
              </Icon>
            </ContextMenu> */}
          </div>
        </div>

        <div className="content">{children}</div>
      </div>
    );
  }
}

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
)(MasterPage);
