import React from 'react';
import {LoaderStyle} from './loader-styles';

class Loader extends React.Component {
    render() {
        return (
            <LoaderStyle {...this.props}/>
        )
    }
    static defaultProps = {
        color: '#07d',
        size: '16'
    }
}

export default Loader;

