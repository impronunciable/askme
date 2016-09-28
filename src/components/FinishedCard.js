
import { h } from 'preact'
import config from 'config'

export default ({ finished, url, id }) => finished ? (
  <div class="card">
    <h2>That's it. Your form has been created.</h2>
    <p>The form you just created is available to be filled by other people. You can embed it as an iframe or distribute the link.</p>
    <p>You may want to change the questions or their order. You can do that in our main edition interface.</p>
    <p><a href="https://coralproject.net/products/ask.html" target="_blank">Ask</a> has an API for creating forms and this
    is an experiment for an alternative way of creating forms. You can <a href="https://github.com/impronunciable/askme" target="_blank">check out the code</a> and make your on version.</p>
    <div class="card-actions">
      <a href={url} class="btn large primary">View the form page</a>
      <a href={`${config.cayBaseUrl}/forms/${id}`} class="btn large">Edit the form</a>
    </div>
    <p>Also this is how it looks inside an iframe:</p>
    <iframe src={url} width="80%" height="500" style={styles.iframe} frameBorder="0" />
  </div>
) : <div class="card"><Loader /></div>

const Loader = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" stroke="#fff">
    <g fill="none" fill-rule="evenodd">
      <g transform="translate(1 1)" stroke-width="2">
          <circle stroke-opacity=".5" cx="18" cy="18" r="18"/>
          <path d="M36 18c0-9.94-8.06-18-18-18" transform="rotate(192.247 18 18)">
            <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite"/>
          </path>
      </g>
    </g>
  </svg>
)

const styles = {
  iframe: {
    background: '#fff',
    borderRadius: 8,
    margin: '0 auto',
    marginTop: 30
  },
  actions: {
    margin: 50
  }
}
