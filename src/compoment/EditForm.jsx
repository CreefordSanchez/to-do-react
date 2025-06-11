import { useRef, useState } from "react";

function EditForm(prop) {
    const newText = useRef('');
    const [showForm, setShowForm] = useState(false);
    const showButton = () => {
        setShowForm(!showForm);
    }
    return (
        <div className="form-edit-container">
            <button onClick={showButton}><i className="fa-solid fa-pen-to-square"></i></button>

            <form className={showForm ? 'show-form' : 'hide-form'}>
                <label>New Text: </label>
                <input type="text" ref={newText}/>
                <button className="submit-edit" onClick={() => prop.EditTask(prop.Index, newText.current.value)}>Edit</button>
            </form>
        </div>
    )
}

export default EditForm;