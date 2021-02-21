import ace from 'ace-builds/src-noconflict/ace';

ace.config.set('basePath', '.');

jest.spyOn(global.console, 'log').mockImplementation(() => jest.fn());
jest.spyOn(global.console, 'warn').mockImplementation(() => jest.fn());
