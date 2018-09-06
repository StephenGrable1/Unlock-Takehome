import React from 'react';

import CryptoConvert from '../CryptoConvert/CryptoConvert';
import './App.scss';

class App extends React.Component {
    render() {
        return (
            <div className="app-container">
                <h3 className="app-title">Crypto Converter</h3>
                <CryptoConvert />
            </div>
        );
    }
}

export default App;