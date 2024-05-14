import { Op } from "sequelize";
const Booking = require("../../models/Booking");

export default async function handler(req, res) {
  const { firstName, lastName, model, startDate, endDate } = req.body;

  const enddateObject = new Date(endDate);
  const endyear = enddateObject.getFullYear();
  const endmonth = enddateObject.getMonth() + 1;
  const endday = enddateObject.getDate();

  const endDateBook = `${endyear}-${endmonth < 10 ? "0" : ""}${endmonth}-${
    endday < 10 ? "0" : ""
  }${endday}`;

  const startdateObject = new Date(startDate);
  const startyear = startdateObject.getFullYear();
  const startmonth = startdateObject.getMonth() + 1;
  const startday = startdateObject.getDate();

  const startDateBook = `${startyear}-${
    startmonth < 10 ? "0" : ""
  }${startmonth}-${startday < 10 ? "0" : ""}${startday}`;

  const vehicleId = parseInt(model);

  try {
    const existingBooking = await Booking.findOne({
      where: {
        vehicleId,
        endDate: {
          [Op.gte]: new Date(startDateBook),
        },
        startDate: {
          [Op.lte]: new Date(endDateBook),
        },
      },
    });

    if (existingBooking) {
      return res
        .status(400)
        .json({ error: "Booking overlaps with an existing booking" });
    }

    const booking = await Booking.create({
      firstName,
      lastName,
      vehicleId,
      startDate,
      endDate,
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
