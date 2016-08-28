/**
 * @author     milan(white gourd angel)
 * @describe   judgment (https://www.npmjs.com/package/judgment)
 */
class Judgment {
    constructor(opt) {
        /**
          * @param
          *     opt: {
          *         conditions: [
          *             () => { if(xxx) {return true;} return false;},
          *             () => { if(xxx) {return true;} return false;},
          *             () => { if(xxx) {return true;} return false;},
          *             () => { if(xxx) {return true;} return false;}
          *         ],
          *         relations: {
          *             'resultA': ['1010', '1011', '11**'],
          *             'resultB': ['1010', '1010', '11**']
          *         }
          *     }
          */
        this.opt = opt;
    }
    run() {
        // 执行判断
        const conditions = this.opt.conditions;
        const relations = this.opt.relations;
        let result = [];
        for(let r in relations) {
            if (this._isPass(relations[r])) {
                result.push(r);
                if (this.opt.matchOnce) {
                    break;
                }
            }
        }
        return result;
    }
    _isPass(relation) {
        let result = false;
        for(let c in relation) {
            if (this._isPassByFunctions(relation[c])) {
                result = true;
                break;
            }
        }
        return result;
    }
    _isPassByFunctions(functionsStr) {
        // functionsStr 101*
        let result = true;
        const conditions = this.opt.conditions;
        for(let f in functionsStr) {
            if(functionsStr[f] === '*') {
                continue;
            } else {
                const passResult = functionsStr[f];
                let checkResult = conditions[f]();
                if (checkResult === true) {
                    checkResult = '1';
                } else if (checkResult === false) {
                    checkResult = '0';
                }
                // judgment
                if(checkResult.toString() !== passResult) {
                    result = false;
                    break;
                }
            }
        }
        return result;
    }
}

const judgmentCreater = (opt) => {
    return new Judgment(opt);
};

export default judgmentCreater;
