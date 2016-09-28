
const defaultForm = {
  target: '#ask-form',
  theme: {
    headerBackground: '#FFFFFF',
    headerText: '#222222',
    headerIntroText: '#444444',
    formBackground: '#FFFFFF',
    footerBackground: '#FFFFFF',
    requiredAsterisk: '#939393',
    inputBackground: '#FFFFFF',
    inputText: '#222222',
    footerText: '#222222',
    fieldTitleText: '#222222',
    progressBar: '#44AA44',
    progressBarBackground: '#CCCCCC',
    submitButtonBackground: '#F67D6E',
    submitButtonText: '#FFFFFF',
    selectedItemBackground: '#2E343B',
    selectedItemText: '#FAFAFA'
  },
  settings: {
    saveDestination: 'https://coralproject.net',
    showFieldNumbers: true,
    inactiveMessage: 'We are not currently accepting submissions. Thank you.',
    recaptcha: false,
    baseUrl: ''
  },
  header: {
    title: '',
    description: '',
    heading: ''
  },
  footer: {
    conditions: ''
  },
  finishedScreen: {
    title: 'Thanks.',
    description: 'Thank you for helping us with our journalism. We read all submissions, and will be in touch if we have any more questions.'
  },
  steps: [{
    id: '1',
    name: 'first_page'
  }],
  status: 'closed'
};

export const createFormStructure = (title='Untitled Form', description='', questions=[]) =>
Object.assign({}, defaultForm, {
  header: {
    title,
    description,
    heading: title
  },
  status: 'open',
  steps: [{
    createdAt: Date.now(),
    id: Math.floor(Math.random() * 9999) + '',
    name: 'first step',
    widgets: questions.map(question => {
      if (question.type === 'MultipleChoice') {
        var opts = question.options.map(opt => ({ title: opt, placeholder: false }))
        question.props.options = opts
      }
      question.options = undefined

      const type = question.type
      question.component = type
      question.type = 'field'

      question.friendlyType = 'Short Answer'
      question.id = Math.floor(Math.random() * 123123123) + ''
      question.identity = false
      question.wrapper = {}

      return question
    })
  }]
})
