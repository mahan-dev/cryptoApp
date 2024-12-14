import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getCoinChart } from "../services/api";
import chartUp from "../assets/chart-up.svg";
import chartDown from "../assets/chart-down.svg";

import FilledStar from "../assets/tableIcons/filledStar.svg";
import EmptyStar from "../assets/tableIcons/emptyStar.svg";
import Favorite from "../pages/Favorite";

const TableRow = ({ data, setChart }) => {

  const [star, setStar] = useState(() => {
    const starDb = localStorage.getItem("star");
    return starDb ? JSON.parse(starDb) : [];
  });

  const {
    id,
    name,
    current_price,
    symbol,
    image,
    market_cap_change_percentage_24h: priceChange,
    total_volume,
  } = data;

  const showChartHandler = async () => {
    try {
      const dataCoins = await getCoinChart(id);
      dataCoins?.data ? setChart({ ...dataCoins.data, data }) : setChart(null);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const [whishList, setWhishList] = useState(() => {
    const coinListDb = localStorage.getItem("whishList");
    return coinListDb ? JSON.parse(coinListDb) : [];
  });

  const addHandler = () => {
    const existItem = whishList.find((item) => item.name === name);

    if (existItem) return ;
    if (!existItem) {
      const updateCoin = {
        name,
        symbol,
        image,
        id,
        star: true,
      };

      saveToLocalStorage(updateCoin);
    }
    const checkStar = star?.find((item) => item.id === id);
    if (checkStar) {
      removeStar(id);
    }
    if (!checkStar) {
      const updateStar = {
        id: id,
        star: true,
      };

      SaveStar(updateStar);
    }
  };

  //! mange saving Items to localStorage

  const saveToLocalStorage = (item) => {
    const coinListsDb = JSON.parse(localStorage.getItem("whishList")) || [];
    coinListsDb.push(item);
    localStorage.setItem("whishList", JSON.stringify(coinListsDb));
    setWhishList(coinListsDb);
  };

  const SaveStar = (star) => {
    const starDb = JSON.parse(localStorage.getItem("star")) || [];
    starDb.push(star);
    localStorage.setItem("star", JSON.stringify(star));
    setStar(starDb);
  };

  const removeStar = (itemId) => {
    const getStarDb = JSON.parse(localStorage.getItem("star"));

    const removeItem = getStarDb.filter(
      (removeItem) => removeItem.id !== itemId
    );

    localStorage.setItem("star", JSON.stringify(removeItem));

    setStar(removeItem);

    const getWhishDb = JSON.parse(localStorage.getItem("whishList"));
    const removeW = getWhishDb.filter((getWhishDb) => getWhishDb.id !== itemId);
    localStorage.setItem("whishList", JSON.stringify(removeW));
    setWhishList(removeW);
  };

  //! mange saving Items to localStorage

  useEffect(() => {
    setStar(JSON.parse(localStorage.getItem("star")));
  }, []);

  useEffect(() => {
    localStorage.setItem("whishList", JSON.stringify(whishList));
    localStorage.setItem("star", JSON.stringify(star));
  }, [whishList, star]);

  return (
    <tr className="tableRow_data">
      <td
        onClick={showChartHandler}
        className="flex cursor-pointer py-4 items-center gap-2 max-sm:pr-[2rem] max-lg:pr-[1rem] max-md "
      >
        <img src={image} alt="" width={30} />
        <p>{name.split(" ", 1)}</p>
      </td>
      <td>{symbol}</td>
      <td>
        {current_price > 1 ? current_price.toLocaleString() : current_price}
      </td>
      <td className={priceChange > 0 ? "text-green-500" : "text-red-500"}>
        {`${priceChange.toFixed(2)}%`}
      </td>
      <td className="max-sm:hidden">{`${total_volume.toLocaleString()}$`}</td>
      <td className="chart_wrapper mr-3 max-md:hidden">
        <img src={priceChange > 0 ? chartUp : chartDown} alt="" />
      </td>
      <td>
        <button className="block w-[20px] max-md:hidden" onClick={addHandler}>
          {star?.find((item) => item.id === id) ? (
            <img
              src={
                star?.find((item) => item.id === id).star
                  ? FilledStar
                  : EmptyStar
              }
              alt=""
            />
          ) : (
            <img src={EmptyStar} alt="" />
          )}
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
