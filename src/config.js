const config = {
  'default': {
    apiHost: 'https://lohastudy.com/prod/api'
  },
  PRODTEST : {
    apiHost: 'https://lohastudy.com/prodtest/api'
  },
  DEV: {
    apiHost: 'https://lohastudy.com/dev/api'
  },
  LOCAL : {
    apiHost: 'http://localhost:3000/api'
  },
}
export default config[LOHA_ENV] || config.default