// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS'

// THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'
import AddNewItem_Transaction from './transactions/AddNewItem_Transaction'
import DeleteItem_Transaction from './transactions/DeleteItem_Transaction'
import DueDateEdit_Transaction from './transactions/DueDateEdit_Transaction';
import TaskEdit_Transaction from './transactions/TaskEdit_Transaction';
import MovingItemDown_Transaction from './transactions/MovingItemDown_Transaction'
import MovingItemUp_Transaction from './transactions/MovingItemUp_Transaction';
import StatusEdit_Transaction from './transactions/StatusEdit_Transaction';
{/*import ItemsListHeaderComponent from './components/ItemsListHeaderComponent'
import ItemsListComponent from './components/ItemsListComponent'
import ListsComponent from './components/ListsComponent'
*/}
class App extends Component {
  constructor(props) {
    // ALWAYS DO THIS FIRST
    super(props);

    // DISPLAY WHERE WE ARE
    console.log("App constructor");

    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS();

    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recentLists = localStorage.getItem("recentList");
    console.log("recentLists: " + recentLists);
    if (!recentLists) {
      recentLists = JSON.stringify(testData.toDoLists);
      localStorage.setItem("toDoLists", recentLists);
    }
    recentLists = JSON.parse(recentLists);
    
    // FIND OUT WHAT THE HIGHEST ID NUMBERS ARE FOR LISTS
    let highListId = -1;
    let highListItemId = -1;
    for (let i = 0; i < recentLists.length; i++) {
      let toDoList = recentLists[i];
      if (toDoList.id > highListId) {
        highListId = toDoList.id;
      }
      for (let j = 0; j < toDoList.items.length; j++) {
        let toDoListItem = toDoList.items[j];
        if (toDoListItem.id > highListItemId)
        highListItemId = toDoListItem.id;
      }
    };

    // SETUP OUR APP STATE
    this.state = {
      toDoLists: recentLists,
      currentList: {items: []},
      nextListId: highListId+1,
      nextListItemId: highListItemId+1,
      isModalOpen:false,
      useVerboseFeedback: true,
    }
  }

  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    console.log("loading " + toDoList);
    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(testList =>
      testList.id !== toDoList.id
    );
    nextLists.unshift(toDoList);

