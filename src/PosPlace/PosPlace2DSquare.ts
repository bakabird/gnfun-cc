import { _decorator, CCFloat, CCInteger, Node } from 'cc';
import { PosPlaceBase } from './PosPlaceBase';
const { ccclass, property } = _decorator;

@ccclass('PosPlace2DSquare')
export class PosPlace2DSquare extends PosPlaceBase {
    @property(CCInteger)
    protected sideLen: number = 1;
    @property(CCFloat)
    protected gridSize: number = 100;

    public override OnPlaceNode(node: Node, index: number): void {
        const col = Math.floor(index / this.sideLen);
        const row = index % this.sideLen;
        node?.setPosition((col + .5 - this.sideLen / 2) * this.gridSize, (-row - .5 + this.sideLen / 2) * this.gridSize, 0);
    }

    public override OnGetName(index: number): string {
        const col = Math.floor(index / this.sideLen);
        const row = index % this.sideLen;
        return `${this.onlyName}-${col}-${row}`;
    }
}


