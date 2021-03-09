'use strict'

// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { jsTPS_Transaction } from "../common/jsTPS.js"

//THIS TRANSACTION IS FOR EDITING THE TASK
export default class TaskEdit_Transaction extends jsTPS_Transaction{
    constructor(initApp, initOldTask, initNewTask, initListItem){
        super();
        this.app=initApp;
        this.oldTask=initOldTask;
        this.newTask=initNewTask;
        this.listItem=initListItem;
    }

    doTransaction(){
        this.app.editItemName(this.listItem, this.newTask);
    }

    undoTransaction(){
        this.app.editItemName(this.listItem, this.oldTask);
    }
}