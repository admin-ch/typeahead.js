/*
 * typeahead.js
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2014 Twitter, Inc. and other contributors; Licensed MIT
 */

var WWW = (function() {
  'use strict';

  var defaultClassNames = {
    wrapper: 'twitter-typeahead',
    input: 'tt-input',
    hint: 'tt-hint',
    menu: 'tt-menu',
    dataset: 'tt-dataset',
    suggestion: 'tt-suggestion',
    selectable: 'tt-selectable',
    empty: 'tt-empty',
    open: 'tt-open',
    cursor: 'tt-cursor',
    highlight: 'tt-highlight'
  };

  var defaultTemplates = {
    wrapper: '<span></span>',
    menu: '<div></div>',
    dataset: '<div></div>'
  };

  return build;

  function build(o) {
    o = o || {};
    var www, classes, templates;

    classes = _.mixin({}, defaultClassNames, o.classNames);
    templates = _.mixin({}, defaultTemplates, o.templates);

    www = {
      css: buildCss(),
      classes: classes,

      html: {
        wrapper: function() { return $(templates.wrapper).addClass(classes.wrapper) },
        menu: function() { return $(templates.menu).addClass(classes.menu) },
        dataset: function() { return $(templates.dataset).addClass(classes.dataset) }
      },
      selectors: buildSelectors(classes)
    };

    return {
      css: www.css,
      html: www.html,
      classes: www.classes,
      selectors: www.selectors,
      mixin: function(o) { _.mixin(o, www); }
    };
  }

  function buildSelectors(classes) {
    var selectors = {};
    _.each(classes, function(v, k) { selectors[k] = '.' + v; });

    return selectors;
  }

  function buildCss() {
    var css =  {
      wrapper: {
        position: 'relative',
        display: 'inline-block'
      },
      hint: {
        position: 'absolute',
        top: '0',
        left: '0',
        borderColor: 'transparent',
        boxShadow: 'none',
        // #741: fix hint opacity issue on iOS
        opacity: '1'
      },
      input: {
        position: 'relative',
        verticalAlign: 'top',
        backgroundColor: 'transparent'
      },
      inputWithNoHint: {
        position: 'relative',
        verticalAlign: 'top'
      },
      menu: {
        position: 'absolute',
        top: '100%',
        left: '0',
        zIndex: '100',
        display: 'none'
      },
      ltr: {
        left: '0',
        right: 'auto'
      },
      rtl: {
        left: 'auto',
        right:' 0'
      }
    };

    // ie specific styling
    if (_.isMsie()) {
       // ie6-8 (and 9?) doesn't fire hover and click events for elements with
       // transparent backgrounds, for a workaround, use 1x1 transparent gif
      _.mixin(css.input, {
        backgroundImage: 'url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)'
      });
    }

    // ie7 and under specific styling
    if (_.isMsie() && _.isMsie() <= 7) {
      // if someone can tell me why this is necessary to align
      // the hint with the query in ie7, i'll send you $5 - @JakeHarding
      _.mixin(css.input, { marginTop: '-1px' });
    }

    return css;
  }
})();
