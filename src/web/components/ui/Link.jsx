import NextLink from "next/link"

const Link = (props) => {
  const { ...otherProps } = props

  return <NextLink {...otherProps} />
}

export default Link
