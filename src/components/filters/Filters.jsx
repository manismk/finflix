import { useCallback } from "react";
import { videoContextConstant } from "../../constant";
import { useVideos } from "../../context";
import "./filters.css";

const categoryData = [
  { id: "categoryAll", value: "all", labelName: "All" },
  { id: "categoryStocks", value: "stocks", labelName: "Stocks" },
  { id: "categoryCrypto", value: "crypto", labelName: "Crypto" },
  {
    id: "categoryPersonal",
    value: "personal-finance",
    labelName: "Personal Finance",
  },
  { id: "categoryTrading", value: "trading", labelName: "Trading" },
];

const changeHandler = (e, videoDispatch) => {
  videoDispatch({
    type: videoContextConstant.CATEGORY_CHANGE,
    payload: { category: e.target.value },
  });
};

const debounce = (func, delay, videoDispatch) => {
  let timerId;
  return function (...args) {
    const context = this;
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(context, [args[0], videoDispatch]);
    }, delay);
  };
};

const searchHandler = (e, videoDispatch) => {
  videoDispatch({
    type: videoContextConstant.SEARCH_VIDEO,
    payload: { search: e.target.value },
  });
};

export const Filters = () => {
  const { videoState, videoDispatch } = useVideos();
  const optimizedSearch = useCallback(
    debounce(searchHandler, 500, videoDispatch),
    []
  );

  return (
    <div className="filter--container">
      <div className="category--container">
        {categoryData.map(({ id, value, labelName }) => (
          <span key={id}>
            <input
              type="radio"
              id={id}
              className="category--radio"
              name="category"
              value={value}
              checked={videoState.category === value ? true : false}
              onChange={(e) => changeHandler(e, videoDispatch)}
            />
            <label htmlFor={id} className="radio--label">
              {labelName}
            </label>
          </span>
        ))}
      </div>
      <input
        className="search"
        type="text"
        placeholder="search video"
        onChange={optimizedSearch}
      />
    </div>
  );
};
