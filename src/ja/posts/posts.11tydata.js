module.exports = {
	tags: [
		"post"
	],
  eleventyComputed: {
    permalink: data => {
      return '/ja/' + data.page.fileSlug + '/index.html';
    }
  }
};