const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Theme = require("./src/app/js/classes/ThemeClasses.js"); //Import Theme Class


const theme = new Theme(); // Initial Theme Class
let htmlPageNames = theme.themeName; // Get Theme Name

// Return Theme Name To HTMLWebpackPlugin
let multipleHtmlPlugins = htmlPageNames.map(name => {
  return new HtmlWebpackPlugin({
    path: path.resolve(__dirname, "dist"),
    template: `src/theme/${name}/index.html`, // relative path to the HTML files
    filename: `theme/${name}/index.html`, // output HTML files
    chunks: [`${name}`], // respective JS files
    inject: true,
  })
});

module.exports = {
  entry: {
    index: path.resolve(__dirname, "src/index.js"),
    modern: path.resolve(__dirname, "src/theme/modern/js/index.js"),
    minimalist: path.resolve(__dirname, "src/theme/minimalist/js/index.js"),
  },
  plugins: [
    /* HTML Webpack Plugin */
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      path: path.resolve(__dirname, "dist"),
      filename: "index.html",
      inject: true,
      chunks: ['index'],
    }),
  ].concat(multipleHtmlPlugins),
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          attributes: {
            list: [{
              tag: 'link',
              attribute: 'href',
              type: 'srcset',
            }, {
              tag: 'img',
              attribute: 'src',
              type: 'src',
            },
            ],
          }
        },
      },

      {
        test: /\.(png|jpe?g|gif|svg|ico|eot|woff|ttf)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name]-[hash:5].[ext]',
              publicPath: (url, resourcePath, context) => {
                return `/${url}`;
              },
            }
          },
        ],
      },
    ],
  },
};
