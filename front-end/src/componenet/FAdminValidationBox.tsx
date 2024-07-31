export const FAdminValidationBox = ({ value = 'Default' }) => {
  return (
    <>
      <span className={'mx-2'}>{value}</span>
      <label className={'flex items-center px-4 required-switch'}>
        <input type={'checkbox'} />
        <span className="required-slider required-round"></span>
      </label>
    </>
  )
}
