import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getMarketApi } from "../services/api";
import TableCoin from "../templates/TableCoin";
import SearchBox from "../templates/SearchBox";
import Pagination from "../modules/Pagination";
import Chart from "../modules/Chart";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import Loader from "../Loader/Loader";

const Home = () => {
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);
  const [page, setPage] = useState(1);

  const { data, isFetching } = useQuery({
    queryKey: ["getDataMarket", currency, page],
    queryFn: () => getMarketApi(currency, page),
  });

  return (
    <section>
      <section className="flex flex-col w-full px-4 text-white max-sm:px-2">
        <Header />
        {isFetching ? (
          <Loader />
        ) : (
          <section className="search_tableCoin_wrapper">
            <SearchBox setCurrency={setCurrency} />
            <TableCoin
              data={data}
              setChart={setChart}
              isFetching={isFetching}
            />
          </section>
        )}

        <Pagination page={page} setPage={setPage} />
        {!!chart && <Chart setChart={setChart} chart={chart} />}
        <Footer />
      </section>
    </section>
  );
};

export default Home;
