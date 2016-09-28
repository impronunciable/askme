
import { h } from 'preact'

export default ({ onTypeChange, type }) => (
  <div class="select">
    <select value={type} onChange={onTypeChange}>
      <option value="TextField">Short Text Answer</option>
      <option value="TextArea">Long Text Answer</option>
      <option value="NumberField">Number</option>
      <option value="MultipleChoice">Multiple Choice</option>
      <option value="EmailField">Email</option>
      <option value="DateField">Date</option>
      <option value="PhoneNumber">Phone</option>
    </select>
  </div>
)
