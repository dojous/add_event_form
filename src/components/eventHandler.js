import React from "react";
import EventsTable from "./eventsTable";
import "react-datepicker/dist/react-datepicker.css";
import "semantic-ui-css/semantic.min.css";
import EventForm from "../components/eventForm";

const EventHandler = () => {
  return (
    <>
      <div className="ui center aligned container">
        <EventForm />
      </div>

      <EventsTable />
    </>
  );
};
export default EventHandler;
