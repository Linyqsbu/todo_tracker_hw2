// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'


class ListLink extends Component {
    constructor(props) {
        super(props);
        this.state={
            value:this.props.toDoList.name,
            editable:false
        }
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    handleLoadList = () => {
        setTimeout(()=> {this.props.loadToDoListCallback(this.props.toDoList);}, 100);
    }

    submitNameChange = (event) => {
        this.props.editListNameCallback(event.target.value);
        this.setState({
            editable:false
        })
    }

    handleNameChange = () => {
        if(this.props.editListNameCallback){
            this.setState({
                editable:true
            });
        }
    }

    editName = (event) => {
        this.setState({
            value:event.target.value,
        })
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink render");

        return !this.state.editable?(
            <div
                className='todo-list-button'
                onClick={this.handleLoadList}
                onDoubleClick={this.handleNameChange}
                style={{backgroundColor:this.props.backgroundColor, color:this.props.color}}
            >
                {this.state.value}<br/>
            </div>
        ):
        (
            <div>
                <input 
                    type="text"
                    value={this.state.value}
                    onBlur={(e) => this.submitNameChange(e)}
                    onChange={(e) => this.editName(e)}
                    autoFocus
                >
                </input>
            </div>
        );
        
    }
}

export default ListLink;