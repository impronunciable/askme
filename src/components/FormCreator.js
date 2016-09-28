
import 'whatwg-fetch';
import { h, Component } from 'preact'
import Intro from 'components/Intro'
import QuestionFields from 'components/QuestionFields'
import TitleField from 'components/TitleField'
import DescriptionField from 'components/DescriptionField'
import FinishedCard from 'components/FinishedCard'
import { createFormStructure } from 'services/form'
import config from 'config'


export default class FormCreator extends Component {
  constructor (props) {
    super(props)

    this.state = { submitted: false, finished: false, title: '', description: '', url: '', id: ''}
    this.onPublish = this.onPublish.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)
    this._refs = {}
  }

  onPublish (questions) {
    const { title, description } = this._refs
    this.setState({ submitted: true  })

    const data = createFormStructure(title.state.title, description.state.description, questions)

    fetch(`${config.elkHornBaseUrl}/create`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(res => res.json())
    .then(data => {
      this.setState({ finished: true, url: data.urls.iframe, id: data.data.id })
    })
  }

  onDescriptionChange (description) {
    this.setState({ description })
  }

  onTitleChange (e) {
    this.setState({ title: e.target.value })
  }

  render (props, { submitted, finished, title, description, url, id }) {
    return (
      <div class="form-creator">
        {!submitted ? (
          <div>
            <Intro />
            <TitleField ref={titleRef => this._refs.title = titleRef} />
            <DescriptionField ref={descRef => this._refs.description = descRef} />
            <QuestionFields onPublish={this.onPublish} />
          </div>
        ) : <FinishedCard finished={finished} url={url} id={id} />
        }
      </div>
    )
  }
}
