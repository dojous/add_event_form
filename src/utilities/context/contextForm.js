import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { API_URL } from "../../config";
import { dateFormat, actionsTypes } from "../../utilities/utilities";
import validateForm from "../../utilities/validateForm";
import { toast } from "react-toastify";
import { initialState, reducer } from "../../utilities/reducer/eventReducer";

const ContextForm = React.createContext();

const ContextFormProvider = ({ children }) => {
  let [state, dispatch] = useReducer(reducer, initialState);

  const { formValues, errors, allowToSubmit, isAdded, eventList } = state;
  const { firstname, lastname, email, eventname, eventdate } = formValues;

  const addEvent = async data => {
    await axios
      .post(`${API_URL}/addevent`, data)
      .then(function(res) {
        dispatch({ type: actionsTypes.isEventAdded, payload: true });

        if (!res.data.info) {
          toast.success(res.data.msg, { autoClose: 1000 });
        } else {
          toast.info(res.data.msg, { autoClose: 1000 });
        }
      })
      .catch(function(error) {
        toast.error("We are sorry, but we have: " + error.message);
        toast.info("Please check server connection");
      });
  };

  const removeEvent = async id => {
    await axios
      .delete(`${API_URL}/deleteEvent/${id}`)
      .then(function(res) {
        dispatch({ type: actionsTypes.isEventAdded, payload: true });

        toast.info(res.data.msg);
      })
      .catch(function(error) {
        toast.error("We are sorry, but we have: " + error.message);
        toast.info("Please check server connection");
      });
  };

  const acceptEvent = async id => {
    await axios
      .put(`${API_URL}/acceptEvent/${id}`)
      .then(function(res) {
        dispatch({ type: actionsTypes.isEventAdded, payload: true });

        toast.success(res.data.msg);
      })
      .catch(function(error) {
        toast.error("We are sorry, but we have: " + error.message);
        toast.info("Please check server connection");
      });
  };

  useEffect(() => {
    const getAllEvents = async () => {
      await axios
        .get(`${API_URL}/getAllEvents`)
        .then(res => {
          dispatch({
            type: actionsTypes.updateEventList,
            payload: res.data.data
          });
          dispatch({ type: actionsTypes.isEventAdded, payload: false });
        })

        .catch(error => {
          toast.error("We are sorry, but we have: " + error.message);
          toast.info("Please check server connection");
        });
    };
    getAllEvents();
  }, [isAdded]);

  const deleteAllEvents = async () => {
    await axios
      .delete(`${API_URL}/deleteAllEvents`)
      .then(function(res) {
        dispatch({ type: actionsTypes.isEventAdded, payload: true });
        toast.info(res.data.msg);
      })
      .catch(function(error) {
        toast.error("We are sorry, but we have: " + error.message);
        toast.info("Please check server connection");
      });
  };

  const addEventHandler = () => {
    let event = {
      firstname: firstname,
      lastname: lastname,
      eventname: eventname,
      eventdate: dateFormat(eventdate),
      email: email
    };

    addEvent(event);
  };

  const submitData = event => {
    if (event) event.preventDefault();

    dispatch({
      type: actionsTypes.validateForm,
      payload: validateForm(formValues)
    });
    dispatch({ type: actionsTypes.allowFormToSubmit, payload: true });
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && allowToSubmit) {
      addEventHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const onChangeDatePicker = date => {
    dispatch({
      type: actionsTypes.onChangeForm,
      payload: { ...formValues, eventdate: date }
    });
  };

  const handleOnChange = event => {
    dispatch({
      type: actionsTypes.onChangeForm,
      payload: { ...formValues, [event.target.name]: event.target.value }
    });
  };

  const reset = event => {
    event.preventDefault();

    dispatch({ type: actionsTypes.allowFormToSubmit, payload: false });
    dispatch({ type: actionsTypes.reset });
  };

  const value = {
    submitData,
    handleOnChange,
    formValues,
    errors,
    onChangeDatePicker,
    deleteAllEvents,
    eventList,
    removeEvent,
    acceptEvent,
    reset
  };

  return <ContextForm.Provider value={value}>{children}</ContextForm.Provider>;
};

export const useEvent = () => {
  const context = useContext(ContextForm);

  return context;
};

export default ContextFormProvider;
