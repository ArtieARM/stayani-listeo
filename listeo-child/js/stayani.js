// stayani.js — avatar fade pro mobily (tap) + rebind po AJAXu
(function(){
  function bindAvatarTouch(root){
    var boxes = root.querySelectorAll('.listing-image-container-nl');
    boxes.forEach(function(box){
      // ať se nenaváže 2×
      if (box.dataset.avatarTouchBound === '1') return;
      box.dataset.avatarTouchBound = '1';

      var avatar = box.querySelector('.listing-owner-avatar');
      var timer;

      box.addEventListener('touchstart', function(ev){
        var onAvatar = avatar && (ev.target === avatar || avatar.contains(ev.target));

        if (onAvatar){
          // dotyk přímo na avatar (i bílé kolečko) → 100 %
          box.classList.remove('is-touching');
          avatar.classList.add('is-hot');
          clearTimeout(timer);
          timer = setTimeout(function(){
            if (avatar) avatar.classList.remove('is-hot');
          }, 1000);
        } else {
          // dotyk kdekoliv na fotce/slidru/srdíčku → 25 %
          if (avatar) avatar.classList.remove('is-hot');
          box.classList.add('is-touching');
          clearTimeout(timer);
          timer = setTimeout(function(){
            box.classList.remove('is-touching');
          }, 1000);
        }
      }, {passive:true});
    });
  }

  function init(){
    bindAvatarTouch(document);
    // Rebind po AJAX refreshi listek (update_results_success)
    if (window.jQuery){
      jQuery('#listeo-listings-container').on('update_results_success', function(){
        bindAvatarTouch(this);
      });
    }
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* ===== Stayani: Half-map — hide layout switcher only (idempotent) ===== */
(function(){
  if (window.__stayaniHideLayoutSwitcher) return;
  window.__stayaniHideLayoutSwitcher = true;

  function hideSwitchers(){
    document.querySelectorAll('.layout-switcher, .layout-switcher-wrap').forEach(function(el){
      // remove from DOM to prevent reappearance
      if (el && el.parentNode) el.parentNode.removeChild(el);
    });
  }

  function init(){
    hideSwitchers();
    if (window.jQuery){
      jQuery(document).on('update_results_success ajaxComplete', hideSwitchers);
    }
    var mo = new MutationObserver(hideSwitchers);
    mo.observe(document.body, {childList:true, subtree:true});
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


/* ===== Stayani: Half-map — Sort relocate V4 (robust, CZ-friendly) ===== */
(function(){
  if (window.__stayaniHalfMapSortRelocateV4) return;
  window.__stayaniHalfMapSortRelocateV4 = true;

  function inLeftPane(node){
    return !!(node && node.closest && node.closest('.half-map-container .fs-left, .half-map-container .listings-container'));
  }

  function getFiltersRow(){
    var pane = document.querySelector('.half-map-container .fs-left') || document.querySelector('.half-map-container .listings-container');
    if (!pane) return null;
    return pane.querySelector('.listings-filters') || pane.querySelector('.filters-container') || pane.querySelector('.listings-header') || pane.querySelector('.listings-controls');
  }

  function findSortCandidates(){
    // Typical wrappers or selects likely to be the sorting control
    var pane = document;
    var nodes = Array.prototype.slice.call(pane.querySelectorAll(
      '.sort-by, .listing-sorting, .sort-by-select, select[name*="sort"], select[id*="sort"], [class*="sort"] select'
    ));

    // Heuristic by text (CZ/EN)
    var texts = /(Best Match|Featured|Nejlepší shoda|Doporucene|Doporučené|Nejnovější|Seřadit|Řazení)/i;
    var more = Array.prototype.slice.call(pane.querySelectorAll('*')).filter(function(el){
      if (!el || !el.textContent) return false;
      return texts.test(el.textContent);
    }).map(function(el){
      return el.closest('.sort-by, .listing-sorting, .sort-by-select, .form-group, .btn-group, .dropdown, .bootstrap-select, .select2') || el;
    });

    nodes = nodes.concat(more);
    // Deduplicate
    var seen = new Set(), out = [];
    nodes.forEach(function(n){
      if (!n || !n.closest) return;
      if (!inLeftPane(n)) return; // only left pane elements
      var key = n;
      try { key = n.outerHTML.slice(0,80); } catch(e){}
      if (!seen.has(n)){
        seen.add(n);
        out.push(n);
      }
    });
    return out;
  }

  function relocateOnce(){
    var filters = getFiltersRow();
    if (!filters) return;

    // make row flex
    var fs = filters.style;
    if (!fs.display) fs.display = 'flex';
    if (!fs.alignItems) fs.alignItems = 'center';
    if (!fs.gap) fs.gap = '12px';

    var candidates = findSortCandidates();
    candidates.forEach(function(node){
      // choose wrapper to move
      var wrap = node.closest('.sort-by, .listing-sorting, .sort-by-select, .form-group, .btn-group, .dropdown, .bootstrap-select, .select2') || node;
      if (!filters.contains(wrap)){
        try { filters.appendChild(wrap); } catch(e){}
      }
      wrap.classList.add('stayani-sort-right');
    });
  }

  function init(){
    relocateOnce();
    if (window.jQuery){
      jQuery(document).on('update_results_success ajaxComplete', relocateOnce);
    }
    var mo = new MutationObserver(relocateOnce);
    mo.observe(document.body, {childList:true, subtree:true});
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

