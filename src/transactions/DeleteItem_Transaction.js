'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

//THIS TRANSACTION IS FOR DELETING AN ITEM FROM A LIST
export default class DeleteItem_Transaction extends jsTPS_Transaction{
    constructor(initApp,itemToRemove,i){
        super();
        this.app=initApp;
        this.itemRemoved=itemToRemove;
        this.index=i;
    }

    doTransaction(){
        this.app.deleteItem(this.itemRemoved);
    }

    undoTransaction(){
        this.app.addItemToCurrentList(this.itemRemoved,this.index);
    }
}
