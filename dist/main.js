'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
  * @author   milan(white gourd angel)
  * @describe A fast way to copy text to clipboard with javascript
	* no flash, no dependencies, high performance
  */

var ClipBoard = function () {
  function ClipBoard() {
    _classCallCheck(this, ClipBoard);
  }

  _createClass(ClipBoard, [{
    key: 'createContentNode',
    value: function createContentNode() {
      /**
       * @describe Create dom, For storing data to be copied
       * @param
       * @return   dom
       */
      var copyDom = document.createElement('pre');
      copyDom.style.position = 'absolute';
      copyDom.style.left = '-9999px';
      copyDom.style.top = '-9999px';
      copyDom.style.width = '5px';
      copyDom.style.height = '5px';
      document.body.appendChild(copyDom);
      return copyDom;
    }
  }, {
    key: 'copy',
    value: function copy(content, option) {
      /**
       * @describe copy
       * @param    content: Data for replication
       *           option: {
       *              success: success callback
       *              error: error callback
       *           }
       * @return
       */
      var opt = option || {};
      try {
        // create
        var copyDom = this.createContentNode();
        copyDom.innerHTML = content;
        var selection = window.getSelection();
        var range = document.createRange();

        // select
        range.selectNodeContents(copyDom);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');

        // destroy
        this.destroy(copyDom);
        // callback
        this.copyHandle(opt.success);
        return true;
      } catch (err) {
        this.copyHandle(opt.error);
        return false;
      }
    }
  }, {
    key: 'copyHandle',
    value: function copyHandle(callback) {
      if (!callback) {
        return;
      }
      callback.call();
    }
  }, {
    key: 'destroy',
    value: function destroy(dom) {
      /**
       * @describe The node is removed when copy complete
       * @param    dom
       */
      document.body.removeChild(dom);
    }
  }, {
    key: 'bind',
    value: function bind(actionDoms, opt) {
      var _this = this;

      /**
        * @describe Bind copy event, bind
        * @param    actionDoms: dom or [dom1, dom2, ...] or selector(str) or jqueryDom
        * @return
        */
      var bindHandle = function bindHandle(dom) {
        var copyHandle = function copyHandle(e) {
          var attr = e.target.attributes['data-copy-content'] || {};
          _this.copy(attr.value, opt);
        };
        if (dom.addEventListener) {
          dom.addEventListener('click', function (e) {
            copyHandle.call(_this, e);
          });
        } else if (dom.attachEvent) {
          dom.attachEvent('onClick', function (e) {
            copyHandle.call(_this, e);
          });
        }
      };
      if (!actionDoms) {
        return;
      }
      // selector
      var doms = actionDoms;
      if (typeof doms === 'string') {
        doms = document.querySelectorAll(doms);
      }
      // doms
      if (doms.length > 0) {
        for (var i = 0; i < doms.length; i++) {
          if (doms[i] instanceof HTMLElement) {
            bindHandle(doms[i]);
          }
        }
      } else {
        // dom
        bindHandle(doms);
      }
    }
  }]);

  return ClipBoard;
}();

var superClipBoard = new ClipBoard();
window.superClipBoard = superClipBoard;

exports.default = superClipBoard;