'use strict';

System.register(['./slick-service', './slick-pager', './slick-window-resizer'], function (_export, _context) {
  "use strict";

  var SlickService, SlickPager, SlickWindowResizer;
  function configure(aurelia, callback) {
    aurelia.globalResources('./slick-pager');

    var config = new BootstrapConfig();

    if (typeof callback === 'function') {
      callback(config);
    }
  }

  _export('configure', configure);

  return {
    setters: [function (_slickService) {
      SlickService = _slickService.SlickService;
    }, function (_slickPager) {
      SlickPager = _slickPager.SlickPager;
    }, function (_slickWindowResizer) {
      SlickWindowResizer = _slickWindowResizer.SlickWindowResizer;
    }],
    execute: function () {
      _export('SlickService', SlickService);

      _export('SlickPager', SlickPager);

      _export('SlickWindowResizer', SlickWindowResizer);
    }
  };
});