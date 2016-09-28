
import { h, Component } from 'preact'

export default class DescriptionField extends Component {

  constructor (props) {
    super(props)

    this.state = { what: '', why: '', how: '', description: '', dirty: false }
    this.onQuestionChange = this.onQuestionChange.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
  }

  onDescriptionChange (e) {
    this.setState({
      dirty: true,
      description: e.target.value
    })
  }

  onQuestionChange (type, value) {
    this.setState({
      [type]: value
    })

    this.setState({
      description: this.state.dirty ? this.state.description
        : [this.state.what, this.state.why, this.state.how].join('\n')
    })
  }

  render ({}, { what, why, how, description }) {
    return (
      <div class="card">
        <h2>The Description</h2>
        <p>
          After your readers agreed to continue with your questionnaire is important
          to let them know about some aspect keys
        </p>
        <ul>
          <li><strong>What</strong> is this really about <input class="small" type="text"
            placeholder="Tell us your story on..." value={what} onInput={e => this.onQuestionChange('what', e.target.value)} />
          </li>
          <li><strong>Why</strong> are you asking this specific questions <input class="small" type="text"
            placeholder="We want to know more about what you think because..." value={why} onInput={e => this.onQuestionChange('why', e.target.value)} />
          </li>
          <li><strong>How</strong> are the answers going to be used <input class="small" type="text"
            placeholder="We will be anonymizing and aggregating the answers..." value={how} oninput={e => this.onQuestionChange('how', e.target.value)} />
          </li>
        </ul>
        <textarea value={description} onInput={this.onDescriptionChange} />
      </div>
    )
  }
}
