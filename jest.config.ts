import { pathsToModuleNameMapper } from 'ts-jest/utils';
import type { Config } from '@jest/types';

import { compilerOptions } from './tsconfig.json';

const config: Config.InitialOptions = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths),
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'jest-transform-stub',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

export default config;
