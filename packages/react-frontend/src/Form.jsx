import React, { useState } from "react";

function Form(props) {
  const [person, setPerson] = useState({
    name: "",
    job: ""
  });
  return (
    <form> 
        <label htmlFor="name"></label>
        <input
        type="text"
        name="name"
        id="name"
        value={person.name}
        onChange={handleChange}
        />
        <label htmlFor="job"></label>
        <input
        type="text"
        name="job"
        id="job"
        value={person.job}
        onChange={handleChange}
        />
          <input type="button" value="Submit" onClick={submitForm} />
    </form>
);
function handleChange(event) {
    const {name, value} = event.target;
    if (name == "job")
        setPerson({ name: person["name"], job: value }); 
    else setPerson({ name: value, job: person["job"]});
}
function submitForm() {
  props.handleSubmit(person);
  setPerson({ name: "", job: "" });

}
}
export default Form;