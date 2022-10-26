const Tour = require('../models/tourModels');

exports.checkBody = (req, res, next) => {
  const { name } = req.body.name;
  const { duration } = req.body.duration;
  if (!name) {
    return res.status(404).json({
      status: 'fail',
      message: 'Name is required',
    });
  }
  if (!duration) {
    return res.status(404).json({
      status: 'fail',
      message: 'Duration is required',
    });
  }
  next();
};

exports.uniqueName = (req, res, next) => {
  // const newName = req.body.name;
  // const tourExist = tours.filter((el) => el.name === newName);
  // if (tourExist.length > 0) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Tours alredy exist',
  //   });
  // }
  next();
};

exports.createTour = (req, res) => {
  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = ({ id: newId }, req.body);
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/../dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   () => {
  //     res.status(201).json({
  //       status: 'success',
  //       data: {
  //         tour: newTour,
  //       },
  //     });
  //   }
  // );
};

exports.getTourById = (req, res) => {
  // const id = parseInt(req.params.id, 10);
  // const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    // data: {
    //   tours: tour,
    // },
  });
};

exports.getAllTours = (req, res) => {
  // Callin requestTime middleware
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updagted tour/>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: {
      tour: null,
    },
  });
};
