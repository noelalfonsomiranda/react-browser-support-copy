# react-browser-support-copy

[![Build Status](https://travis-ci.org/noelalfonsomiranda/react-browser-support-copy.svg?branch=master)](https://travis-ci.org/noelalfonsomiranda/react-browser-support-copy)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

- [add BrowserSupport component to your app as element](#user-content-component)
- [make BrowserSupport component a higher order component](#user-content-higher-order-component)

### Installation

`npm install react-browser-support-copy --save-dev`

### Component

This component displays a message, if the current browser is not supported.
This is determined using a list of supportedBrowsers ( a javascript object).
Supported Browsers are specified as an Object to the `list` prop of `<BrowserSupport supported={minBrowserVersions}>`.

## API

| Name | Types | Default | Description |
|---|---|---|---|
| config | object | undefined | Minimum browsers version |
| showDownloadLinks | bool | false | Show suggested current browser download link |
| className |   |   | For custom content or styles |
| styles |   |   | For custom styles |
| unsupportedComponent |   |   | This is required for Higher Order Component |
| appComponent |   |   | This is for higher component method which render your whole app |
| showBoth | bool | false | This is for higher component method which show both unsupported component and normally for app component |

**Note:** `unsupportedComponent` prop will disable the following prop *showDownloadLinks, style and className*

### Basic

You can use the default `<BrowserSupport />` component.

```jsx
import React from 'react'
import BrowserSupport from 'react-browser-support-copy'

const minBrowserVersions = {
    chrome: '60',
    edge: '13',
    firefox: '60',
    ie: '10',
    opera: '10',
    safari: '10'
}

export default class MyComponent extends React.Component {
    componentDidMount() {
        this.setState({ browser: detectBrowser() })
    }
    render() {
        return (
            //...
            <BrowserSupport config={minBrowserVersions}/>
            //...
        )
    }
}
```

### Custom

You can apply your own `style`, `className` & `children` as props to the component, and it will use those in place of the defaults.

```jsx
render() {
    return this.state ? (
        <div>
        {/* With Custom Content */}
        <BrowserSupport
            config={minBrowserVersions}
            className='custom-warning-style'
        />

        {/* With Custom Content & Browser Version, etc. */}
        <BrowserSupport
            config={minBrowserVersions}
            style={yourCustomStyles}>
            <b>
                {this.state.browser.name} (version: {this.state.browser.version}) unsupported
            </b> 
            <div>
                oh my goodness, we don't seem to support your browser 😳
            </div>
            <div style={{display: 'flex', flexDirection: 'column', marginTop: '1em'}}>
                <a href='https://www.google.com/chrome/browser/desktop/index.html'>Download Chrome</a>
                <a href='https://www.mozilla.org/en-US/firefox/new/'>Download Firefox</a>
                <a href='https://safari.en.softonic.com/mac/download'>Download Safari</a>
            </div>
        </BrowserSupport>
    </div>
    ) : null
}
```

> NOTE: If you are using chrome, you can test this with the [User-Agent Switcher for Chrome](https://chrome.google.com/webstore/search/user%20agent%20switcher) extension.

---

### Higher Order Component

This is a higher order component which wraps your app and detect if your browser is supported or not.
This will not allow users to browse your app if their browser is unsupported.


```jsx
/**
*
* App
*
*/

import React from 'react'
import BrowserCheck from 'components/BrowserCheck'

export function App () {
  return (
    <div>
      My Main App
    </div>
  )
}

export default BrowserCheck(App)
```

```jsx
/**
*
* BrowserCheck
*
*/

import React from 'react'
import BrowserSupport, { highOrderComponent } from 'react-browser-support-copy'

export default function BrowserCheck (Component) {
    const TestComponent = (props) => {
        console.log('props', props)
        return (
            <div>My Custom Unsupported Component</div>
        )
    }

  class BrowserCheckComponent extends React.Component {
    state = {
      browser: {}
    }

    handleScanBrowser= data => this.setState({browser: data})

    render () {
      const { supported } = this.state.browser
      const minBrowserVersion = {
        chrome: '60',
        edge: '13',
        firefox: '60',
        ie: '10',
        opera: '10',
        safari: '10'
      }

      return (
            <div>
                <BrowserSupport
                    config={minBrowserVersions}
                    showDownloadLinks // this will show suggested download links for user's browser
                    unsupportedComponent={(props) => <TestComponent key='component' {...props} />} // this will show your custom component if the browser is unsupported
                    appComponent={'<Component />'} // this is for higher component order method only
                    showBoth // this will show both unsupported and your app component
                />
            </div>
        )
    }
  }

  return BrowserCheckComponent
}
```

**Acknowledgement:**
This [package](https://github.com/bilo-io/react-browser-support) is originally developed by [Bilo Lwabona](https://github.com/bilo-io)
