const inclusiveLangPlugin = require("@11ty/eleventy-plugin-inclusive-language");
const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(inclusiveLangPlugin);

  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if( outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });
 
  eleventyConfig.addPassthroughCopy('src/assets');
  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  eleventyConfig.addPassthroughCopy('src/**/*.jpg');

  eleventyConfig.setDataDeepMerge(true);

  return {
    dir: {
      input: 'src',
      output: '_site',
    }
  };
};