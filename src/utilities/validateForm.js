function validateForm(inputValues) {
  let errors = {};

  if (!inputValues.email) {
    errors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(inputValues.email)) {
    errors.email = "Email address is invalid";
  }
  if (!inputValues.firstname) {
    errors.firstname = "First name is required";
  }
  if (!inputValues.lastname) {
    errors.lastname = "Last name is required";
  }
  if (!inputValues.eventname) {
    errors.eventname = "Event name is required";
  }

  if (!inputValues.eventdate) {
    errors.eventdate = "Event date is required";
  }

  return errors;
}

export default validateForm;
