export const FIcon = ({ src, alt, clickHandler }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={'w-5 mx-2 my-4'}
      onClick={clickHandler}
    />
  )
}
