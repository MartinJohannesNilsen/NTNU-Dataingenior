import React, {Component} from 'react';
import '../../css/toTop.css';
import $ from 'jquery';

/** 
* @class ToTop
* This method shows a button on the bottom right corner of the screen, in which scrolls to the the top of the screen when pushed.
*/
class ToTop extends Component{
    componentDidMount(){
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <div id="toTopButton">
                <button type="button" className="btn btn-outline-dark btn-light" onClick={() => {$('html, body').animate({scrollTop: '0'}, 1000);}}>➔</button>
            </div>
        );
    }
}

export default ToTop;

//<button type="button" class="btn btn-outline-dark btn-light" onClick={() => {$('html, body').animate({scrollTop: '0'}, 2000);}}>➔</button>