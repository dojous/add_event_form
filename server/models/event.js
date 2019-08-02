var mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const Events = mongoose.model(
  "Events",
  new mongoose.Schema({
    firstname: { type: String, Required: "First name cannot be left blank." },
    lastname: { type: String, Required: "LastName cannot be left blank" },
    email: { type: String, Required: "Email cannot be left blank." },
    eventdate: { type: Date, Required: "Event date cannot be left blank." },
    eventname: { type: String, Required: "Event namer cannot be left blank." },
    createddate: { type: Date, Required: "Created date cannot be left blank." },
    accepted: { type: Boolean }
  })
);

function validateEvent(event) {
  const schema = {
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string()
      .required()
      .email(),
    eventdate: Joi.date().required(),
    eventname: Joi.string().required()
  };

  return Joi.validate(event, schema);
}

exports.Events = Events;
exports.validate = validateEvent;
