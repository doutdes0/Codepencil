import * as esbuild from 'esbuild-wasm';
import { unpkgPlugin } from './plugin/unpkPlugin';
import { fetchPlugin } from './plugin/fetchPlugin';

let service: esbuild.Service;
const bundle = async (rawCode: string) => {
  if (!service) {
    service = await esbuild.startService({
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
      worker: true,
    });
  }

  try {
    const result = await service.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPlugin(), fetchPlugin(rawCode)],
      define: {
        'process.env.NODE_ENV': "'production'",
        global: 'window',
      },
    });
    return { code: result.outputFiles[0].text, err: '' };
  } catch (err) {
    if (err instanceof Error) {
      return { code: '', err: err.message };
    } else {
      throw err;
    }
  }
};

export default bundle;
