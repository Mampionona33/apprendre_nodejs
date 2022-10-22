const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.createTour = (req, res) => {
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

exports.getTourById = (req, res) => {
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

exports.getAllTours = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
