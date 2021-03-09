// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS'

// THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'
import AddNewItemTransaction from './transactions/AddNewItemTransaction';
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
    let transaction=new AddNewItemTransaction(this);
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

  deleteList = () => {
    let newLists=this.state.toDoLists.slice(1);
    this.closeList();
    this.setState({
      toDoLists:newLists
    },this.afterToDoListsChangeComplete)
  }

  closeList = () => {
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

  editItemName = (item, newName) => {
    item.description=newName;
    this.setState({
      currentList:this.state.currentList
    },this.afterToDoListsChangeComplete)
  }

  editItemDueDate = (item, newDueDate) => {
    item.due_date=newDueDate;
    this.setState({
      currentList:this.state.currentList
    }, this.afterToDoListsChangeComplete)
  }

  editStatus = (item, newStatus) => {
    item.status=newStatus;
    this.setState({
      currentList:this.state.currentList
    }, this.afterToDoListsChangeComplete)
  }

  moveItemUp = (item) => {
    let index=this.state.currentList.items.indexOf(item);
    if(index>0){
      const nextItems=this.state.currentList.items.filter(testItem => testItem.id!=item.id);
      nextItems.splice(index-1,0,item);
      let newList={items:nextItems};
      this.setState({
        currentList:newList
      }, this.afterToDoListsChangeComplete)
    }
  }

  moveItemDown = (item) => {
    let index=this.state.currentList.items.indexOf(item);
    if(index<this.state.currentList.items.length-1){
      const prevItems=this.state.currentList.items.filter(testItem => testItem.id!=item.id);
      prevItems.splice(index+1,0,item);
      let newList={items:prevItems};
      this.setState({
        currentList:newList
      }, this.afterToDoListsChangeComplete);
    }
  }

  deleteItem = (item) => {
    let newLists=this.state.toDoLists.filter(testList => testList.id!=this.state.currentList.id);
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
          editItemNameCallback={this.editItemName}
          editDueDateCallback={this.editItemDueDate}
          editStatusCallback={this.editStatus}
          moveItemUpCallback={this.moveItemUp}
          moveItemDownCallback={this.moveItemDown}
          deleteItemCallback={this.deleteItem}
          addItemCallback={this.addItemTransaction}
          deleteListCallback={this.deleteList}
          closeListCallback={this.closeList}
        />
      </div>
    );
  }
}

export default App;