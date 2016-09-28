
import { h, Component } from 'preact'

export default class TitleField extends Component {

  constructor (props) {
    super(props)

    this.state = { title: '' }
  }

  render ({}, { title }) {
    return (
      <div class="card">
        <h2>The Title</h2>
        <p>
          The first thing a person ( or a 😺 ) will want to know before filling
          your form is what is this all about.
        </p>
        <p>
          Let's start by adding an informative and appealing title.
        </p>
        <input type="text" placeholder="Form title" onInput={this.linkState('title')} value={title} />
      </div>
    )
  }
}
