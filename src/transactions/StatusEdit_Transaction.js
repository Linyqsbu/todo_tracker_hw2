'use strict'

import{jsTPS_Transaction} from "../common/jsTPS.js"

export default class StatusEdit_Transaction extends jsTPS_Transaction{
    constructor(initApp, initOldStat,initNewStat,initListItem){
        super();
        this.app=initApp;
        this.oldStat=initOldStat;
        this.newStat=initNewStat;
        this.listItem=initListItem;
    }

    doTransaction(){
        this.app.editStatus(this.listItem, this.newStat);
    }

    undoTransaction(){
        this.app.editStatus(this.listItem,this.oldStat);
    }
}