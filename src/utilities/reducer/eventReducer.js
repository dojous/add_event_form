import { actionsTypes } from "../../utilities/utilities";

let initialState = {
  formValues: {},
  errors: {},
  allowToSubmit: false,
  isAdded: false,
  eventList: []
};

let reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.onChangeForm:
      return { ...state, formValues: action.payload };
    case actionsTypes.validateForm:
      return { ...state, errors: action.payload };
    case actionsTypes.allowFormToSubmit:
      return { ...state, allowToSubmit: action.payload };
    case actionsTypes.isEventAdded:
      return { ...state, isAdded: action.payload };

    case actionsTypes.updateEventList:
      return { ...state, eventList: action.payload };

    case actionsTypes.reset:
      return { ...state, formValues: {}, errors: {} };

    default:
      return { ...state };
  }
};

export { initialState, reducer };
