var contextPath = '/cmdpanel-bdd';

module.exports = {
  application: {
    contextPath: contextPath
  },
  plugins: {
    appCmdpanel: {
      contextPath: contextPath,
    },
    appWebinject: {
      interceptor: 'tamper'
    },
    appWebweaver: {
      defaultRedirectUrl: contextPath + '/index'
    }
  }
};
