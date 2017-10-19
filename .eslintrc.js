module.exports = {
  extends: [
    'standard',
    'plugin:flowtype/recommended',
    'standard',
    'standard-react'
  ],
  globals: {
    'expect': false,
    'test': false
  },
  plugins: [
    'flowtype'
  ],
  rules: {
    'curly': 0,
    'react/no-unused-prop-types': 0,
    'react/prop-types': 0,
    'comma-dangle': [
      2,
      'never'
    ],
    'comma-spacing': [
      'error',
      {
        'before': false,
        'after': true
      }
    ],
    'no-sequences': 0,
    'jsx-quotes': 0,
    'camelcase': 0,
    'no-proto': 0,
    'no-throw-literal': 0,
    'no-useless-escape': 0,
    'eqeqeq': [
      2,
      'allow-null'
    ],
    'key-spacing': 0,
    'no-underscore-dangle': 0,
    'no-unused-expressions': 0,
    'space-before-function-paren': 0,
    'no-shadow': 0,
    'no-shadow-restricted-names': 0,
    'no-use-before-define': [
      'error',
      {
        'functions': true,
        'classes': true
      }
    ],
    'no-extend-native': 0,
    'no-var': 2,
    'new-cap': 0,
    'quotes': 0,
    'semi-spacing': 0,
    'space-unary-ops': 0,
    'space-infix-ops': 0,
    'consistent-return': 0,
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'strict': 0,
    'flowtype/boolean-style': [
      2,
      'boolean'
    ],
    'flowtype/define-flow-type': 1,
    'flowtype/delimiter-dangle': [
      2,
      'never'
    ],
    'flowtype/generic-spacing': [
      2,
      'never'
    ],
    'flowtype/no-primitive-constructor-types': 2,
    // TODO: below must be 2, instead of 0, 0 is for testing purposes only
    // it is done to prevent error in actions/project.js missing top /* @flow */
    'flowtype/no-types-missing-file-annotation': 0,
    'flowtype/no-weak-types': 0,
    'flowtype/object-type-delimiter': [
      2,
      'comma'
    ],
    'flowtype/require-parameter-type': 0,
    'flowtype/require-valid-file-annotation': 2,
    'flowtype/space-after-type-colon': [
      2,
      'always'
    ],
    'flowtype/space-before-generic-bracket': [
      2,
      'never'
    ],
    'flowtype/space-before-type-colon': [
      2,
      'never'
    ],
    'flowtype/union-intersection-spacing': [
      2,
      'always'
    ],
    'flowtype/use-flow-type': 1,
    'flowtype/valid-syntax': 1
  }
}
