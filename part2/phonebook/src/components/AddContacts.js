import React from 'react';

const AddContact = ({newName, handleName, newPhone, handlePhone, handleSubmit, text}) => {
    return (
        <div>
        <h2>{text}</h2>
      <form>
        <div>
          name:<input 
          value={newName}
          onChange={handleName}
          />
          phone: <input 
          value={newPhone}
          onChange={handlePhone}/>
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
      </div>
    )
}

export default AddContact