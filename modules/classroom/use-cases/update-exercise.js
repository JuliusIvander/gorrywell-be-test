module.exports = ({
  exercises,
  reports,
  formValidation,
}) => {
  async function assessingExercise(classroomId, exerciseId, params) {
    // Get reports data
    const { menteeId } = params;
    const reportData = await reports.getReportsByExerciseAndMentee(
      classroomId,
      exerciseId,
      menteeId,
    );

    if (!reportData || reportData.latestStatus !== 'submitted') {
      throw new Error('Data not found or mentee has not submitted yet');
    }

    await reports.updateReport({
      classroomId,
      menteeId,
      exerciseId,
      params: {
        remarks: params.remarks,
      },
      latestStatus: 'completed',
    });
  }

  async function updatingExercise(classroomId, exerciseId, params) {
    await exercises.updateExercise({
      classroomId,
      exerciseId,
      params: {
        exerciseName: params.exerciseName,
        exerciseDescription: params.exerciseDescription,
        submittedBefore: params.submittedBefore,
      },
    });
  }

  async function submitExercise({
    classroomId,
    exerciseId,
    params,
    user,
  }) {
    const menteeId = user.id;
    const reportData = await reports.getReportsByExerciseAndMentee(
      classroomId,
      exerciseId,
      menteeId,
    );

    if (!reportData || reportData.latestStatus !== 'completed') {
      throw new Error('Data not found or exercise has been remarked');
    }

    await reports.updateReport({
      classroomId,
      menteeId,
      exerciseId,
      params: {
        answers: params.answers,
        latestStatus: 'submitted',
        submittedAt: Date.now(),
      },
    });
  }

  return async function updateExercise({
    user,
    params,
    classroomId,
    exerciseId,
  }) {
    let rules;
    const { role } = user;
    switch (role.roleName) {
      case 'Mentor':
        rules = {
          types: 'required|in:assess,edit',
        };

        if (params.types === 'assess') {
          rules.menteeId = 'required|string';
          rules.remarks = 'required|numeric';
        } else if (params.types === 'edit') {
          rules.exerciseName = 'string';
          rules.exerciseDescription = 'string';
          rules.submittedBefore = 'date';
        }
        formValidation(params, rules);

        if (params.types === 'assess') {
          await assessingExercise(classroomId, exerciseId, params);
        } else {
          await updatingExercise(classroomId, exerciseId, params);
        }
        break;
      case 'Mentee':
        rules = {
          answers: 'required|string',
        };
        formValidation(params, rules);

        await submitExercise({
          classroomId,
          exerciseId,
          params,
          user,
        });
        break;
      default:
        throw new Error('Unauthorize Role Accessing Process!');
    }
  };
};
