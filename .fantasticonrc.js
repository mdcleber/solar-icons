'use strict'

module.exports = {
  inputDir: './icons',
  outputDir: './font',
  fontTypes: ['woff2', 'woff'],
  assetTypes: ['css', 'scss', 'json', 'html'],
  name: 'bootstrap-icons',
  prefix: 'bi',
  selector: '.bi',
  fontsUrl: '',
  formatOptions: {
    json: {
      indent: 2
    }
  },
  // Use our custom Handlebars templates
  templates: {
    css: './build/font/css.hbs',
  }
}