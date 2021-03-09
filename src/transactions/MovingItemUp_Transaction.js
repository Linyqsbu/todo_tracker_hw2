'use strict'

import{jsTPS_Transaction} from "../common/jsTPS.js"

export default class MovingItemUp_Transaction extends jsTPS_Transaction{
    constructor(initApp, initItem){
        super();
        this.app=initApp;
        this.item=initItem;
    }

    doTransaction(){
        this.app.moveItemUp(this.item);
    }

    undoTransaction(){
        this.app.moveItemDown(this.item);
    }
}