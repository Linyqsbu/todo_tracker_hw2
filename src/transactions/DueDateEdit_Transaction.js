'use strict'

//IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import{jsTPS_Transaction} from "../common/jsTPS.js"

//THIS TRANSACTION IS FOR EDITING THE DUE DATE OF AN ITEM
export default class DueDateEdit_Transaction extends jsTPS_Transaction{
    constructor(initApp, initOldDate, initNewDate, initListItem){
        super();
        this.app=initApp;
        this.oldDate=initOldDate;
        this.newDate=initNewDate;
        this.listItem=initListItem;
    }

    doTransaction(){
        this.app.editItemDueDate(this.listItem, this.newDate);
    }

    undoTransaction(){
        this.app.editItemDueDate(this.listItem,this.oldDate);
    }
}