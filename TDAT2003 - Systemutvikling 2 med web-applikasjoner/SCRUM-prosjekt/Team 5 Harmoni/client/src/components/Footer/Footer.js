import React, { Component } from 'react';
import '../../css/Footer.css';

/**
 * @class Footer
 * This is the bottom component of the site, rendered on nearly every site, for showing the option to see "about" and send us a mail with the "contact us"-link.
 */
class Footer extends Component {
  render() {  
    return (
        <div>
            <div id="Footer">
                <a id="FooterLink" className="navbar-brand" href="#/about"><h5>Om</h5></a>
                <a id="FooterLink" className="navbar-brand" href="mailto:noreply.harmoni@gmail.com?Subject=Hello%20again">
                    <h5>Kontakt oss</h5></a>
            </div>
        </div>
    )
  }
}
/**
 * @class FooterTransparent
 * The bottom component showing on mainPage, registerPage, loginPage and forgotPassword.
 * The difference between this and the other footer is that this is transparent, which was better looking with the dedicated background image used on these sites.
 */
class FooterTransparent extends Component {
  render() {  
    return (
        <div>
            <div id="FooterTransparent">
                <a id="FooterTransparentLink" className="navbar-brand" href="#/about"><h5>Om</h5></a>
                <a id="FooterTransparentLink" className="navbar-brand" href="mailto:noreply.harmoni@gmail.com?Subject=Hello%20again">
                    <h5>Kontakt oss</h5></a>
            </div>
        </div>
    )
  }
}

export {FooterTransparent};
export default Footer;