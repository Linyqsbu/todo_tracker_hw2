// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';

class Workspace extends Component {
    constructor(props) {
        super(props);
    }

    handleAddItem = () => {
        this.props.addItemCallback();
    }

    handleDeleteList = () => {
        this.props.deleteListCallback();
    }

    handleCloseList = () => {
        this.props.closeListCallback();
    }

    render() {
        let buttonType='todo-button';
        if(this.props.isButtonDisable)
            buttonType='deactivated-button';
        return (
            
            <div id="workspace">
                <div id="todo-list-header-card" className="list-item-card">
                    <div id="task-col-header" className="item-col todo-button">Task</div>
                    <div id="date-col-header" className="item-col todo-button">Due Date</div>
                    <div id="status-col-header" className="item-col todo-button">Status</div>
                    <div className="item-col">

                        <AddBox 
                            id="add-item-button" 
                            className={`list-item-control material-icons ${buttonType}`}
                            onClick={this.handleAddItem}
                        />

                        <Delete 
                            id="delete-list-button" 
                            className={`list-item-control material-icons ${buttonType}`}
                            onClick={this.handleDeleteList}
                        />
                        <Close 
                            id="close-list-button" 
                            className={`list-item-control material-icons ${buttonType}`}
                            onClick={this.handleCloseList}
                        />
                    </div>
                </div>
                <div id="todo-list-items-div">
                    {
                        this.props.toDoListItems.map((toDoListItem) => (
                        <ToDoItem
                            key={toDoListItem.id}
                            toDoListItem={toDoListItem}     // PASS THE ITEM TO THE CHILDREN
                            editItemNameCallback={this.props.editItemNameCallback}
                            editDueDateCallback={this.props.editDueDateCallback}
                            editStatusCallback={this.props.editStatusCallback}
                            moveItemUpCallback={this.props.moveItemUpCallback}
                            moveItemDownCallback={this.props.moveItemDownCallback}
                            deleteItemCallback={this.props.deleteItemCallback}
                        />))
                    }
                </div>
                <br />
            </div>
        );
    }
}

export default Workspace;