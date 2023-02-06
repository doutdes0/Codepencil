import axios from 'axios';
import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: esbuild.OnResolveArgs) => {
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        }

        const path = new URL(
          args.path,
          'https://unpkg.com' + args.resolveDir + '/'
        ).href;

        return { path: path, namespace: 'a' };
      });

      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              const message = require('axios');
              console.log(message);
            `,
          };
        } else {
          const { data, request } = await axios.get(args.path);
          return {
            loader: 'jsx',
            contents: data,
            resolveDir: new URL('./', request.responseURL).pathname,
          };
        }
      });
    },
  };
};
