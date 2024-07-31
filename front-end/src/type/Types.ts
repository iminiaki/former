export interface IFAdminValidationBoxPropType {
  value: 'Required' | 'Unique' | 'nonUnique' | 'nonRequired'
}

export interface IFButton {
  value: string
  clickHandler: () => void
}
