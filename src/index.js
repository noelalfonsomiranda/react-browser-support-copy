import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { detect } from 'detect-browser';
import cmp from 'semver-compare';
import './style.scss';

const downloadLinks = {
  chrome: 'https://www.google.com/chrome',
  edge: 'https://microsoft-edge.en.softonic.com/download',
  firefox: 'https://www.mozilla.org/en-US/firefox',
  ie: 'https://www.microsoft.com/en-us/download/internet-explorer.aspx',
  ios: 'https://support.apple.com/downloads/safari',
  opera: 'https://www.opera.com',
  safari: 'https://support.apple.com/downloads/safari'
}

export default class BrowserSupport extends Component {
  static propTypes = {
    config: PropTypes.object,
    showDownloadLinks: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
    showBoth: PropTypes.bool,
    appComponent: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]),
    unsupportedComponent: PropTypes.func,
  }

  state = {
    browser: {},
    message: '',
    isSupported: true,
  }

  componentDidMount() {
    const browser = detect();
    this.determineBrowserSupport(browser);
  }

  determineBrowserSupport = (browser) => {
    const { config } = this.props;
    if (!browser) {
      console.log('could not detect browser');
    }
    else {
      if (!config[browser.name]) {
        this.setAsUnsupported(browser);
      } else {
        let browserVersion = config[browser.name];
        if (cmp(browser.version, browserVersion) < 0) {
          this.setAsUnsupported(browser);
        } else {
            this.setAsSupported(browser);
        }
      }
    }
  }

  setAsUnsupported = (browser) => {
    let states = {
      browser,
      isSupported: false,
      message: `${browser.name} version ${browser.version} is not currently supported`,
    };

    this.setState(states);
    this.props.scanBrowser && this.props.scanBrowser(states);
  }

  setAsSupported = (browser) => {
    let states = {
      browser,
      isSupported: true,
      message: `${browser.name} version ${browser.version} is supported`
    };

    this.setState(states);
    this.props.scanBrowser && this.props.scanBrowser(states);
  }

  handleDownloadLink = () => {
    const { browser: {name} } = this.state
    
    return (
      <div>
        <b>Please update your browser:</b>
        <ul>
          <li>
            <a href={downloadLinks[name]} target='_blank'>Download link</a> for your current browser.
          </li>
          <li>
            For better user experience download latest Chrome <a href={downloadLinks.chrome} target='_blank'>here</a>.
          </li>
        </ul>
      </div>
    )
  }

  showUnSupportedBlock = () => {
    const { children, className, style, unsupportedComponent, showDownloadLinks = false } = this.props;

    return (
      <div
        className={(!style) ? (className || 'warning-callout') : ''}
        style={style || {}}>
        {children ? children : (
            <h2>{this.state.message}</h2>
        )}
        
        {!unsupportedComponent && showDownloadLinks && this.handleDownloadLink()}
      </div>
    )
  }
    
  
  render() {
    const { appComponent, unsupportedComponent, showBoth = false } = this.props
    const handleWarning = !unsupportedComponent ? this.showUnSupportedBlock() : unsupportedComponent(this.state)
    let component

    if (this.state.isSupported) {
      component = appComponent || null
    } else {
      if (showBoth) {
        component = <div>
            { handleWarning }
            { appComponent || null }
          </div>
      } else {
        component = handleWarning
      }
    }

    return component
  }
}
