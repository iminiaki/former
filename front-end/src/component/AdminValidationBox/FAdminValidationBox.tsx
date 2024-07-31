import styles from './FAdminValidationBox.module.css'
import { IFAdminValidationBoxPropType } from '../../type/Types.ts'

export const FAdminValidationBox = ({
  value,
}: IFAdminValidationBoxPropType) => {
  return (
    <>
      <span className={'mx-2'}>{value}</span>
      <label className={`flex items-center px-4 ${styles.requiredSwitch}`}>
        <input type={'checkbox'} />
        <span
          className={`${styles.requiredRound} ${styles.requiredSlider}`}
        ></span>
      </label>
    </>
  )
}
