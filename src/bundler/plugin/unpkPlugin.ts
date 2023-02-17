import * as esbuild from 'esbuild-wasm';

//Intercept esbuild accessing fs
export const unpkgPlugin = () => {
  return {
    name: 'unpkg-plugin',
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
    },
  };
};
