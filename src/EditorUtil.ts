import { Component, Node } from "cc";


export default class EditorUtil {
    private static _e: any;
    private static get e() {
        if (!this._e) {
            this._e = eval("Editor");
        }
        return this._e;
    }

    /**
     * 
     * @param node 
     * @param walk @return 提前结束;
     */
    public static travel(node: Node, walk: (child: Node, depth: number) => boolean): void {
        this._inner_travel(node, 0, walk)
    }

    private static _inner_travel(node: Node, depth: number, walk: (child: Node, depth: number) => boolean): boolean {
        var childs = node.children;
        for (let index = 0; index < childs.length; index++) {
            const child = childs[index];
            if (walk(child, depth)) {
                return true;
            } else {
                if (this._inner_travel(child, depth + 1, walk)) {
                    return true;
                };
            }
        }
        return false;
    }

    public static msgReq(name: string, message: string, ...args: any[]): Promise<any> {
        return this.e.Message.request(name, message, ...args)
    }

    public static msgSend(name: string, message: string, ...args: any[]) {
        this.e.Message.send(name, message, ...args);
    }

    public static msgSceneSetNodeProperty(uuid: string, path: string, mod: Record<string, any>) {
        this.msgSend("scene", "set-property", {
            uuid: uuid,
            path: path,
            dump: mod,
        })
    }

    public static msgSceneSetCompProperty(comp: Component, path: string, mod: Record<string, any>) {
        const comps = comp.node.components;
        const index = comps.indexOf(comp);
        console.log('msgSceneSetCompProperty')
        console.log(comp.node.uuid, "__comps__." + index + "." + path, mod)
        this.msgSceneSetNodeProperty(comp.node.uuid, "__comps__." + index + "." + path, mod);
    }

    public static msgSceneQueryNode(uuid: string) {
        return this.msgReq("scene", "query-node", uuid);
    }

    public static msgSceneQueryNodeConsole(uuid: string) {
        this.msgReq("scene", "query-node", uuid).then(dump => {
            console.log("msgSceneQueryNodeConsole " + uuid);
            console.log(dump);
            console.log(dump.__comps__);
        });
    }

    public static msgSceneQueryComp(uuid: string) {
        return this.msgReq("scene", "query-component", uuid);
    }

    public static msgSceneQueryCompConsole(uuid: string) {
        this.msgReq("scene", "query-component", uuid).then(dump => {
            console.log("msgSceneQueryCompConsole " + uuid);
            console.log(dump);
        });
    }

    public static msgAssetDBCreateAsset(url: string, content: string | null, option: {
        overwrite?: boolean,
        rename?: boolean,
    }): Promise<any> {
        return this.msgReq("asset-db", "create-asset", url, content, option);
    }

    public static msgAssetDBQueryAssetInfo(url: string) {
        return this.msgReq("asset-db", "query-asset-info", url)
    }
}


