import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css"

function Dashboard() {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    axios
      .get("/crypto")
      .then((res) => setCryptoData(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="dashboard">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Platform</th>
            <th>Last Traded Price</th>
            <th>Buy/Sell Price</th>
            <th>Difference</th>
            <th>Savings</th>
          </tr>
        </thead>

        <tbody>
          {cryptoData.map((val, key) => {
            function toIndianCurrency(num) {
              const curr = num.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
              return curr;
            }
            // let diff = (((val.buy - val.sell)/val.buy)*100).toFixed(2);
            const diff = ((val.sell - val.buy) /Math.abs(val.buy)) * 100;
            const diffClass = diff < 0 ? "negative" : "positive";
            return (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{val.name}</td>
                <td>{toIndianCurrency(val.last) }</td>
                <td>{toIndianCurrency(val.buy)}/{toIndianCurrency(val.sell)}</td>
                <td className={diffClass}>{diff? diff.toFixed(2):0}%</td>
                <td>{toIndianCurrency(val.volume)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
