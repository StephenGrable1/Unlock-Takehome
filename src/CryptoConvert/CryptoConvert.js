import React from 'react';

import './CryptoConvert.scss';

class CryptoConvert extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: 1,
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
                GDP: 0,
                CAD: 0,
                CHF: 0,
                AUD: 0,
                CNY: 0,
                SEK: 0,
                NZD: 0,
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
    }

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
                        GDP: data.GDP,
                        CAD: data.CAD,
                        CHF: data.CHF,
                        AUD: data.AUD,
                        CNY: data.CNY,
                        SEK: data.SEK,
                        NZD: data.NZD,
                    }
                })
            })
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    handleChange(e){
        e.preventDefault();
        this.setState({inputValue: e.target.value})
    }

    handleSwitch(e){
        e.preventDefault();
        const newTo = this.state.conversion.from;
        const newFrom = this.state.conversion.to;

        this.setState({conversion: {
            to: newTo,
            from: newFrom
        }})
    }

    

    render() {
        var renderConversion = () => {
            const from = this.state.conversion.from;
            const to = this.state.conversion.to;
            const amount = this.state.inputValue;
            if (from === 'ETH'){
                return (
                    <div>{amount * this.state.currencies[to]}</div>
                )
            }

            if (from !== 'ETH'){
                return (
                    <div>{amount / this.state.currencies[from]}</div>
                )
            }
        }
        return (
            <div>
                <h3>This app is ready!</h3>
                From: {this.state.conversion.from}
                <input type="number" value={this.state.inputValue} onChange={this.handleChange} min="10" max="100" />
                <p>To: {this.state.conversion.to}</p>
                <p>{this.state.etherUSD} </p>
                {renderConversion()}
                <div onClick={this.handleSwitch}>Switch</div>
            </div>
        );
    }
}

export default CryptoConvert;