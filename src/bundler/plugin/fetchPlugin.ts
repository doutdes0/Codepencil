import axios from 'axios';
import * as esbuild from 'esbuild-wasm';
import localforage from 'localforage';

//Create cache layer in client's browser
const clientCache = localforage.createInstance({
  name: 'fileCache',
});

export const fetchPlugin = (input: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      //Entry point load
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: input,
        };
      });
      //Check if cached
      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        const cachedResult = await clientCache.getItem<esbuild.OnLoadResult>(args.path);
        if (cachedResult) {
          return cachedResult;
        }
      });
      //Handle css files
      build.onLoad({ filter: /.css$/ }, async (args: esbuild.OnLoadArgs) => {
        const { data, request } = await axios.get(args.path);
        const escaped = data.replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'");
        const contents = `
        const style = document.createElement('style');
        style.innerText = '${escaped}';
        document.head.appendChild(style);
        `;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        await clientCache.setItem(args.path, result);
        return result;
      });
      //Handle js and all other files
      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
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
