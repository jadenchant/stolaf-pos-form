module.exports = {
  bracketSpacing: false,
  tabWidth: 2,
  printWidth: 50,
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      options: {
        parser: 'typescript',
      },
    },
    {
      files: [
        '*.md',
        '*.json',
        '*.yaml',
        '*.yml',
      ],
      options: {
        tabWidth: 2,
      },
    },
  ],
};
