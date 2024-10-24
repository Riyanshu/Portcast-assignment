import type { TransformOptions } from '@babel/core';

const config: TransformOptions = {
  presets: [
    '@babel/preset-env', // Transpile modern JS to ES5
    '@babel/preset-react', // Transpile JSX
    '@babel/preset-typescript', // Transpile TypeScript
  ],
};

export default config;
