import { pathsToModuleNameMapper } from 'ts-jest/utils';
import type { Config } from '@jest/types';

import { compilerOptions } from './tsconfig.json';

const config: Config.InitialOptions = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'jest-transform-stub',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    'ace-builds': '<rootDir>/node_modules/ace-builds',
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    'jest-localstorage-mock',
    '<rootDir>/test/setupTests.ts',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

export default config;
