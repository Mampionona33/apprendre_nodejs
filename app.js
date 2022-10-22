const express = require('express');
const { json } = require('express/lib/response');
require('dotenv').config();
const fs = require('fs');
const morgan = require('morgan');
const app = express();

//  FIRST MIDDLEWARE-------------------------------
app.use(morgan('dev'));

app.use(express.json());

// midleware
app.use((req, res, next) => {
  console.log('hello from middleware');
  // next is use to execute next middleware
  next();
});

// Middleware to add propreties requestTime to the request object
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

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
    return res.status(404).json({
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
  // Callin requestTime middleware
  console.log(req.requestTime);
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

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined',
  });
};
const getUserById = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined',
  });
};

const tourRouter = express.Router();
const userRouter = express.Router();

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// TOUR ROUTES --------------------------------
// Create new tour
// app.post('/api/v1/tours', createTour);
// Read all tours
// app.get('/api/v1/tours', getAllTours);
tourRouter.route('/').get(getAllTours).post(createTour);

// Read tour by id
// app.get('/api/v1/tours/:id', getTourById);
// Update data
// app.patch('/api/v1/tours/:id', updateTour);
// Delete data
// app.delete('/api/v1/tours/:id', deleteTour);

tourRouter.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);
// TOUR ROUTES --------------------------------

// USER ROUTES --------------------------------
userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);

// START SERVER --------------------------------
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server start on port :${port}`);
});
