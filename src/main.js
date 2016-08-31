/**
  * @author   milan(white gourd angel)
  * @describe A fast way to copy text to clipboard with javascript
	* no flash, no dependencies, high performance
  */
class ClipBoard {
  createContentNode() {
    /**
     * @describe Create dom, For storing data to be copied
     * @param
     * @return   dom
     */
    const copyDom = document.createElement('pre');
    copyDom.style.position = 'absolute';
    copyDom.style.left = '-9999px';
    copyDom.style.top = '-9999px';
    copyDom.style.width = '5px';
    copyDom.style.height = '5px';
    document.body.appendChild(copyDom);
    return copyDom;
  }
  copy(content, option) {
    /**
     * @describe copy
     * @param    content: Data for replication
     *           option: {
     *              success: success callback
     *              error: error callback
     *           }
     * @return
     */
    const opt = option || {};
    try {
      // create
      const copyDom = this.createContentNode();
      copyDom.innerHTML = content;
      const selection = window.getSelection();
      const range = document.createRange();

      // select
      range.selectNodeContents(copyDom);
      selection.removeAllRanges();
      selection.addRange(range);
      const isSuccess = document.execCommand('copy');
      // destroy
      this.destroy(copyDom);

      if (!isSuccess) {
        const isMac = /mac/i.test(window.navigator.userAgent);
        const copyShortcut = isMac ? 'Cmd + C' : 'Ctrl + C';
        let tip = `Data size is too large to copy, press ${copyShortcut} to copy please`;
        if (opt && typeof opt.getCopyText === 'function') {
          tip = opt.getCopyText(copyShortcut);
        }
        if (opt && typeof opt.renderOverSizeDialog === 'function') {
          // custom tip dialog
          opt.renderOverSizeDialog(content, tip);
        } else {
          // default tip dialog
          window.prompt(tip, content);
        }
      }
      this.copyHandle(opt.success);
      return true;

    } catch (err) {
      this.copyHandle(opt.error);
      return false;
    }
  }
  copyHandle(callback) {
    if (!callback) {
      return;
    }
    callback.call();
  }
  destroy(dom) {
    /**
     * @describe The node is removed when copy complete
     * @param    dom
     */
    document.body.removeChild(dom);
  }
  bind(actionDoms, opt) {
   /**
     * @describe Bind copy event, bind
     * @param    actionDoms: dom or [dom1, dom2, ...] or selector(str) or jqueryDom
     * @return
     */
    const bindHandle = (dom) => {
      const copyHandle = (e) => {
        const attr = e.target.attributes['data-copy-content'] || {};
        this.copy(attr.value, opt);
      };
      if (dom.addEventListener) {
        dom.addEventListener('click', (e) => {
          copyHandle.call(this, e);
        });
      } else if (dom.attachEvent) {
        dom.attachEvent('onClick', (e) => {
          copyHandle.call(this, e);
        });
      }
    };
    if (!actionDoms) {
      return;
    }
    // selector
    let doms = actionDoms;
    if (typeof doms === 'string') {
      doms = document.querySelectorAll(doms);
    }
    // doms
    if (doms.length > 0) {
      for (let i = 0; i < doms.length; i++) {
        if (doms[i] instanceof HTMLElement) {
          bindHandle(doms[i]);
        }
      }
    } else {
			// dom
      bindHandle(doms);
    }
  }
}
const superClipBoard = new ClipBoard();
window.superClipBoard = superClipBoard;

export default superClipBoard;