    this.setState({
      toDoLists: nextLists,
      currentList: toDoList,
      topBackgroundColor:"#ffc800",
      topColor:"black"
    },this.afterToDoListsChangeComplete);
  }

  editListName = (newName) => {
    this.state.currentList.name=newName;
    this.setState({
      currentList:this.state.currentList
    }, this.afterToDoListsChangeComplete)
  }

  addNewList = () => {
    let newToDoListInList = [this.makeNewToDoList()];
    let newToDoListsList = [...newToDoListInList, ...this.state.toDoLists];
    let newToDoList = newToDoListInList[0];

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      toDoLists: newToDoListsList,
      currentList: newToDoList,
      nextListId: this.state.nextListId+1,
      
    }, this.afterToDoListsChangeComplete);
  }

  addItemTransaction = () => {
    let transaction=new AddNewItem_Transaction(this);
    this.tps.addTransaction(transaction);
  }

  addItem = () => {
    let newItem=[this.makeNewToDoListItem()]
    let newItemSet=[...this.state.currentList.items,...newItem];
    let newList={
      id:this.state.currentList.id,
      name:this.state.currentList.name,
      items:newItemSet
    }
    let newLists=this.state.toDoLists.slice(1);
    newLists.unshift(newList);
    this.setState({
      toDoLists:newLists,
      currentList:newList,
      nextListItemId:this.state.nextListItemId+1
    },this.afterToDoListsChangeComplete);
    return newItem[0];
  }

  showDeleteModal = () => {
    if(this.state.toDoLists.includes(this.state.currentList)){
      this.setState({
        isModalOpen:true
      });
    }
  }

  deleteList = () => {
    let newLists=this.state.toDoLists.slice(1);
    this.closeList();
    this.setState({
      toDoLists:newLists,
      isModalOpen:false
    },this.afterToDoListsChangeComplete)
  }

  closeList = () => {
    this.tps.clearAllTransactions();
    this.setState({
      currentList:{items:[]},
      topBackgroundColor:"",
      topColor:""
    })
  }

  makeNewToDoList = () => {
    let newToDoList = {
      id: this.state.nextListId,
      name: 'Untitled',
      items: []
    };
    return newToDoList;
  }

  makeNewToDoListItem = () =>  {
    let newToDoListItem = {
      id:this.state.nextListItemId,
      description: "No Description",
      due_date: "none",
      status: "incomplete"
    };
    return newToDoListItem;
  }

  editItemNameTransaction = (oldName, newName, item) => {
    let transaction = new TaskEdit_Transaction(this, oldName, newName, item);
    this.tps.addTransaction(transaction);
  }
  editItemName = (item, newName) => {
    item.description=newName;
    this.setState({
      currentList:this.state.currentList
    },this.afterToDoListsChangeComplete);
  }

  editItemDueDateTransaction = (oldDate, newDate, item) => {
    let transaction = new DueDateEdit_Transaction(this, oldDate, newDate, item);
    this.tps.addTransaction(transaction);
  }

  editItemDueDate = (item, newDueDate) => {
    console.log(item);
    item.due_date=newDueDate;
    this.setState({
      currentList:this.state.currentList
    }, this.afterToDoListsChangeComplete)
  }
  
  editStatusTransaction = (oldStatus, newStatus, item) => {
    let transaction = new StatusEdit_Transaction(this, oldStatus, newStatus, item);
    this.tps.addTransaction(transaction);
  }
  editStatus = (item, newStatus) => {
    item.status=newStatus;
    this.setState({
      currentList:this.state.currentList
    }, this.afterToDoListsChangeComplete)
  }

  moveItemUpTransaction = (item) => {
    let transaction = new MovingItemUp_Transaction(this, item);
    this.tps.addTransaction(transaction);
  }

  moveItemUp = (item) => {
    let index=this.state.currentList.items.indexOf(item);
    if(index>0){
      const nextItems=this.state.currentList.items.filter(testItem => testItem.id!=item.id);
      nextItems.splice(index-1,0,item);
      let newList={
        id:this.state.currentList.id,
        name:this.state.currentList.name,
        items:nextItems};
      let newLists=this.state.toDoLists.slice(1);
      newLists.unshift(newList);
      this.setState({
        currentList:newList,
        toDoLists:newLists
      }, this.afterToDoListsChangeComplete)
    }
  }

  moveItemDownTransaction = (item) => {
    let transaction = new MovingItemDown_Transaction(this, item);
    this.tps.addTransaction(transaction);
  }

  moveItemDown = (item) => {
    let index=this.state.currentList.items.indexOf(item);
    if(index<this.state.currentList.items.length-1){
      const prevItems=this.state.currentList.items.filter(testItem => testItem.id!=item.id);
      prevItems.splice(index+1,0,item);
      let newList={
        id:this.state.currentList.id,
        name:this.state.currentList.name,
        items:prevItems
      };
      let newLists=this.state.toDoLists.slice(1);
      newLists.unshift(newList);
      this.setState({
        currentList:newList,
        toDoLists:newLists
      }, this.afterToDoListsChangeComplete);
    }
  }

  deleteItemTransaction = (item) => {
    let transaction = new DeleteItem_Transaction(this, item, this.state.currentList.items.indexOf(item));
    this.tps.addTransaction(transaction);
  }

  deleteItem = (item) => {
    let newLists=this.state.toDoLists.slice(1);
    let newItems=this.state.currentList.items.filter(testItem => testItem.id!=item.id);
    let newList={
      id:this.state.currentList.id,
      name:this.state.currentList.name,
      items:newItems
    }
    newLists.unshift(newList);
    this.setState({
      currentList:newList,
      toDoLists:newLists
    }, this.afterToDoListsChangeComplete);
  }

  /**
   * Adds a initialized item to the current list at a specific index
   */
  addItemToCurrentList = (item, index) => {
    let newItems=[...this.state.currentList.items];
    newItems.splice(index,0,item);
    let newList={
      id:this.state.currentList.id,
      name:this.state.currentList.name,
      items:newItems
    }

    let newLists=this.state.toDoLists.slice(1);
    newLists.unshift(newList);
    this.setState({
      toDoList:newLists,
      currentList:newList
    }, this.afterToDoListsChangeComplete);
  }

  redo = () => {
    if(this.tps.hasTransactionToRedo()){
      this.tps.doTransaction();
    }
  }

  undo = () => {
    if(this.tps.hasTransactionToUndo()){
      this.tps.undoTransaction();
    }
  }
  
  
  // THIS IS A CALLBACK FUNCTION FOR AFTER AN EDIT TO A LIST
  afterToDoListsChangeComplete = () => {
    console.log("App updated currentToDoList: " + this.state.currentList);

    // WILL THIS WORK? @todo
    let toDoListsString = JSON.stringify(this.state.toDoLists);
    localStorage.setItem("recentLists", toDoListsString);
  }

  render() {
    let items = this.state.currentList.items;
    return (
      <div id="root">
        <Navbar />
        <LeftSidebar 
          toDoLists={this.state.toDoLists}
          loadToDoListCallback={this.loadToDoList}
          addNewListCallback={this.addNewList}
          editListNameCallback={this.editListName}
          redoCallback={this.redo}
          undoCallback={this.undo}
          topBackgroundColor={this.state.topBackgroundColor}
          topColor={this.state.topColor}
          
        />
        <Workspace 
          toDoListItems={items} 
          editItemNameCallback={this.editItemNameTransaction}
          editDueDateCallback={this.editItemDueDateTransaction}
          editStatusCallback={this.editStatusTransaction}
          moveItemUpCallback={this.moveItemUpTransaction}
          moveItemDownCallback={this.moveItemDownTransaction}
          deleteItemCallback={this.deleteItemTransaction}
          addItemCallback={this.addItemTransaction}
          deleteListCallback={this.showDeleteModal}
          closeListCallback={this.closeList}
        />
        {this.state.isModalOpen?
          (
            <div className='modal'>
              <div className='modal-container'>
                  <h1>Delete List</h1>
                  <p>Are you sure you want to delete this list?</p>
                    <button 
                      type='button'
                      id='listCancel'
                      onClick={() => {this.setState({isModalOpen:false})}}
                    >
                      Cancel
                    </button>
                    <button
                      type='button'
                      id='listDelete'
                      onClick={this.deleteList}
                    >
                      Delete
                    </button>
              </div>
            </div>
          ):null
        }
      </div>
    );
  }
}

export default App;