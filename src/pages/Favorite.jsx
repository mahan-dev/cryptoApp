import React, { useEffect, useState } from "react";
import minus from "../assets/component_favorite_icons/circle-minus.svg";

const Favorite = () => {
  const [whishList, setWhishList] = useState(() => {
    const data = localStorage.getItem("whishList");
    return data ? JSON.parse(data) : [];
  });

  const [star, setStar] = useState(() => {
    const data = localStorage.getItem("star");
    return data ? JSON.parse(data) : [];
  });

  const data = JSON.parse(localStorage.getItem("whishList")) || [];
  const starDb = JSON.parse(localStorage.getItem("star")) || [];

  const removeHandler = (id) => {
    const removeItem = data.filter((coin) => coin.id !== id);
    localStorage.setItem("whishList", JSON.stringify(removeItem));
    setWhishList(removeItem);

    const removeStar = starDb.filter((coin) => coin.id !== id);
    localStorage.setItem("star", JSON.stringify(removeStar));
    setStar(removeItem);
  };

  useEffect(() => {
    setWhishList(JSON.parse(localStorage.getItem("whishList")));
    setStar(JSON.parse(localStorage.getItem("star")));
  }, []);

  useEffect(() => {}, [whishList, star]);

  return (
    <div className="favorite_wrapper">
      <h3 className="text-2xl font-medium bg-slate-800 w-full p-3 rounded-lg mb-6 ">
        
        favorite Coins
      </h3>
      {whishList.map((coin) => (
        <section className="favorite_list_container" key={coin.name}>
          <div className="flex items-center gap-3">
            <img src={coin?.image} width={40} alt="" />
            <p> {coin.name} </p>
            <p> {coin.symbol} </p>
          </div>
          <button
            className="hover:opacity-50 transition-all"
            onClick={() => removeHandler(coin.id)}
          >
            
            <img src={minus} alt="minus" width={20} />{" "}
          </button>
        </section>
      ))}
      {
        !whishList.length > 0 && <div className="font-medium text-[1.2rem]">no thing to show</div>
      }
    </div>
  );
};

export default Favorite;
