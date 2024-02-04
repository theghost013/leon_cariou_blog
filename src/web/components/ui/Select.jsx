import clsx from "clsx"

const Select = ({ options, value, className, ...otherProps }) => (
  <select
    value={value}
    className={clsx("border-2 p-2", className)}
    {...otherProps}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
)

export default Select
