document.addEventListener('DOMContentLoaded', function() {

  /**
   * Insert style for heading links
   */
  var anchorStyle = document.createElement('style');
  anchorStyle.innerText = ":is(h2, h3, h4, h5, h6) a::before { content: '#'; margin-left: .2em; }";
  document.body.appendChild(anchorStyle);

  /**
   * Auto-add id and anchor link to headings
   */
  var headingIdBase = 'section';
  var headingTags = ['h2', 'h3', 'h4', 'h5', 'h6'];
  var headingCounts = {};
  var i;
  for (i = 0; i < headingTags.length; i++) {
    headingCounts[headingTags[i]] = 0;
  }

  var headingElements = document.querySelectorAll(headingTags.join());
  if (headingElements.length) {
    for (i = 0; i < headingElements.length; i++) {
      // Increment current heading level count
      var tagName = headingElements[i].tagName.toLowerCase();
      headingCounts[tagName]++;

      // Reset counts for headings of lower level than current
      var headingLevel = parseInt(tagName.substring(1,2));
      while (headingCounts.hasOwnProperty(`h${++headingLevel}`)) {
        headingCounts[`h${headingLevel}`] = 0;
      }

      // Set ID to the heading
      var headingId = headingIdBase + Object.values(headingCounts).filter(val => 0 !== val).join('-');
      headingElements[i].id = headingId;

      // Add anchor link next to the heading
      var link = document.createElement('a');
      link.href = `#${headingId}`;
      link.title = 'ja' == document.documentElement.lang ? 'このセクションへのリンク' : 'Link to this section';
      headingElements[i].appendChild(link);
    }
  }
});
