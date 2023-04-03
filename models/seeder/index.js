const conn = require('../../db');

const roleSeeder = require('./roleSeeder');
const userSeeder = require('./userSeeder');
const classroomSeeder = require('./classroomSeeder');
const exerciseSeeder = require('./exerciseSeeder');
const reportSeeder = require('./reportSeeder');
const permissionSeeder = require('./permissionSeeder');

const roles = require('../roles').default;
const users = require('../users').default;
const classrooms = require('../classrooms').default;
const exercises = require('../exercises').default;

const getUserByRole = async (session, role) => {
  const data = await users
    .aggregate([
      {
        $lookup: {
          from: 'roles',
          localField: 'role',
          foreignField: '_id',
          as: 'role',
        },
      },
      {
        $unwind: {
          path: '$role',
        },
      },
      {
        $match: {
          'role.roleName': role,
        },
      },
    ])
    .session(session)
    .exec();

  return data;
};

const getExercisesData = async (session) => {
  const data = await exercises
    .find()
    .populate('classroomId')
    .session(session)
    .exec();

  return data;
};

const main = async () => {
  const session = await conn.startSession();
  try {
    session.startTransaction();

    // Role seeding
    await roleSeeder(session);

    // User seeding
    const roleList = await roles.find().session(session).exec();
    await userSeeder(roleList, session);

    // Classroom seeding
    const mentorData = await getUserByRole(session, 'Mentor');
    const menteeData = await getUserByRole(session, 'Mentee');
    await classroomSeeder(mentorData, menteeData, session);

    // Exercise seeding
    const classroomDatas = await classrooms
      .find()
      .session(session)
      .exec();
    await exerciseSeeder(classroomDatas, session);

    // Report seeding
    const exerciseDatas = await getExercisesData(session);
    await reportSeeder(exerciseDatas, session);

    // Permission seeding
    await permissionSeeder(roleList, session);

    await session.commitTransaction();
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    process.exit(1);
  }
  session.endSession();
  console.log('Seeding Process Complete!');
  process.exit(1);
};

main();
