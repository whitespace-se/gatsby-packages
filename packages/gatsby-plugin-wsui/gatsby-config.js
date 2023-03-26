// exports.onCreateWebpackConfig = (
//   { actions, loaders },
//   { modules = [], test = /\.js$/ }
// ) => {
//   actions.setWebpackConfig({
//     module: {
//       rules: [
//         {
//           test,
//           exclude: modulePath =>
//             /node_modules/.test(modulePath)
//           use: loaders.js()
//         }
//       ]
//     }
//   });
// };
