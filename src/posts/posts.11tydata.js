module.exports = {
	tags: [
		"post"
	],
  eleventyComputed: {
    permalink: data => {
      return data.page.filePathStem.replace("/posts", "") + '.html';
    }
  }
};
