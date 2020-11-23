module.exports = {
  eleventyComputed: {
    permalink: data => {
      return '/' + data.page.fileSlug + '/index.html';
    }
  }
};