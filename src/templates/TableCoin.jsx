import React from "react";
import TableRow from "./TableRow";
import Loader from "../Loader/Loader";

const TableCoin = (props) => {
  const { data, isFetching, setChart } = props;
  const coins = data?.data || [];
  if (isFetching) return <Loader />;
  return (
    <table className="table_coin">
      <thead>
        <tr className="table_title">
          <th className="w-[200px] ">Coin</th>
          <th className="w-[200px] max-sm:pr-2 ">Name</th>
          <th className="w-[200px] ">price</th>
          <th className="w-[200px] ">24h</th>
          <th className="w-[200px] max-sm:hidden">Total Volume</th>
        </tr>
      </thead>
      <tbody className="">
        {
            coins.length > 0 ? 

            coins.map((coin) => (
                <TableRow key={coin.id} data={coin} setChart={setChart} />
            )) : (<section>
                error happened
            </section>)
        }
      </tbody>
    </table>
  );
};

export default TableCoin;
