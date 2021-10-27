import React, {Component} from 'react';
import './Livefeed.css';

class LivefeedElement extends Component {
  render() {
    return (
      <div class="livefeedElement">
        <h1 class="title">{this.props.title}</h1>
        <h1 class="date">{this.props.date}</h1>
      </div>
    )
  }
}

var nyhetssaker = [
  {  title: 'SISTE: Litt diskutable kilder for ny forskning om kaffe', date: '22.10.19' },
  {  title: 'Schau fører Vålerenga til topps i 2.divisjon', date: '02.08.21' },
  {  title: 'Liahagen ny i lederstilling', date: '12.04.28' },
  {  title: 'Live nå: Høyanger på vei mot storbystatus', date: '12.06.2128' },
  {  title: 'Juletorget er en braksuksess', date: '08.12.20' },
  {  title: 'FFK til topps i tippeligaen', date: '08.08.21' }
]


class Livefeed extends Component {
    render()  {
      return (
        <div>
          <div class="ticker">
            {nyhetssaker.map(sak => (
              <div>
                <LivefeedElement title={sak.title} date={sak.date}></LivefeedElement>
              </div>
            ))}
          </div>
        </div>
      )
    }
  }
  
  const NoeCSS = {
    background: '#fff',
    color: 'red'
  }

  export default Livefeed;
  
