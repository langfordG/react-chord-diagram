module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactChordDiagram',
      externals: {
        react: 'React'
      }
    }
  }
}
