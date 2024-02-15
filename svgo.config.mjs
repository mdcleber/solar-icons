import path from 'node:path'
import SVGFixer from 'oslllo-svg-fixer';

export default {
  multipass: true,
  js2svg: {
    pretty: true,
    indent: 2,
    eol: 'lf'
  },
  plugins: [
    {
      name:"remove-stroke-to-fill",
      fn(_root, params, info) {
        const r = SVGFixer(info.path, info.path, { });
        console.log("🚀 ~ fn ~ info:", info)
        console.log("🚀 ~ fn ~ r:", r);
        return null;
      }
    },
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeUnknownsAndDefaults: {
            keepDataAttrs: false, // remove all `data` attributes
            keepRoleAttr: true // keep the `role` attribute
          },
          removeViewBox: false // keep the `viewBox` attribute
        }
      }
    },
    // The next plugins are included in svgo but are not part of preset-default,
    // so we need to explicitly enable them
    'cleanupListOfValues',
    {
      name: 'removeAttrs',
      params: {
        attrs: [
          'clip-rule',
          'fill'
        ]
      }
    },
    // Custom plugin which resets the SVG attributes to explicit values
    {
      name: 'explicitAttrs',
      type: 'visitor',
      params: {
        attributes: {
          xmlns: 'http://www.w3.org/2000/svg',
          width: '16',
          height: '16',
          fill: 'currentColor',
          class: '', // We replace the class with the correct one based on filename later
          viewBox: '0 0 16 16'
        }
      },
      fn(_root, params, info) {
        if (!params.attributes) {
          return null
        }

        const basename = path.basename(info.path, '.svg')

        return {
          element: {
            enter(node, parentNode) {
              if (node.name === 'svg' && parentNode.type === 'root') {
                // We set the `svgAttributes` in the order we want to,
                // hence why we remove the attributes and add them back
                node.attributes = {}
                for (const [key, value] of Object.entries(params.attributes)) {
                  node.attributes[key] = key === 'class' ? `si si-${basename}` : value
                }
              }
            }
          }
        }
      }
    }
  ]
}