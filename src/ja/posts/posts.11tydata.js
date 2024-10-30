module.exports = {
	tags: [
		"post"
	],
  eleventyComputed: {
    permalink: data => {
      return data.i18n[data.lang].homeUrl + data.page.fileSlug + '/index.html';
    }
  }
};
