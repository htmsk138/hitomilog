module.exports = {
  eleventyComputed: {
    permalink: data => {
      return '/ja/' + data.page.fileSlug + '/index.html';
    }
  }
};