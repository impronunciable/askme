
import { h } from 'preact'

export default ({ type }) => (
  <input placeholder={type[0].toUpperCase() + type.slice(1)} type={type} />
)
