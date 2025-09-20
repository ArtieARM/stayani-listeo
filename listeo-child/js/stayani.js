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

/* ===== Stayani: Half-map tweaks (hide layout switcher + move Sort right) ===== */
(function(){
  if (window.__stayaniHalfMapTweaksInit) return;
  window.__stayaniHalfMapTweaksInit = true;

  function applyHalfMapTweaks(){
    var container = document.querySelector('.half-map-container')
                   || document.querySelector('.page-template-template-half-map-1')
                   || document.querySelector('.page-template-template-half-map')
                   || document.querySelector('.page-template-template-half-map-php');
    if (!container) return;

    // 1) hide any layout switchers within left pane
    container.querySelectorAll('.layout-switcher, .layout-switcher-wrap').forEach(function(el){
      el.style.display = 'none';
    });

    // 2) find left pane and filters row
    var pane = container.querySelector('.fs-left') || container.querySelector('.listings-container') || container;
    var filters = pane && (pane.querySelector('.listings-filters')
                  || pane.querySelector('.filters-container')
                  || pane.querySelector('.listings-header')
                  || pane.querySelector('.listings-controls'));
    if (!filters) return;

    // 3) find sort dropdown/button group
    var sort = pane.querySelector('.sort-by, .listing-sorting, .sort-by-select, .btn-group.bootstrap-select, .dropdown.bootstrap-select');
    if (!sort){
      // fallback: element containing "Best Match" or "Featured"
      var all = pane.querySelectorAll('*');
      for (var i=0; i<all.length; i++){
        var t = (all[i].textContent || '').trim();
        if (/Best Match|Featured/i.test(t)){
          sort = all[i].closest('.sort-by, .listing-sorting, .sort-by-select, .btn-group, .dropdown') || all[i];
          break;
        }
      }
    }
    if (!sort) return;

    // 4) move sort into filters row (right side) – idempotent
    if (!filters.contains(sort)){
      filters.appendChild(sort);
    }
    sort.classList.add('stayani-sort-right');

    // ensure filters behave as a single row
    var fs = filters.style;
    if (!fs.display) fs.display = 'flex';
    if (!fs.alignItems) fs.alignItems = 'center';
    if (!fs.gap) fs.gap = '12px';
  }

  function init(){
    applyHalfMapTweaks();
    if (window.jQuery){
      jQuery(document).on('update_results_success ajaxComplete', function(){
        applyHalfMapTweaks();
      });
    }
    var mo = new MutationObserver(function(){ applyHalfMapTweaks(); });
    mo.observe(document.body, {childList:true, subtree:true});
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
