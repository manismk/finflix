export const InputTextBox = ({
  error,
  labelName,
  id,
  changeHandler,
  value,
  type,
  placeHolder,
}) => {
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
        type={type}
        id={id}
        className="input"
        placeholder={placeHolder}
        value={value}
        onChange={changeHandler}
      />
      <span className="input--error--message">{error}</span>
    </div>
  );
};
