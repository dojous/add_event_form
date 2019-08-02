import moment from "moment";
const dateFormat = date => {
  let formatted_date = moment(date).format("YYYY-MM-DD");

  return formatted_date;
};

const actionsTypes = {
  onChangeForm: "ON_CHANGE_FORM",
  validateForm: "VALIDATE_FORM",
  allowFormToSubmit: "ALLOW_FORM_TO_SUBMIT",
  isEventAdded: "IS_EVENT_ADDED",
  updateEventList: "UPDATE_EVENT_LIST",
  reset: "RESET"
};

export { dateFormat, actionsTypes };
