import clsx from "clsx"

const variants = {
  primary: "bg-blue-600 active:bg-sky-700 text-white rounded-md my-2",
  delete: "bg-red-600 active:bg-red-700 text-white roundend-md",
}
const sizes = {
  sm: "px-2 py-1.5 text-lg",
  md: "px-3 py-2 text-xl font-semibold",
}
const Button = (props) => {
  const {
    as: Component = "button",
    variant = "primary",
    size = "md",
    className,
    ...otherProps
  } = props

  return (
    <Component
      className={clsx(
        "disabled:bg-gray-400",
        variants[variant],
        sizes[size],
        className,
      )}
      {...otherProps}
    />
  )
}

export default Button
