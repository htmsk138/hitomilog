/**
 * Post filtering feature.
 */
var items = document.querySelectorAll('[data-tags^="post"]');
var filters = [];

document.addEventListener('DOMContentLoaded', function() {
  // On filter select
  var toggles = document.getElementsByName('filter');
  for (var i = 0; i < toggles.length; i++) {
    toggles[i].onchange = function() {
      toggleFilter(this);
    };
  }

  // On operator change
  var operators = document.getElementsByName('operator');
  for (var i = 0; i < operators.length; i++) {
    operators[i].onchange = applyFilters;
  }
});

/**
 * Update selected filters list and apply filtering.
 */
function toggleFilter(checkbox) {
  if (checkbox.checked) {
    filters.push(checkbox.value);
  } else {
    filters.splice(filters.indexOf(checkbox.value), 1);
  }
  applyFilters();
}

/**
 * Filter posts.
 */
function applyFilters() {
  if (filters.length) {
    var isAnd = ('and' === document.querySelector('[name="operator"]:checked').value);
    var isShowing;
    for (var i = 0; i < items.length; i++) {
      isShowing = isAnd;

      for (var j = 0; j < filters.length; j++) {
        if (isAnd) {
          isShowing &= items[i].dataset.tags.includes(filters[j]);
        } else {
          isShowing |= items[i].dataset.tags.includes(filters[j]);
        }
      }

      items[i].style.display = isShowing ? '' : 'none';
    }
  } else {
    for (var i = 0; i < items.length; i++) {
      items[i].style.display = '';
    }
  }
}

/**
 * Deselect all filters.
 */
function resetFilters() {
  filters = [];
  applyFilters();
}
