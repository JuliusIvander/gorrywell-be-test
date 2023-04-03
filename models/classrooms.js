const mongoose = require('mongoose');
const users = require('./users').default;

const Classrooms = mongoose.model('classrooms', {
  className: {
    type: String,
    required: true,
  },
  classDescription: {
    type: String,
    default: '',
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: users,
    required: true,
  },
  mentees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: users,
  }],
});

module.exports = Object.freeze({
  default: Classrooms,
  findClassroomsByMentor: async (mentorId) => {
    const data = await Classrooms
      .find({ mentor: mentorId })
      .populate({
        path: 'mentees',
      })
      .exec();
    return data;
  },
  findClassroomByMentee: async (menteeId) => {
    const data = await Classrooms
      .find({
        mentees: {
          $in: menteeId,
        },
      })
      .exec();
    return data;
  },
});
