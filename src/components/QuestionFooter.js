
import { h } from 'preact'

export default ({ onAddQuestion, onPublish }) => (
  <div class="card-footer">
    <button onClick={onAddQuestion} class="btn large primary">Add another question</button>
    <button onClick={onPublish} class="btn large">Publish the form</button>
  </div>
)
