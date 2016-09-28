
export default str => {
  if (/e-?mail/gi.test(str)) {
    return 'EmailField'
  } else if (/age|how many|how old/gi.test(str)) {
    return 'NumberField'
  } else if (/^when/gi.test(str)) {
    return 'DateField'
  } else if (/^which/gi.test(str)) {
    return 'MultipleChoice'
  } else if (/\?.*\?/gi.test(str)) {
    return 'TextArea'
  } else if (/phone/gi.test(str)) {
    return 'PhoneNumber'
  } else {
    return 'TextField'
  }
}
