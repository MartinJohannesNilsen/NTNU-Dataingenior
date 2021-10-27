// @flow

import React, {Component} from 'react';
import '../../css/ToTop.css';

type Props = {}

class ToTop extends Component<Props> {
    render() {
        return (
            <div id="toTopButton">
                <button type="button" class="btn btn-info" onClick={() => window.scrollTo(0, 0)}>➔</button>
            </div>
        );
    }
}

export default ToTop;