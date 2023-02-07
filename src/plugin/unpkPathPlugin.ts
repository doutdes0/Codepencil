import axios from 'axios';
import * as esbuild from 'esbuild-wasm';
import localforage from 'localforage';

//Create cache layer in client's browser
const clientCache = localforage.createInstance({
  name: 'filecache',
});

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      //Intercept esbuild accessing fs, provide correct consecutive paths for pck and its dependencies
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

      //Add pck to local browser code environment
      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              const message = require('axios');
              console.log(message);
            `,
          };
        }
        //Check if cached
        const cachedResult = await clientCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        if (cachedResult) {
          return cachedResult;
        }
        //If not, make request, store it, return it
        const { data, request } = await axios.get(args.path);
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        await clientCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
