
import { h, Component } from 'preact'
import QuestionField from 'components/QuestionField'
import FinishedCard from 'components/FinishedCard'

export default class QuestionFields extends Component {

  constructor (props) {
    super(props)

    this.state = {
      questions: 1
    }

    this.onAddQuestion = this.onAddQuestion.bind(this)
    this.onPublish = this.onPublish.bind(this)
    this._fieldRefs = []
  }

  onAddQuestion () {
    this.setState({
      questions: this.state.questions + 1
    })
  }

  onPublish () {
    const data = this._fieldRefs.map(field => field.state.question)
    this.props.onPublish(data)
  }

  render ({ onPublish }, { questions, finished }) {
    const Fields = []
    for (let i = 0; i < questions; i++) {
      Fields.push(<QuestionField key={i}
        isFirst={!i} isLast={i === questions - 1}
        onPublish={this.onPublish}
        ref={fieldWrapper => this._fieldRefs[i] = fieldWrapper}
        onAddQuestion={this.onAddQuestion} />)
    }

    return <div>{Fields}</div>
  }
}
