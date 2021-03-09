'use strict'

import{jsTPS_Transaction} from "../common/jsTPS.js"

export default class MovingItemDown_Transaction extends jsTPS_Transaction{
    constructor(initApp,initItem){
        super();
        this.app=initApp;
        this.item=initItem;
    }

    doTransaction(){
        this.app.moveItemDown(this.item);
    }

    undoTransaction(){
        this.app.moveItemUp(this.item);
    }
}