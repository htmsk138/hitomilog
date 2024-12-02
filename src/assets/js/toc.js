document.addEventListener('DOMContentLoaded', function() {
  /**
   * Auto-add table of contents for the post.
   */
  var listTag = 'ul';
  var headings = document.querySelectorAll('h2, h3, h4');

  if (headings.length) {
    var tocTitle = document.createElement('h2');
    tocTitle.innerHTML = 'ja' === document.documentElement.lang ? '目次' : 'Table of contents';
    var tocList = document.createElement(listTag);
    var i = 0, parent = tocList, prevItem, prevLevel = 2, currentLevel;

    // Adding links to each heading
    for (; i < headings.length; i++) {
      currentLevel = parseInt(headings[i].tagName.substring(1));

      // Top level
      if (2 === currentLevel) {
        parent = tocList;
      // New child list
      } else if (prevLevel < currentLevel) {
        parent = document.createElement(listTag);
        prevItem.appendChild(parent);
      // Go up to parent list
      } else if (prevLevel > currentLevel) {
        parent = prevItem.parentNode.parentNode;
      // Same level as previous
      } else {
        parent = prevItem.parentNode;
      }

      prevItem = addListItem(parent, headings[i]);
      prevLevel = currentLevel;
    }

    // Insert before the first h2
    var firstH2 = document.querySelector('main h2');
    firstH2.parentNode.insertBefore(tocTitle, firstH2);
    firstH2.parentNode.insertBefore(tocList, firstH2);
  }
});

/**
 * Add item with link to parent.
 */
function addListItem(parent, heading) {
  var item = document.createElement('li');
  var link = document.createElement('a');
  link.href = window.location.href.split('#')[0] + '#' + heading.id;
  link.innerHTML = heading.innerText;
  item.appendChild(link);
  parent.appendChild(item);
  return item;
}