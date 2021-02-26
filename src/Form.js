import React from "react";
import { useHistory } from "react-router-dom";

const Form = (props) => {
  let history = useHistory();

  //Grab the product ID from the URL
  const prodID = props.match.params.id;
  console.log("FORM product ID: ", prodID);

  //Create an empty review variable to initialize the state
  const emptyReview = {
    title: "enter title",
    content: "enter content",
    author: "enter name",
    product_id: prodID,
  };

  //STATE FOR THE FORM
  const [formData, setFormData] = React.useState(emptyReview);
  console.log("Form - props ", props);
  console.log("FORM DATA initail state: ", formData);

  // ========== FUNCTIONS ==========
  // This handle submit function will call the handle submit from parent.. which is to crete
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent Form from Refreshing
    props.handleSubmit(formData); // Submit to Parents desired function
    //   //props.history.push("/"); //Push back to display page
    console.log("FORM - submitted: ", formData);
    history.push("/");
  };

  // -- Everytime you tye, you see consolelog changes. When finished typing, the setFormData will update state to current form state. So when you submit, it will pass the info back to App to handle. ---
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label for="title">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label for="author">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </div>

        <div>
          <label for="content">Write Review</label>
          <input
            type="text"
            name="content"
            value={formData.content}
            onChange={handleChange}
          />
        </div>

        <input type="submit" value={props.label} />
      </form>
    </div>
  );
};

export default Form;
