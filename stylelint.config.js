/**
 * The website's CSS may use only its design tokens (apps/site/src/styles/tokens.css, the one place raw values live).
 * docs/ui-guidelines.md § 8.
 */
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-css-modules'],
  plugins: ['stylelint-declaration-strict-value'],
  ignoreFiles: ['**/dist/**', '**/node_modules/**'],
  rules: {
    // CSS Modules are read from code as styles.itemTitle: class names are camelCase.
    'value-keyword-case': ['lower', { ignoreProperties: ['composes'] }],
    'selector-class-pattern': ['^[a-z][a-zA-Z0-9]*$', { message: 'Class names are camelCase (CSS Modules)' }],
    'scale-unlimited/declaration-strict-value': [
      [
        '/color$/',
        'background',
        'fill',
        'stroke',
        'font-family',
        'font-size',
        'font-weight',
        'letter-spacing',
        'border-radius',
        '/^padding/',
        '/^margin/',
        'gap',
        'row-gap',
        'column-gap',
        'width',
        'height',
        'max-width',
        'min-height',
      ],
      {
        ignoreValues: [
          '0',
          'auto',
          'none',
          'inherit',
          'transparent',
          '100%',
          '1',
          'uppercase',
          'currentcolor',
          '/^0 auto$/',
          '/^0 var\\(/',
        ],
        disableFix: true,
      },
    ],
  },
  overrides: [
    {
      files: ['apps/site/src/styles/tokens.css'],
      rules: { 'scale-unlimited/declaration-strict-value': null },
    },
  ],
};
