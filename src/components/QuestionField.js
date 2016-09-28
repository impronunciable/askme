
import { h, Component } from 'preact'
import QuestionTypesDropdown from 'components/QuestionTypesDropdown'
import TextField from 'components/TextField'
import TextAreaField from 'components/TextAreaField'
import MultipleChoiceField from 'components/MultipleChoiceField'
import QuestionFooter from 'components/QuestionFooter'
import inferQuestionType from 'services/inferQuestionType'

export default class QuestionField extends Component {
  constructor (props) {
    super(props)

    this.state = {
      question: {
        title: '',
        description: '',
        props: {},
        type: 'TextField',
        options: ['First option', 'Second option']
      }
    }

    this.cardTitle = getCardTitle(props.isFirst)
    this.cardDescription = getCardDescription(props.isFirst)
  }

  onChange (key, e) {
    const val = e.target.value
    const question = Object.assign({}, this.state.question)
    question[key] = val

    if (key === 'title' && !question.dirty) {
      question['type'] = inferQuestionType(val)
    }

    question['dirty'] = key === 'type' ? true : question.dirty
    this.setState({ question })
  }

  render ({ isFirst, isLast, onAddQuestion, onPublish, onChange }, { question }) {
    return (
      <div class="card">
        <h2>{this.cardTitle}</h2>
        <p>{this.cardDescription}</p>
        <input type="text" placeholder="Question title" value={question.title}
          onInput={this.onChange.bind(this, 'title')} />
        <textarea placeholder="Question description" value={question.description}
          onInput={this.onChange.bind(this, 'description')} />
        { question.type === 'MultipleChoice' ? <ChoiceEditor onChange={this.onChange.bind(this, 'options')} /> : null }
        <h3>Question preview</h3>
        {renderQuestionPreview(question)}
        { isFirst ? (
          <p>
            We tried to infer the best interface for asking the question but we
            can be wrong so you can manually select the question type
          </p>) : null
        }
        <QuestionTypesDropdown type={question.type} onTypeChange={this.onChange.bind(this, 'type')} />
        { isLast ? <QuestionFooter onAddQuestion={onAddQuestion} onPublish={onPublish} /> : null }
      </div>
    )
  }
}

const ChoiceEditor = ({ onChange, options }) => (
  <div>
    <h3>Write down the question options</h3>
    <textarea onInput={e =>onChange({ target: { value: e.target.value.split('\n').filter(l => l.length)}}) }>
{`First option
Second option`}
    </textarea>
  </div>
)

const renderQuestionPreview = question => {
  switch (question.type) {
    case 'EmailField':
      return <TextField type='email' />
    case 'NumberField':
      return <TextField type='number' />
    case 'DateField':
      return <TextField type='date' />
    case 'PhoneNumber':
      return <TextField type='tel' />
    case 'TextArea':
      return <TextAreaField />
    case 'MultipleChoice':
      return <MultipleChoiceField options={question.options} />
    case 'TextField':
    default:
      return <TextField type='text' />
  }
}

const getCardTitle = isFirst => {
  const titles = ['a new', 'another', 'add another', 'ask a new']

  if (isFirst) {
    return 'Your first question'
  } else {
    return `${titles[Math.floor(Math.random() * titles.length)]} question`
  }
}

const getCardDescription = isFirst => {
  const descriptions = [
    'Just apply what you learned from the previous questions',
    'You can do it one more time',
    'This is looking good!',
    '📝 ？']

  if (isFirst) {
    return `A question needs context. Providing a title and description for your questions will help your users
    to understand better what you need. You don't need a sexy title here, try to be clear on your needs.`
  } else {
    return descriptions[Math.floor(Math.random() * descriptions.length)]
  }
}
