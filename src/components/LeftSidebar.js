// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import ListLink from './ListLink'
import AddBox from '@material-ui/icons/AddBox';
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
class LeftSidebar extends Component {
    constructor(props) {
        super(props);
    }

    handleAddNewList = () => {
        this.props.addNewListCallback();
    }

    handleUndo = () => {
        this.props.undoCallback();
    }

    handleRedo = () => {
        this.props.redoCallback();
    }

    render() {
        return (
            <div id="left-sidebar">
                <div id="left-sidebar-header" class="section-header">
                    <span class="left-sidebar-header-text">Todolists</span>
                    <span class="left-sidebar-controls" id="add-undo-redo-box">
                        <AddBox id="add-list-button" className="material-icons todo_button" onClick={this.handleAddNewList} />
                        <Undo id="undo-button" className="list-item-control material-icons todo-button" onClick={this.handleUndo}/>
                        <Redo id="redo-button" className="list-item-control material-icons todo-button" onClick={this.handleRedo}/>
                    </span>
                </div>
                <div id="todo-lists-list">
                {
                    this.props.toDoLists.map((toDoList) => (
                        <ListLink
                            key={toDoList.id}
                            toDoList={toDoList}                                // PASS THE LIST TO THE CHILDREN
                            loadToDoListCallback={this.props.loadToDoListCallback}// PASS THE CALLBACK TO THE CHILDREN
                            editListNameCallback={this.props.toDoLists.indexOf(toDoList)==0?this.props.editListNameCallback:null}
                            backgroundColor={this.props.toDoLists.indexOf(toDoList)==0? this.props.topBackgroundColor:null}
                            color={this.props.toDoLists.indexOf(toDoList)==0? this.props.topColor:null}
                            
                        />  
                    ))
                }
                </div>
            </div>
        );
    }
}

export default LeftSidebar;