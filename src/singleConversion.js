import React from 'react';
import {Chart} from 'chart.js';
import currencies from './utils/currencies';
import { checkStatus, json } from './utils/fetchUtils';
import CurrencyConverter from './CurrencyConverter';

class SingleConversion extends React.Component {

  constructor(props) {
    super(props);

    const params = new URLSearchParams(props.location.search);

    this.state = {
      rate: 0,
      baseAcronym: params.get('base') || 'USD',
      baseValue: 0,
      quoteAcronym: params.get('quote') || 'JPY',
      quoteValue: 0,
      loading: false,
    };

    this.chartRef = React.createRef();
  }

  getRate = (base, quote) => {
    this.setState({ loading: true });
    fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${base}&to=${quote}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }

        const rate = data.rates[quote];

        this.setState({
          rate,
          baseValue: 1,
          quoteValue: Number((1 * rate).toFixed(3)),
          loading: false,
        });
      })
      .catch(error => console.error(error.message));
  }

render() {

    const { rate, baseAcronym, baseValue, quoteAcronym, quoteValue, loading } = this.state;
  const currencyOptions = Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>);

  return (
    <React.Fragment>
      <div className="text-center p-3">
        <h2 className="mb-2">Currency Converter</h2>
        <h4>1 {baseAcronym} to 1 {quoteAcronym} = {rate.toFixed(4)} {currencies[quoteAcronym].name}</h4>
      </div>
      <form className="form-row p-3 mb-4 bg-light justify-content-center">
        <div className="form-group col-md-5 mb-0">
          <select value={baseAcronym} onChange={this.changeBaseAcronym} className="form-control form-control-lg mb-2" disabled={loading}>
            {currencyOptions}
          </select>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">{currencies[baseAcronym].symbol}</div>
            </div>
            <input id="base" className="form-control form-control-lg" value={baseValue} onChange={this.changeBaseValue} type="number" />
          </div>
          <small className="text-secondary">{currencies[baseAcronym].name}</small>
        </div>
        <div className="col-md-2 py-3 d-flex justify-content-center align-items-center">
          <h3>=</h3>
        </div>
        <div className="form-group col-md-5 mb-0">
          <select value={quoteAcronym} onChange={this.changeQuoteAcronym} className="form-control form-control-lg mb-2" disabled={loading}>
            {currencyOptions}
          </select>
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">{currencies[quoteAcronym].symbol}</div>
            </div>
            <input id="quote" className="form-control form-control-lg" value={quoteValue} onChange={this.changeQuoteValue} type="number" />
          </div>
          <small className="text-secondary">{currencies[quoteAcronym].name}</small>
        </div>
      </form>
      <canvas ref={this.chartRef} />
    </React.Fragment>
  )
}
}


export default SingleConversion
