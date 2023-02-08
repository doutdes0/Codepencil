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
      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: input,
          };
        }
        //Check if cached
        const cachedResult = await clientCache.getItem<esbuild.OnLoadResult>(args.path);
        if (cachedResult) {
          return cachedResult;
        }
        //If not, make request, store it, return it
        const { data, request } = await axios.get(args.path);
        const fileType = /.css$/.test(args.path) ? 'css' : 'jsx';
        const escaped = data.replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'");
        const contents =
          fileType === 'css'
            ? `
        const style = document.createElement('style');
        style.innerText = '${escaped}';
        document.head.appendChild(style);
        `
            : data;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
        await clientCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
