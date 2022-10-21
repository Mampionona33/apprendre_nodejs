const express = require('express');
require('dotenv').config();
const fs = require('fs');
const app = express();

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello from server', app: 'my app' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Create new tour
app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

// Read all tours
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// Read tour by id
app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);

  const id = parseInt(req.params.id);
  const tour = tours.find((el) => el.id === id);
  // if (id > tours.length)
  if (!tour) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
});

// Update data
app.patch('/api/v1/tours/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updagted tour/>',
    },
  });
});

// Delete data
app.delete('/api/v1/tours/:id', (req, res) => {
  res.status(204).json({
    status: 'success',
    data: {
      tour: null,
    },
  });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server start on port :${port}`);
});
