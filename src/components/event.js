import React from "react";
import { dateFormat } from "../utilities/utilities";
import { useEvent } from "../utilities/context/contextForm";
const Event = ({ event }) => {
  const { removeEvent, acceptEvent } = useEvent();

  let id = event._id;

  const resetHandling = () => removeEvent(id);
  const acceptHandling = () => acceptEvent(id);

  return (
    <>
      <tr>
        <td data-label="id">{id}</td>
        <td data-label="firstname">{event.firstname}</td>
        <td data-label="lastname">{event.lastname}</td>
        <td data-label="email">{event.email}</td>
        <td data-label="eventname">{event.eventname}</td>
        <td data-label="eventdate">{dateFormat(event.eventdate)}</td>
        <td data-label="createddate"> {event.createddate}</td>
        <td className="center aligned">
          {event.accepted && <i className="large green checkmark icon"></i>}
        </td>

        <td>
          {!event.accepted && (
            <button
              className="ui positive basic button"
              onClick={acceptHandling}
            >
              Accept
            </button>
          )}{" "}
          <button className="ui negative  basic button" onClick={resetHandling}>
            Remove
          </button>
        </td>
      </tr>
    </>
  );
};
export default Event;
