import { Tween } from 'cc';

class XTween extends Tween {
    constructor() {
        super(...arguments);
        /**
         * 请在此处提前注册好 迅速完成时 需要进行的事务
         */
        this._onCompleteNow = null;
    }
    onCompleteNow(func) {
        this._onCompleteNow = func;
        return this;
    }
    /**
     * 迅速完成
     */
    completeNow() {
        this.stop();
        if (this._onCompleteNow) {
            this._onCompleteNow();
            this._onCompleteNow = null;
        }
        else {
            console.error("u are not sign 'onQuickEnd'");
        }
    }
    ;
}

export { XTween };
