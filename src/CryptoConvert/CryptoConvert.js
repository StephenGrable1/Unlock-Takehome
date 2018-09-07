import React from 'react';
import numeral from 'numeral';
import fetch from 'isomorphic-fetch'


import './CryptoConvert.scss';
import swap from './media/swap-icon.png'

class CryptoConvert extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: 0,
            conversion: {
                from: 'ETH',
                to: 'USD'
            },
            currencies: {
                ETH: 1,
                BTC: 0,
                USD: 0,
                JPY: 0,
                EUR: 0,
                GBP: 0,
                CAD: 0,
                CHF: 0,
                AUD: 0,
                CNY: 0,
                SEK: 0,
                NZD: 0,
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.convertSubUnits = this.convertSubUnits.bind(this);
        this.selectFiat = this.selectFiat.bind(this);

    };

    componentDidMount() {
        //fetching the current price of 1 ether in the top 10 most traded currencies
        fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,JPY,EUR,GBP,CAD,CHF,AUD,CNY,SEK,NZD')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    currencies: {
                        BTC: data.BTC,
                        USD: data.USD,
                        JPY: data.JPY,
                        EUR: data.EUR,
                        GBP: data.GBP,
                        CAD: data.CAD,
                        CHF: data.CHF,
                        AUD: data.AUD,
                        CNY: data.CNY,
                        SEK: data.SEK,
                        NZD: data.NZD,
                    }
                });
            });
    };

    handleChange(e) {
        e.preventDefault();
        if (e.target.value < Math.pow(10, 17)) {
            this.setState({ inputValue: e.target.value });
        } else {
            alert('Try choosing a smaller value');
        };
    };

    handleSwitch(e) {
        e.preventDefault();
        const newTo = this.state.conversion.from;
        const newFrom = this.state.conversion.to;

        this.setState({
            conversion: {
                to: newTo,
                from: newFrom
            }
        });
    };

    selectFiat(e) {
        e.preventDefault();
        const from = this.state.conversion.from;
        const to = this.state.conversion.to;
        this.setState({
            conversion: {
                from: from === 'ETH' ? from : e.target.value,
                to: to === 'ETH' ? to : e.target.value
            }
        });
    };

    convertSubUnits(eth) {
        let currAmount = eth.amount;
        let displayAmount;
        let displayUnit;

        const subUnitOrder = ['wei', 'kwei', 'mwei', 'gwei', 'szabo', 'finney', 'ether', 'kether', 'mether', 'gether', 'tether'];
        const subUnits = {
            'wei': Math.pow(10, 18),
            'kwei': Math.pow(10, 15),
            'mwei': Math.pow(10, 12),
            'gwei': Math.pow(10, 9),
            'szabo': Math.pow(10, 6),
            'finney': Math.pow(10, 3),
            'ether': 1,
            'kether': Math.pow(10, -3),
            'mether': Math.pow(10, -6),
            'gether': Math.pow(10, -9),
            'tether': Math.pow(10, -12)
        };

        for (var i = 0; i < subUnitOrder.length; i++) {
            let unit = subUnitOrder[i];
            let conversion = currAmount * subUnits[unit];
            if (conversion < 1000 && conversion > 1) {
                displayAmount = conversion;
                displayUnit = unit;
                return (<p>{numeral(displayAmount).format('0.000') + ' ' + displayUnit}</p>);
            };
        };
    };

    render() {
        var renderConversion = () => {
            const from = this.state.conversion.from;
            const to = this.state.conversion.to;
            const amount = this.state.inputValue;
            const newConversion = this.state.inputValue / this.state.currencies[this.state.conversion.from]

            if (from === 'ETH') {
                return (
                    <div>{numeral(amount * this.state.currencies[to]).format('0,0.00') + ' ' + this.state.conversion.to}</div>
                );
            };

            if (to === 'ETH') {
                return (
                    <div>
                        {newConversion ? this.convertSubUnits({ amount: newConversion, unit: 'ether' }) : 0 + ' ether'}
                    </div>
                );
            };
        };

        var renderFiatSelect = (type) => {
            return (
                <select className="select-fiat" onChange={this.selectFiat} value={this.state.conversion[type]}>
                    {renderFiatOptions()}
                </select>
            );
        };

        var renderFiatOptions = () => {
            let options = [];
            for (let key in this.state.currencies) {
                options.push(<option key={key} value={key}>{key}</option>)
            }
            return (options);
        }

        return (
            <div>
                <div className="switch-button" onClick={this.handleSwitch}><img src={swap}/></div>

                <div className="conversion-container">
                    <div className="from-container">
                        <div className="from-title">From: {this.state.conversion.from !== 'ETH' ? renderFiatSelect('from') : this.state.conversion.from}</div>
                        <input className="number-input" name="number-conv" type="number" value={this.state.inputValue} onChange={this.handleChange} />
                    </div>

                    <div className="to-container">
                        <div className="to-title">To: {this.state.conversion.to !== 'ETH' ? renderFiatSelect('to') : this.state.conversion.to}</div>
                        {renderConversion()}
                    </div>
                </div>

            </div>
        );
    }
}

export default CryptoConvert;