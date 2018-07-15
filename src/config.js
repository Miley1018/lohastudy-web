const config = {
  'default': {
    apiHost: 'https://lohastudy.com/prod/api'
  },
  DEV: {
    apiHost: 'https://lohastudy.com/dev/api'
  },
  LOCAL : {
    apiHost: 'http://localhost:3000/api'
  }
}
export default config[LOHA_ENV] || config.default