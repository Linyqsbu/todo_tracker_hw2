// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';

class ToDoItem extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            taskEditable:false,
            dueDateEditable:false,
            statusEditable:false
        }
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " constructor");
    }

    editTaskName = () => {
        this.setState({
            taskEditable:true
        })
    }

    submitTaskName = (event) => {
        this.props.editItemNameCallback(this.props.toDoListItem, event.target.value);
        this.setState({
            taskEditable:false
        })
    }

    submitDueDate = (event) => {
        this.props.editDueDateCallback(this.props.toDoListItem, event.target.value);
        this.setState({
            dueDateEditable:false
        })
    }

    submitStatus = (event) => {
        this.props.editStatusCallback(this.props.toDoListItem, event.target.value)
        this.setState({
            statusEditable:false
        })
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " did mount");
    }

    handleMoveItemUp = () => {
        this.props.moveItemUpCallback(this.props.toDoListItem);
    }

    handleMoveItemDown = () => {
        this.props.moveItemDownCallback(this.props.toDoListItem);
    }

    handleDeleteItem =() => {
        this.props.deleteItemCallback(this.props.toDoListItem);
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem render");
        let listItem = this.props.toDoListItem;
        let statusType = "status-complete";
        if (listItem.status === "incomplete")
            statusType = "status-incomplete";

        return (
            <div id={'todo-list-item-' + listItem.id} className='list-item-card'>

                {!this.state.taskEditable?
                    <div className='item-col task-col' onClick={this.editTaskName}>
                        {listItem.description}
                    </div>:
                    <input 
                        type="text" 
                        defaultValue={listItem.description} 
                        onBlur={(e) => this.submitTaskName(e)}
                        autoFocus
                    >
                    </input>
                }

                {!this.state.dueDateEditable?
                    <div 
                        className='item-col due-date-col'
                        onClick={() => {this.setState({dueDateEditable:true})}}
                    >
                        {listItem.due_date}
                    </div>:
                    <input 
                        type="date"
                        defaultValue={listItem.due_date}
                        onBlur={(e) => this.submitDueDate(e)}
                        autoFocus
                    >
                    </input>
                }

                {!this.state.statusEditable?
                    <div 
                        className='item-col status-col' 
                        className={statusType}
                        onClick={() => {this.setState({statusEditable:true})}}
                    >
                        {listItem.status}
                    </div>:
                    <select
                        defaultValue={listItem.status}
                        onBlur={(e) => this.submitStatus(e)}
                        autoFocus
                    >
                        <option value="complete">complete</option>
                        <option value="incomplete">incomplete</option>
                    </select>
                }

                <div className='item-col test-4-col'></div>
                <div className='item-col list-controls-col'>
                    <KeyboardArrowUp 
                        className='list-item-control todo-button' 
                        onClick={this.handleMoveItemUp}
                    />
                    <KeyboardArrowDown 
                        className='list-item-control todo-button' 
                        onClick={this.handleMoveItemDown}
                    />
                    <Close 
                        className='list-item-control todo-button' 
                        onClick={this.handleDeleteItem}
                    />
                    <div className='list-item-control'></div>
        <div className='list-item-control'></div>
                </div>
            </div>
        )
    }
}

export default ToDoItem;