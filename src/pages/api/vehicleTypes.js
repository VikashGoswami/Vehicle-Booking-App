const VehicleType = require('../../models/VehicleType');

export default async function handler(req, res) {
    const { wheels } = req.query;

    try {
        const types = await VehicleType.findAll({
            where: {
                wheels,
            },
        });

        res.status(200).json(types);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
