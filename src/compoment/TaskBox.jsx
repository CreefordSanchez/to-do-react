import Check from './Check';
import Delete from './Delete';
import EditForm from './EditForm';

function TaskBox(prop) {
    return (
        <div className={`task-box ${prop.Color}`}>
            <p>{prop.Text}</p>
            <div className="task-footer">
                <p>{prop.Date}</p>
                <div className="task-button">
                    <Check CheckTask={() => prop.CheckTask(prop.Index)} />
                    <Delete DeleteTask={() => prop.DeleteTask(prop.Id)}/>
                    <EditForm EditTask={prop.EditTask} OldText={prop.Text} Index={prop.Index}/>
                </div>
            </div>            
        </div>
    )
}

export default TaskBox;