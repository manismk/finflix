import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export const InputPasswordBox = ({
  error,
  labelName,
  id,
  value,
  changeHandler,
}) => {
  const [passwordShown, setPasswordShown] = useState(false);
  return (
    <div
      className={`input--container input--${
        error.length ? "error" : "primary"
      } m-t-2`}
    >
      <label htmlFor={id} className="input--label">
        {labelName}
      </label>
      <input
        type={`${passwordShown ? "text" : "password"}`}
        id={id}
        className="input"
        placeholder="********"
        value={value}
        onChange={changeHandler}
      />
      <button
        className="btn icon--btn"
        onClick={() => {
          setPasswordShown((prev) => !prev);
        }}
      >
        {passwordShown ? <Visibility /> : <VisibilityOff />}
      </button>
      <span className="input--error--message">{error}</span>
    </div>
  );
};
