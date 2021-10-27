// @flow

import React, { Component } from 'react';
import '../../css/Footer.css';

class Footer extends Component<{}> {
  render() {
    return (
        <div class="Footer">
        <footer class="page-footer font-small pt-4">
            <div class="firstBox">
            <div class="container-fluid text-center text-md-left">
                <div class="row">
                    <div class="col-md-6 mt-md-0 mt-3">
                        <h5 class="text-uppercase"> N | M</h5>
                        <p> Ansletlig redaktør: Martin Johannes Nilsen</p>
                        <p> Utviklingsredaktør: Martin Johannes Nilsen</p>
                        <p> Tips oss! Tlf: 502 </p>
                    </div>
                    <hr class="clearfix w-100 d-md-none pb-3"/>
                        <div class="col-md-3 mb-md-0 mb-3">
                            <h5 class="text-uppercase">Kategorier</h5>
                            <ul class="list-unstyled">
                                <li>
                                    <a href="/#/">Nyheter</a>
                                </li>
                                <li>
                                    <a href="/#/kat/Teknologi">Teknologi</a>
                                </li>
                                
                                <li>
                                    <a href="/#/kat/Underholdning">Underholdning</a>
                                </li>
                                <li>
                                    <a href="/#/kat/Økonomi">Økonomi</a>
                                </li>
                                <li>
                                    <a href="/#/kat/Politikk">Politikk</a>
                                </li>
                                <li>
                                    <a href="/#/kat/Sport">Sport</a>
                                </li>
                            </ul>
                        </div>
                    <div class="col-md-3 mb-md-0 mb-3">
                        <h5 class="text-uppercase">Saker</h5>
                        <ul class="list-unstyled">
                        <li>
                            <a href="/#/RegSak">Publiser sak</a>
                        </li>
                        <li>
                            <a href="/#/EndreSak">Endre sak</a>
                        </li>
                        <li>
                            <a href="/#/SlettSak">Slett sak</a>
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
            <div class="secondBox">
            <div class="footer-copyright text-center py-3" >© 2019 Copyright:
                <a> Nilsen Mediahus </a>
            </div>
            </div>
        </footer>
    </div>
    )
  }
}

export default Footer;