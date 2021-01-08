module.exports = {
	tags: [
		"post"
	],
  eleventyComputed: {
    permalink: data => {
      return '/' + data.page.fileSlug + '/index.html';
    }
  }
};