import axios from 'axios';
import * as esbuild from 'esbuild-wasm';
import localforage from 'localforage';

//Create cache layer in client's browser
const clientCache = localforage.createInstance({
  name: 'fileCache',
});
//Intercept esbuild accessing fs
export const unpkgPathPlugin = (input: string) => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      //1st call: Handle root entry from imaginary index.js
      build.onResolve({ filter: /(^index\.js$)/ }, (args: esbuild.OnResolveArgs) => {
        return { path: args.path, namespace: 'a' };
      });
      //2nd call: Handle required module name
      build.onResolve({ filter: /^[a-z]+/i }, async (args: esbuild.OnResolveArgs) => {
        return { path: `https://unpkg.com/${args.path}`, namespace: 'a' };
      });
      //3rd call: Handle relative paths inside modules
      build.onResolve({ filter: /^\.+\// }, async (args: esbuild.OnResolveArgs) => {
        const path = new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href;
        return { path: path, namespace: 'a' };
      });

      //Add pck to local browser environment
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
