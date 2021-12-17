import React from 'react';
import { json, checkStatus } from './utils';
//import './Base.css';
//import Currency from './Currency';
//import Group from './Group';

class Base extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        baseCurrencyCode: 'EUR',
        latestFetchJson: '',
      };
      this.handleCallback = this.handleCallback.bind(this);
    }

    componentDidMount () {
      fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${this.state.baseCurrencyCode}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        if (data) {
          this.setState({ latestFetchJson: data})
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      })
    }

    handleCallback = (childData) => {
      this.setState({ baseCurrencyCode: childData });
      fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${childData}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        if (data) {
          this.setState({ latestFetchJson: data})
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.log(error);
      })
    }

    render() {
      return (
        <div className="base-container">
          <div className="base-head">

          </div>
          <div className="inner-footer">
            <div className="inner-element copyright">
              <i>copyright &copy; 2021</i>
            </div>
            <div className="inner-element authorship">

            </div>
            <div className="contact">
              <a href="https://github.com/jones89-dan7"><i className="fab fa-github"></i></a>
            </div>
          </div>
        </div>
      )
    }
  }

export { Base };
