import React from "react";
import Event from "./event";
import { useEvent } from "../utilities/context/contextForm";

const EventsTable = () => {
  const { eventList, deleteAllEvents } = useEvent();

  if (eventList.length > 0) {
    return (
      <>
        <div className="ui horizontal segments">
          <div className="ui segment">
            <button
              className="ui negative  basic button"
              onClick={deleteAllEvents}
            >
              Remove all events
            </button>
          </div>
        </div>

        <table className="ui celled  table">
          <thead>
            <tr>
              <th>id</th>
              <th>First Name</th>
              <th>Last name</th>
              <th>Email</th>
              <th>Event Name</th>
              <th>Event Date</th>
              <th>Creation Date</th>
              <th>Accepted</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {eventList != null &&
              eventList.map(item => <Event key={item._id} event={item} />)}
          </tbody>
        </table>
      </>
    );
  }
  return (
    <div className="ui icon message">
      <i className="notched circle loading icon"></i>
      <div className="content">
        <div className="header">Just one second</div>
        <p>We're trying to retirve all events for YOU.</p>
      </div>
    </div>
  );
};

export default EventsTable;
