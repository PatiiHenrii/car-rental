const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let cars = [
  {
    "id": "1",
    "manufacturer": "Toyota",
    "model": "Corolla",
    "license_plate": "ABC-1234",
    "year": 2022,
    "rate_per_day": 45,
    "status": "active"
  },
  {
    "id": "2",
    "manufacturer": "Honda",
    "model": "Civic",
    "license_plate": "XYZ-5678",
    "year": 2023,
    "rate_per_day": 50,
    "status": "inactive"
  },
  {
    "id": "3",
    "manufacturer": "Ford",
    "model": "Mustang",
    "license_plate": "LMN-9012",
    "year": 2021,
    "rate_per_day": 120,
    "status": "active"
  },
  {
    "id": "4",
    "manufacturer": "Chevrolet",
    "model": "Onix",
    "license_plate": "QWE-3456",
    "year": 2024,
    "rate_per_day": 35,
    "status": "inactive"
  },
  {
    "id": "5",
    "manufacturer": "Volkswagen",
    "model": "Golf GTI",
    "license_plate": "RTY-7890",
    "year": 2022,
    "rate_per_day": 75,
    "status": "active"
  },
  {
    "id": "6",
    "manufacturer": "Tesla",
    "model": "Model 3",
    "license_plate": "UIO-1111",
    "year": 2023,
    "rate_per_day": 90,
    "status": "inactive"
  },
  {
    "id": "7",
    "manufacturer": "BMW",
    "model": "M3",
    "license_plate": "PAS-2222",
    "year": 2022,
    "rate_per_day": 150,
    "status": "active"
  },
  {
    "id": "8",
    "manufacturer": "Mercedes-Benz",
    "model": "C-Class",
    "license_plate": "DFG-3333",
    "year": 2023,
    "rate_per_day": 130,
    "status": "inactive"
  },
  {
    "id": "9",
    "manufacturer": "Hyundai",
    "model": "Tucson",
    "license_plate": "JKL-4444",
    "year": 2024,
    "rate_per_day": 60,
    "status": "active"
  },
  {
    "id": "10",
    "manufacturer": "Nissan",
    "model": "Altima",
    "license_plate": "MNO-5555",
    "year": 2023,
    "rate_per_day": 55,
    "status": "inactive"
  }
];

let reservations = [];

app.get("/cars", (req, res) => {
    res.json(cars);
});

app.get("/reservations", (req, res) => {
    const userId = req.query.userId;
    const userReservations = reservations.filter(reservation => reservation.userId === userId);
    res.json(req ? userReservations : reservations);
});

app.post("/reservations", (req, res) => {
  //TODO: fix cauculation
    const { car_id, customer_name, pickup_time, dropoff_time } = req.body;
    const car = cars.find(el => el.id === car_id);
    const diffInMs = new Date(dropoff_time) - new Date(pickup_time);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    const total = diffInDays * car.rate_per_day;
    console.log('diffInMs', diffInMs)
    console.log('diffInDays', diffInDays)
    console.log('total', total)
    const newReservation = {
        id: `${reservations.length + 1}`,
        car_id,
        customer_name,
        pickup_time,
        dropoff_time,
        total_price: total,
        status: "confirmed"
    };
    reservations.push(newReservation);
    res.json({ reservation_id: newReservation.id, success: true });
});

app.put("/reservations/:reservationId", (req, res) => {
    const { reservationId } = req.params;
    const { car_id, customer_name, pickup_time, dropoff_time } = req.body;
    const reservationIndex = reservations.findIndex(res => res.id === reservationId);

    if (reservationIndex === -1) {
        return res.status(404).json({ error: "Reservation not found" });
    }

    reservations[reservationIndex] = { ...reservations[reservationIndex], car_id, customer_name, pickup_time, dropoff_time };
    res.json(reservations[reservationIndex]);
});

app.delete("/reservations/:reservationId", (req, res) => {
    const { reservationId } = req.params;
    reservations = reservations.filter(res => res.id !== reservationId);
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
