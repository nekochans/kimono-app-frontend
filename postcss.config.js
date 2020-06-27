module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss': {},
    '@fullhuman/postcss-purgecss': {
      content: [
        './src/pages/**/*.{js,jsx,ts,tsx}',
        './src/components/**/*.{js,jsx,ts,tsx}',
      ],
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    },
    'postcss-preset-env': {},
    'cssnano': {
      preset: 'default',
    },
  },
};
