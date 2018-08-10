import React from 'react';
import ReactDOM from 'react-dom';
import BrowserSupport, { highOrderComponent } from '../dist'

const Test = (props) => {
  return (
    <div>Custom Unsupported Component</div>
  )
}
class Application extends React.Component {
  state = {
    browser: {}
  }

  handleScanBrowser= data => this.setState({browser: data})

  render() {
    const minBrowserVersions = {
      chrome: '60',
      crios: '60',
      edge: '13',
      firefox: '60',
      fxios: '12',
      ie: '10',
      ios: '10',
      opera: '10',
      safari: '10'
    }

    // console.log('browser', this.state.browser)

    return (
      <div>
        <BrowserSupport
          config={minBrowserVersions}
          showDownloadLinks
          unsupportedComponent={(props) => <Test key='component' {...props} />}
          appComponent={'<div>COMPONENT<div/>'}
          showBoth
        />
          
        <h1>Hello World!</h1>
      </div>
    )
  }
}

/*
 * Render the above component into the div#app
 */
ReactDOM.render(<Application />, document.getElementById('app'));