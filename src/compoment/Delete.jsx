function Delete(prop) {
    return (
        <button onClick={prop.DeleteTask}><i className="fa-solid fa-trash"></i></button>
    )
}

export default Delete;