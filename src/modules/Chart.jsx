import React, { useState } from "react";
import { convertData } from "../helper/function";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";

const ChartComponent = (props) => {
  const { data, type } = props;
  return (
    <section>
      <section className="chart">
        <div className="chartGraph">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={400} height={400} data={data}>
              <CartesianGrid stroke="#3b3b3b" strokeWidth={2} />
              <YAxis dataKey={type} domain={["auto", "auto"]} />
       
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={type}
                stroke="#2575ff"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </section>
  );
};

const Chart = (props) => {
  const { setChart, chart } = props;
  const [type, setType] = useState("prices");

  const buttonHandler = (event) => {
    if (event.target.tagName === "BUTTON") {
      const buttonText = event.target.innerText.replace(" ", "_");
      setType(buttonText);
    } 
  };
  return (
    <section className="chartContainer">
      <div onClick={() => setChart(null)} className="closeChart">
        X
      </div>
      <section className="chartContent">
        <ChartComponent data={convertData(chart, type)} type={type} />
        <section className="content_wrapper">
          <div className="content_buttons" onClick={buttonHandler}>
            <button>prices</button>
            <button>market caps</button>
            <button>total volumes</button>
          </div>

          <div className="coin_description">
            <p>Prices: {chart.data.name}</p>
            <p>Ath: {chart.data.ath.toLocaleString()}</p>
            <p>Market Cap: {chart.data.market_cap.toLocaleString()}</p>
          </div>
        </section>
      </section>
    </section>
  );
};

export default Chart;
