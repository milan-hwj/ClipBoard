/**
  * @author   milan(white gourd angel)
  * @describe A fast way to copy text to clipboard with javascript,no flash, no dependencies, high performance
  */
class ClipBoard{
    constructor() {}
    createContentNode(){
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
    copy(content, opt){
        /**
         * @describe copy
         * @param    content: Data for replication
         *           opt: {
         *              success: success callback
         *              error: error callback
         *           }
         * @return
         */
        opt = opt || {};
        try {
            // create
            let copyDom = this.createContentNode();
            copyDom.innerHTML = content;
            let selection = window.getSelection();
            let range = document.createRange();

            // select
            range.selectNodeContents(copyDom);
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('copy');

            // destroy
            this.destroy(copyDom);
            // callback
            this.copyHandle(opt.success);
        }
        catch (err) {
            this.copyHandle(opt.error);
        }
    }
    copyHandle(callback){
        if(!callback){
            return;
        }
        callback.call();
    }
    destroy(dom){
        /**
         * @describe The node is removed when copy complete 
         * @param    dom
         * @return   
         */
        document.body.removeChild(dom);
    }
    bind(doms, opt){
       /**
         * @describe Bind copy event, bind
         * @param    doms: dom or [dom1, dom2, ...]
         * @return
         */
        let self = this,
            bindHandle = function(dom){
                let copyHandle = function(){
                    let attr = this.attributes['data-copy-content'] || {};
                    self.copy(attr.value, opt);
                };
                if (dom.addEventListener){
                    dom.addEventListener('click', function(){
                        copyHandle.call(this);
                    });
                }
                else if (dom.attachEvent) {
                    dom.attachEvent( "onClick", function() {
                        copyHandle.call(this);
                    });
                }
            };
        if(!doms){
            return;
        }
        // doms
        if(doms.length > 0){
            for(var i=0; i<doms.length; i++){
                if(doms[i] instanceof HTMLElement){
                    bindHandle(doms[i]);
                }
            }
        }
        // dom
        else{
            bindHandle(doms);
        }
    }
}
window.ClipBoard = new ClipBoard();
