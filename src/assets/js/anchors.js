document.addEventListener('DOMContentLoaded', function() {
  /**
   * Auto-add id and anchor link to headings
   */
  var headings = document.querySelectorAll('h2, h3, h4');
  if (headings.length) {
    var h2Count = 0, h3Count = 0, h4Count = 0, i = 0, max = headings.length;
    for (; i < max; i++) {
      switch (headings[i].tagName) {
        case 'H2':
          h2Count++;
          h3Count = 0;
          h4Count = 0;
          break;

        case 'H3':
          h3Count++;
          h4Count = 0;
          break;

        case 'H4':
          h4Count++;
          break;
      }
      var headingId =
        'section' + h2Count +
        (h3Count ? '-' + h3Count : '') +
        (h4Count ? '-' + h4Count : '');
      headings[i].id = headingId;

      var link = document.createElement('a');
      link.href = window.location.href.split('#')[0] + '#' + headingId;
      headings[i].appendChild(link);
    }
  }
});
