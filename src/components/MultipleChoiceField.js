
import { h } from 'preact'

export default ({ options }) => (
  <ul style={styles.container}>
    {options.map(option => <li style={styles.item}>{option}</li>)}
  </ul>
)

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: 0,
    justifyContent: 'space-between'
  },
  item: {
    background: '#ddd',
    padding: 20,
    width: '45%',
    minWidth: 250,
    marginTop: 20,
    color: '#333',
    borderRadius: 8
  }
}
