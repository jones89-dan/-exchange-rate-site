// CurrencyTable.js
import React from 'react';
import { Link } from "react-router-dom";

const CurrencyTable = (props) => {
  const { base, rates } = props;
  if (!rates) {
    return null;
  }
  return (
    <table className="table table-sm mt-4 bg-secondary">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col" className="text-right pr-4 py-2 bg-secondary text-white">1.00 {base}</th>
        </tr>
      </thead>
      <tbody class="bg-secondary">
        {rates.map(currency =>
          <tr key={currency.acronym}>
            <td className="pl-4 py-2 text-white"><img src={`/image/${currency.acronym}.png`} alt=""></img>{currency.name} <small>({currency.acronym})</small></td>
            <td className="text-right pr-4 py-2 text-white"><Link to={`/currencyconverter?base=${base}&quote=${currency.acronym}`}>{currency.rate.toFixed(6)}</Link></td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default CurrencyTable
