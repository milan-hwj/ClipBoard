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
    copy(content){
    	/**
    	 * @describe copy 
    	 * @param    content: Data for replication
    	 * @return   
    	 */
    	let copyDom = this.createContentNode();
    	copyDom.innerHTML = content;
    	let selection = window.getSelection();
		let range = document.createRange();

		range.selectNodeContents(copyDom);
		selection.removeAllRanges();
		selection.addRange(range);
		document.execCommand('copy');

		// destroy
		this.destroy(copyDom);
    }
    destroy(dom){
    	/**
    	 * @describe The node is removed when copy complete 
    	 * @param    dom
    	 * @return   
    	 */
    	document.body.removeChild(dom);
    }
    bind(opt){
    	/*opt.trigger.addEventListener("click", function(){
			copt(content);
    	}*/
	}
}
window.ClipBoard = new ClipBoard();
