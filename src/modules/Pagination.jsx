import React from "react";

const Pagination = ({ page, setPage }) => {
  const nextHandler = () => {
    page <= 9 ? setPage((page) => page + 1) : page;
  };

  const previousHandler = () => {
    page > 1 ? setPage((page) => page - 1) : page;
  };

  return (
    <section className="paginationContainer">
      <div className="paginate_activated cursor-pointer" onClick={previousHandler}>previous</div>
      <div className={page === 1 ? "paginate_activated" : ""}>1</div>
      <div className={page === 2 ? "paginate_activated" : ""}>2</div>
      {
          page > 2 && page <9 &&
          <section className="flex gap-3  items-center">
            <span>...</span>
            <div className="paginate_border paginate_activated">{page}</div>
        </section>
      }
      {/* <div>1</div>
        */}
        
        <span >...</span>
        <div className={page === 9? "paginate_activated" : ""}>9</div>
      <div className={page === 10 ? "paginate_activated" : ""}>10</div>
      <div className="paginate_activated cursor-pointer" onClick={nextHandler}>next</div>
    </section>
  );
};

export default Pagination;
