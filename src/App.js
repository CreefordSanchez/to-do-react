import { useReducer, useRef } from "react";
import TaskBox from "./compoment/TaskBox.jsx";

 const  getDate = () => {
        const option = {
            month: 'long',      
            day: '2-digit',     
            hour: '2-digit',    
            minute: '2-digit',   
            hour12: true         
        };

        return new Date().toLocaleDateString('en-ca', option);
    }

const reducer = (state, type) => {
    switch(type.action) {
        case 'Add': 
            if (type != null && type.obj.Text != '') {
                localStorage.setItem(type.obj.Id, JSON.stringify(type.obj));
                return [...state, type.obj];
            }
            return state;
        case 'Check':
            return state.map((item, index) => {
                if (index == type.target) {
                    item.Color = 'green';
                    localStorage.setItem(item.Id, JSON.stringify(item));
                    return item;
                }
                return item;
            });
        case 'Delete':
            localStorage.removeItem(type.target);
            return state.filter(item => item.Id != type.target);
        case 'Edit':
            if (type.newText != '')
            return state.map((item, index) => {
                if (index == type.target) {
                    item.Text = type.newText;
                    item.Date = getDate();
                    localStorage.setItem(item.Id, JSON.stringify(item));
                    return item;
                }
                return item;
            }); 
            else return state;
        default:
            return state;
    }
}


function App() {
    const loadTask = () => {
        const getValue = Object.values(localStorage);
        const getId = Object.keys(localStorage);
        const newArr = getValue.map((value, index) => {
            const item = JSON.parse(value);
            
            return {...item, Id: getId[index]};
        });

        return newArr;
    }

   

    const textInput = useRef(null);
    const [taskList, dispatch] = useReducer(reducer, loadTask());
    
    const addForm = () => {
        dispatch({action: 'Add', obj: {Text: textInput.current.value, Date: getDate(), Color: 'red', Id:Date.now()}});
        textInput.current.value = '';
    };

    const checkTask = (index) => {
        dispatch({action: 'Check', target: index});
    }

    const deleteTask = (index) => {
        dispatch({action: 'Delete', target: index});
    }

    const editTask = (index, text) => {
        dispatch({action: 'Edit', newText: text, target: index, })
    };

    return (
        <main>
            <div className="create-form-container">
                <h1>To do App</h1>
                <form>
                    <input className="create-text" type="text" ref={textInput}/>
                    <button className="create-button" type="button" onClick={addForm}>Add</button>
                </form>
            </div>
            <div className="task-table">
                {taskList.map((task, key) => 
                    <TaskBox 
                        key={key} 
                        Index={key} 
                        Id={task.Id}
                        Color={task.Color} 
                        Text={task.Text} 
                        Date={task.Date} 
                        CheckTask={checkTask}
                        DeleteTask={deleteTask}
                        EditTask={editTask}
                    />
                )}
            </div>
        </main>
    )
}

export default App;