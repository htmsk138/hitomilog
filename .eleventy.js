const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");
const htmlmin = require("html-minifier");

const isProduction = 'production' === process.env.ELEVENTY_ENV;

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(inclusiveLangPlugin);

  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if(isProduction && outputPath.endsWith(".html")) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true
      });
    }

    return content;
  });
 
  if (!isProduction) {
    eleventyConfig.addPassthroughCopy('src/assets');
  }
  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  eleventyConfig.addPassthroughCopy('src/_redirects');

  eleventyConfig.setDataDeepMerge(true);

  return {
    dir: {
      input: 'src',
      output: '_site',
    }
  };
};