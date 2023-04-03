const router = require('express').Router();
const Auth = require('../middlewares/auth-middleware');
const PermissionAuth = require('../middlewares/auth-permissions');

const classroomController = require('../modules/classroom/controllers').default;

router.get('', Auth, PermissionAuth, async (req, res, next) => {
  try {
    await classroomController.classroomList({
      httpRequest: req,
      httpResponse: res,
    });
  } catch (error) {
    next(error);
  }
}); // Get list of classroom

router.get('/:id', Auth, PermissionAuth, async (req, res, next) => {
  try {
    await classroomController.classroomDetail({
      httpRequest: req,
      httpResponse: res,
    });
  } catch (error) {
    next(error);
  }
}); // Get clasroom detail and list of exercise

router.get('/:id/exercises/:eId', Auth, PermissionAuth, async (req, res, next) => {
  try {
    await classroomController.exerciseDetail({
      httpRequest: req,
      httpResponse: res,
    });
  } catch (error) {
    next(error);
  }
}); // Get exercise detail

router.put('/:id/exercises/:eId', Auth, PermissionAuth, async (req, res, next) => {
  try {
    await classroomController.updateExercise({
      httpRequest: req,
      httpResponse: res,
    });
  } catch (error) {
    next(error);
  }
}); // Edit exercise

router.delete('/:id/exercises/:eId', Auth, PermissionAuth, async (req, res, next) => {
  try {
    await classroomController.deleteExercise({
      httpRequest: req,
      httpResponse: res,
    });
  } catch (error) {
    next(error);
  }
}); // Delete exercise

module.exports = router;
