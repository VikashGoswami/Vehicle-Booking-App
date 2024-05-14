// import { Vehicle } from '../../models/Vehicle'; // Import the Vehicle model

const Vehicle = require('../../models/Vehicle');

export default async function handler(req, res) {
    const { vehicleTypeId } = req.query;

    console.log(req)

    try {
        const vehicles = await Vehicle.findAll({
            where: {
                vehicleTypeId,
            },
        });

        // Ensure the response is JSON formatted
        res.status(200).json(vehicles);
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
