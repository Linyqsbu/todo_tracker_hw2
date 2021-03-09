'use strict'

import {jsTPS_Transaction} from '../common/jsTPS.js'

export default class AddNewItemTransaction extends jsTPS_Transaction{
    constructor(initApp){
        super();
        this.app=initApp;

    }

    doTransaction(){
        this.itemAdded=this.app.addItem();
    }

    undoTransaction(){
        this.app.deleteItem(this.itemAdded);
    }
}