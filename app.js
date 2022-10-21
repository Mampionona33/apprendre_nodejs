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

const createTour = (req, res) => {
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
};

const getTourById = (req, res) => {
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
};

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const updateTour = (req, res) => {
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
};

const deleteTour = (req, res) => {
  const id = parseInt(req.params.id);

  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: {
      tour: null,
    },
  });
};

// Create new tour
// app.post('/api/v1/tours', createTour);
// Read all tours
// app.get('/api/v1/tours', getAllTours);
app.route('/api/v1/tours').get(getAllTours).post(createTour);

// Read tour by id
// app.get('/api/v1/tours/:id', getTourById);
// Update data
// app.patch('/api/v1/tours/:id', updateTour);
// Delete data
// app.delete('/api/v1/tours/:id', deleteTour);
app
  .route('/api/v1/tours/:id')
  .get(getTourById)
  .patch(updateTour)
  .delete(deleteTour);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server start on port :${port}`);
});
