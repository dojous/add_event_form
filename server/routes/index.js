const express = require("express");
const router = express.Router();
const { Events, validate } = require("../models/event");

router
  .get("/ping", (req, res) => res.send("OK"))

  .post("/addevent", async (req, res) => {
    const { error } = validate(req.body);
    if (error)
      return res.json({
        msg: "Something went wrong:" + error.details[0].message,
        status: 404
      });

    let email = req.body.email;
    await Events.findOne({ email }, function(err, receivedEmail) {
      if (!err) {
        if (receivedEmail === null) {
          const item = new Events({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            eventdate: req.body.eventdate,
            eventname: req.body.eventname,
            createddate: new Date()
          });

          item.save(function(error) {
            if (!error) {
              res.json({ msg: "Event saved successfully.", status: 200 });
            } else {
              res.json({ msg: "Something went wrong..", status: 404 });
            }
          });
        } else {
          res.json({
            msg: "An entry for provided email already exists in data base.",
            status: 200,
            info: true
          });
        }
      } else {
        res.json({ msg: "Something went wrong..", status: 404 });
      }
    });
  })
  .get("/getAllEvents", async (req, res) => {
    await Events.find({})
      .sort({ createddate: -1 })
      .exec(function(err, events) {
        if (!err) {
          res.json({ msg: "Retrived Successfully", status: 200, data: events });
        } else {
          res.json({
            msg: "Something went wrong..",
            status: 404,
            data: events
          });
        }
      });
  })
  .put("/acceptEvent/:id", async (req, res) => {
    let id = req.params.id;
    let updateId = { _id: id };
    let newvalues = { $set: { accepted: true } };

    await Events.updateOne(updateId, newvalues, function(err, events) {
      if (!err) {
        res.json({
          msg: "Event has been accepted successfully",
          status: 200,
          data: events
        });
      } else {
        res.json({ msg: "Something went wrong..", status: 400, data: events });
      }
    });
  })
  .delete("/deleteEvent/:id", async (req, res) => {
    let id = req.params.id;
    await Events.deleteOne({ _id: id }, function(err, events) {
      if (!err) {
        res.json({
          msg: "Event has been removed successfully",
          status: 404,
          data: events
        });
      } else {
        res.json({ msg: "Something went wrong..", status: 404, data: events });
      }
    });
  })
  .delete("/deleteAllEvents", async (req, res) => {
    await Events.deleteMany({}, function(err, events) {
      if (!err) {
        res.json({
          msg: "All events have been deleted successfully",
          status: 200,
          data: events
        });
      } else {
        res.json({ msg: "Something went wrong..", status: 400, data: events });
      }
    });
  });

module.exports = router;
