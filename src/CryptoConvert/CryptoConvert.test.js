import React from 'react';
import ReactDOM from 'react-dom';

import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { configure, shallow } from 'enzyme';

import CryptoConvert from './CryptoConvert.js';

describe('Crypto App', () => {
    it('should render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CryptoConvert />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should render a number input', () => {
        expect(shallow(<CryptoConvert />).find('.number-input').length).toEqual(1)
    })

    it('should respond to change event on input number and change the state of the Component', () => {
        const App = shallow(<CryptoConvert />);
        App.find('.number-input').simulate('change', { preventDefault() { }, target: { name: 'number-conv', value: 12345 } });

        expect(App.state('inputValue')).toEqual(12345);
    })

    it('should respond to change event on selecting fiat currency and change the state of the Component', () => {
        const App = shallow(<CryptoConvert />);
        App.state().conversion.from = 'ETH';
        App.state().conversion.to = 'USD'
        App.find('select').simulate('change', { preventDefault() { }, target: { value: 'CAD' } });

        expect(App.state().conversion.to).toEqual('CAD');
    })

    it('should switch the fiat currency with ether when user clicks the switch button', () => {
        const App = shallow(
            <CryptoConvert />
        );
        const buttonElement = App.find('.switch-button');

        App.state().conversion.to = 'ETH';
        App.state().conversion.from = 'USD';

        expect(App.state().conversion.to).toEqual('ETH');
        buttonElement.simulate('click', { preventDefault() { } });
        //clicking once should switch currency
        expect(App.state().conversion.from).toEqual('ETH');
        expect(App.state().conversion.to).toEqual('USD');
    });
});
