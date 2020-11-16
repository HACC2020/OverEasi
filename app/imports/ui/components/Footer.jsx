import React from 'react';
import { Image } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
        <footer>
          <div style={divStyle} className="ui center aligned container">
            <hr />
              Created by OverEasi for HACC2020<br />
            <Image src="https://overeasi.github.io/doc/banner.png" size='medium' circular centered/>
          </div>
        </footer>
    );
  }
}

export default Footer;
