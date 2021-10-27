// @flow

import React, { Component } from 'react';
import {sakService, sak} from '../Service/service';
import '../../css/Livefeed.css';

type LEProps = {
  id:number,
  title:string,
  date:string
}

class LivefeedElement extends Component<LEProps> {
  render() {
    return (
      <div class="livefeedElement" onClick={() => window.location.href = "#/sak/"+this.props.id}>
        <div class="livefeedTitle">
          <a id="livefeedTitle">{this.props.title}</a>
        </div>
        <div class="date">
          <a class="date" id="livefeedDate">{this.props.date}</a>
        </div>
      </div>
    )
  }
}

type State = {
  nyhetssaker: sak[]
}

type Props = {
}

class Livefeed extends Component<Props, State> {
  constructor(props: void) {
    super(props);
    this.state = {
      nyhetssaker: []
    };
  }
  
  render()  {
    return (
      <div class="livefeed" id="hovedmeny">
        <div class="tickerbox">
          <div class="sisteIkon">
            <h3>SISTE</h3>
          </div>
          <div class="tickerScroll">
            <div class="ticker">
              {this.state.nyhetssaker.slice(0,10).map(sak => (
                <div class="hoverLivefeed">
                  <LivefeedElement id={sak.id} title={sak.overskrift} date={sak.tidspunkt.substring(0,5) + " - " + sak.dato}></LivefeedElement>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount(){
    sakService.getSaker().then(saker => this.setState({nyhetssaker: saker})).catch(error => console.error(error.message));
  }

/*
  componentDidUpdate(prevProps:any){
    if(this.props.location !== prevProps.location){
      sakService.getSaker().then(saker => this.setState({nyhetssaker: saker})).catch(error => console.error(error.message));
    }
  }
*/


}

export default Livefeed;
  
