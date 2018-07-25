import React, { Component, PropTypes } from 'react';
import { detect } from 'detect-browser';
import cmp from 'semver-compare';
import './style.scss';

const downloadLinks = {
  chrome: 'https://www.google.com/chrome',
  edge: 'https://microsoft-edge.en.softonic.com/download',
  firefox: 'https://www.mozilla.org/en-US/firefox',
  ie: 'https://www.microsoft.com/en-us/download/internet-explorer.aspx',
  opera: 'https://www.opera.com',
  safari: 'https://support.apple.com/downloads/safari',
}

export const detectBrowser = data => data

export default class BrowserSupport extends Component {
  static propTypes = {
    supported: PropTypes.object.isRequired,
    showDownloadLinks: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.object,
    children: PropTypes.object,
  }

  state = {
    browser: {},
    message: '',
    supported: true,
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      detectBrowser(nextState);
    }
    return true
  }

  componentDidMount() {
    const browser = detect();
    this.determineBrowserSupport(browser);
  }

  determineBrowserSupport = (browser) => {
    let { supported } = this.props;
    if (!browser) {
      console.log('could not detect browser');
    }
    else {
      if (!supported[browser.name]) {
        this.setAsUnsupported(browser);
      } else {
        let browserVersion = supported[browser.name];
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
      supported: false,
      message: `${browser.name} version ${browser.version} is not currently supported`,
    };

    this.setState(states);
    this.props.scanBrowser && this.props.scanBrowser(states);
  }

  setAsSupported = (browser) => {
    let states = {
      browser,
      supported: true,
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
  
  render() {
    let { children, className, style, showDownloadLinks = false } = this.props;

    return this.state && !this.state.supported ? (
      <div
        className={(!style) ? (className || 'warning-callout') : ''}
        style={style || {}}>
        {children ? children : (
            <h2>{this.state.message}</h2>
        )}
        
        {showDownloadLinks && this.handleDownloadLink(showDownloadLinks)}
      </div>
    ) : null
  }  
}
