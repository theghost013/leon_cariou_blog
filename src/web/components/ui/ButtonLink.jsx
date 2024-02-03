import clsx from "clsx"
import Link from "next/link"

const variants = {
  primary: "bg-blue-600 active:bg-blue-700 text-white",
  secondary: "bg-green-600 active:bg-green-700 text-white",
}
const sizes = {
  sm: "px-2 py-1.5 text-lg",
  md: "px-3 py-2 text-xl font-semibold",
}
const ButtonLink = (props) => {
  const { variant = "primary", size = "md", className, ...otherProps } = props

  return (
    <Link
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

export default ButtonLink
