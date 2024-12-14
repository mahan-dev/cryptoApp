import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { searchCoin } from "../services/api";
import Loader from "../Loader/Loader";

const SearchBox = (props) => {
  const { setCurrency } = props;
  const [search, setSearch] = useState("");

  const { isFetching, isLoading, data } = useQuery({
    queryKey: ["search_coin", search],
    queryFn: () => searchCoin(search),
    enabled: !!search,
  });

  const coins = data?.data.coins || [];

  const currencyHandler = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <section className=" relative my-6 w-fit">
      <input
        className="rounded-lg mr-4 p-2 text-black"
        onChange={(e) => setSearch(e.target.value)}
        type="text"
      />

      <select
        className="text-black p-2 cursor-pointer rounded-lg"
        name=""
        id=""
        onChange={currencyHandler}
      >
        <option value="usd">usd</option>
        <option value="eur">eur</option>
        <option value="jpy">jpy</option>
      </select>

      {(coins.length > 0 || search) && (
        <div className="box_list">
          {isFetching || isLoading ? (
            <div className="flex justify-center">
              <Loader />
            </div>
          ) : coins.length > 0 ? (
            <ul>
              {coins.map((coin) => (
                <li className="search_list" key={coin.id}>
                  <img src={coin.large} alt="" width={30} />
                  <p>{coin.name}</p>
                </li>
              ))}
            </ul>
          ) : (
            search && <div className="text-center"> notFound </div>
          )}
        </div>
      )}
    </section>
  );
};

export default SearchBox;
