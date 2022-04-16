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

export const Filters = () => {
  const { videoState, videoDispatch } = useVideos();
  return (
    <div className="category--container m-t-1 m-b-2">
      <p>Category</p>
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
  );
};
