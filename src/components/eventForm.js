import React from "react";
import DatePicker from "react-datepicker";
import { useEvent } from "../utilities/context/contextForm";

const EventForm = () => {
  const {
    formValues,
    submitData,
    errors,
    handleOnChange,
    onChangeDatePicker,
    reset,
    eventList
  } = useEvent();
  const { firstname, lastname, email, eventname, eventdate } = formValues;

  return (
    <>
      <div className="ui  huge horizontal  statistic">
        <div className="value">{eventList.length}</div>
        <div className="label">Events</div>
      </div>

      <div className="ui red three item inverted menu">
        <p className="item">ADD EVENT FORM</p>
      </div>
      <form className="ui form" onSubmit={submitData}>
        <div className="fields">
          <div
            className={`seven wide field ${errors.firstname ? "error" : ""}`}
          >
            <label htmlFor="">First name </label>
            <input
              type="text"
              name="firstname"
              className="form-control"
              value={firstname || ""}
              onChange={handleOnChange}
            ></input>
            {errors.firstname && (
              <div className="ui basic red pointing prompt label transition visible">
                {errors.firstname}
              </div>
            )}
          </div>
          <div className={`seven wide field ${errors.lastname ? "error" : ""}`}>
            <label htmlFor="">Last name </label>
            <input
              type="text"
              name="lastname"
              className="form-control"
              value={lastname || ""}
              onChange={handleOnChange}
            ></input>
            {errors.lastname && (
              <div className="ui basic red pointing prompt label transition visible">
                {errors.lastname}
              </div>
            )}
          </div>
        </div>

        <div className="fields">
          <div className={`seven wide field ${errors.email ? "error" : ""}`}>
            <label htmlFor="">Email </label>
            <input
              type="text"
              name="email"
              className={`form-control ${
                errors.email ? "form-control-danger" : ""
              }`}
              value={email || ""}
              onChange={handleOnChange}
            ></input>
            {errors.email && (
              <div className="ui basic red pointing prompt label transition visible">
                {errors.email}
              </div>
            )}
          </div>

          <div
            className={`three wide field ${errors.eventname ? "error" : ""}`}
          >
            <label htmlFor="">Event name </label>
            <select
              className="ui fluid dropdown"
              onChange={handleOnChange}
              value={eventname || ""}
              name="eventname"
            >
              <option value=""></option>
              <option value="Kurs React">Kurs React</option>
              <option value="Kurs JS">Kurs JS</option>
              <option value="Kurs JAVA">Kurs JAVA</option>
              <option value="Kurs SQL">Kurs SQL</option>
              <option value="Konferencja React">Konferencja React</option>
              <option value="Konferencja JS">Konferencja JS</option>
              <option value="Konferencja JAVA">Konferencja JAVA</option>
              <option value="Konferencja SQL">Konferencja SQL</option>
            </select>
            {errors.eventname && (
              <div className="ui basic red pointing prompt label transition visible">
                {errors.eventname}
              </div>
            )}
          </div>

          <div
            className={`three wide field ${errors.eventdate ? "error" : ""}`}
          >
            <label htmlFor="">Event date </label>
            <DatePicker
              onChange={onChangeDatePicker}
              selected={eventdate || ""}
            />
            {errors.eventdate && (
              <div className="ui basic red  pointing prompt label transition visible">
                {errors.eventdate}
              </div>
            )}
          </div>
        </div>

        <button
          className={`ui primary  basic ${Object.keys(formValues).length ===
            0 && "disabled"} button`}
          type="submit"
        >
          Add event
        </button>
        <button
          className={`ui primary secondary basic ${Object.keys(formValues)
            .length === 0 && "disabled"} button`}
          onClick={reset}
        >
          Reset
        </button>
      </form>
    </>
  );
};

export default EventForm;
