import { defineConfig } from 'eslint/config';
import parser from '@typescript-eslint/parser';
import pluginTs from '@typescript-eslint/eslint-plugin';
import globals from 'globals';

export default defineConfig([
  {
    files: ['backend/src/**/*.{ts,js}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser,
      globals: {
        ...globals.node
      }
    },
    plugins: {
      '@typescript-eslint': pluginTs
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
]);

