export const FAdminValidationBox = ({ value = 'Default' }) => {
  return (
    <>
      <span className={'mx-2'}>{value}</span>
      <input type={'checkbox'} />
    </>
  )
}
