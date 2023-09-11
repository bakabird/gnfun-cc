import { _decorator, CCBoolean, CCFloat, CCInteger, CCString, Component, Node } from 'cc';
import { EDITOR } from 'cc/env';
const { ccclass, property, type, executeInEditMode } = _decorator;

@ccclass('PosPlaceBase')
@executeInEditMode
export class PosPlaceBase extends Component {
    @property(CCString)
    public onlyName: string = "";
    @property(CCBoolean)
    private _run: boolean = false;
    @property(CCBoolean)
    private rename: boolean = false;

    @type(CCBoolean)
    public get run() {
        return this._run;
    }

    public set run(v: boolean) {
        if (v && EDITOR) {
            this._Place();
        }
    }

    private _Place(): void {
        // console.log("_Place");
        var nodes: Array<Node> = [];
        this.node.children.forEach((child: Node) => {
            if (child.name.indexOf(this.onlyName) > -1) {
                nodes.push(child);
            }
        });
        // console.log(nodes.length);
        // var halfSquareSideLen = this.sideLen * this.gridSize / 2;
        nodes.forEach((node, index) => {
            if (this.rename) {
                node.name = this.OnGetName(index);
            }
            // console.log("OnPlaceNode");
            this.OnPlaceNode(node, index);
        });
    };

    /** @virtual */
    public OnPlaceNode(node: Node, index: number): void {

    }

    /** @virtual */
    public OnGetName(index: number): string {
        return `${this.onlyName}-${index}`;
    }

}


