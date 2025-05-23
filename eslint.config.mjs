import tseslint from 'typescript-eslint'
import js from '@eslint/js'

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  {
    ignores: ['**/node_modules/*', 'dist', 'eslint.config.mjs']
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.jest.json'
      },
      globals: {
        expect: false,
        test: false,
        describe: false,
        jest: false,
        afterAll: false,
        beforeAll: false,
      }
    },
    rules: {
      'comma-dangle': [2, 'never'],
      'comma-spacing': ['error', { before: false, after: true }],
      'consistent-return': 0,
      camelcase: 0,
      curly: 2,
      eqeqeq: [2, 'allow-null'],
      'global-require': 2,
      'handle-callback-err': 2,
      indent: [2, 2],
      'key-spacing': 2,
      'no-cond-assign': 2,
      'no-extend-native': 2,
      'no-mixed-requires': 2,
      'no-new-require': 2,
      'no-proto': 2,
      'no-sequences': 2,
      'no-shadow': 0,
      'no-shadow-restricted-names': 2,
      'no-throw-literal': 2,
      'no-underscore-dangle': 0,
      'no-unused-expressions': 2,
      'no-use-before-define': ['error', { functions: true, classes: true }],
      'no-var': 2,
      'object-curly-spacing': [2, 'always'],
      quotes: [2, 'single'],
      'semi-spacing': 2,
      semi: [2, 'never'],
      'space-before-function-paren': 2,
      'space-infix-ops': 2,
      'space-unary-ops': 2,
      strict: 2
    }
  }
)
