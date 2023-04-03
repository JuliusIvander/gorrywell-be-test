module.exports = ({
  reports,
  exercises,
}) => {
  async function getClassReport(classroomId) {
    const classReport = await reports.getClassroomReport(classroomId);
    const classReportFromExercise = await exercises.getClassroomReport(classroomId);

    const menteeAssigned = classReportFromExercise[0]._id.menteeAssigned.length;
    const { givenExercises } = classReportFromExercise[0];
    const { avgScore, completedExercises } = classReport[0];

    return {
      classroomId: classReport[0]._id._id,
      classroomName: classReport[0]._id.className,
      givenExercises,
      menteeAssigned,
      completedExercises,
      completedExercisePercent: (completedExercises * 100) / (menteeAssigned * givenExercises),
      averageScore: avgScore,
    };
  }

  async function getStudentReport(classroomId) {
    const studentReport = await reports.getStudentsReport(classroomId);
    return studentReport.map((student) => {
      const studentData = student._id;
      const formatted = {
        studentId: studentData._id,
        studentName: studentData.name,
        submittedExercises: student.submittedExercises,
        lateSubmissions: student.lateSubmission,
        averageScore: student.avgScore,
      };

      return formatted;
    });
  }

  return async function classroomReport({ classroomId }) {
    const data = {
      classReport: {},
      studentReport: [],
    };

    data.classReport = await getClassReport(classroomId);
    data.studentReport = await getStudentReport(classroomId);

    return data;
  };
};
