module.exports = {
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:flowtype/recommended',
    'prettier',
    'prettier/react',
  ],
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  settings: {
    'import/resolver': 'webpack',
  },
  plugins: [
    //
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/require-default-props': 0,
    'no-use-before-define': 0,
    'react/sort-comp': 0,
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': 0,
    'jsx-a11y/label-has-for': [
      2,
      {
        components: ['Label'],
        required: {
          every: ['id'],
        },
        allowChildren: false,
      },
    ],
  },
};
