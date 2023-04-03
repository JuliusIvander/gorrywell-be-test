module.exports = ({
  classrooms,
  buildPaginate,
  paginateArray,
}) => {
  function formatDbData(datas) {
    const menteeDatas = {};
    const formattedData = [];

    // Sorting datas according mentee id
    for (let i = 0; i < datas.length; i += 1) {
      const data = datas[i];
      const menteeFormatted = {
        classroomId: data.id,
        className: data.className,
      };
      for (let j = 0; j < data.mentees.length; j += 1) {
        const mentee = data.mentees[j];
        if (!(mentee.id in menteeDatas)) {
          menteeDatas[mentee.id] = {
            menteeName: mentee.name,
            classrooms: [],
          };
        }
        menteeDatas[mentee.id].classrooms.push(menteeFormatted);
      }
    }

    // Finalized data
    Object.entries(menteeDatas).forEach(([key, values]) => {
      formattedData.push({
        id: key,
        ...values,
      });
    });

    return formattedData;
  }

  return async function menteeList({ mentorId, params }) {
    const datas = await classrooms.findClassroomsByMentor(mentorId);
    const menteeDatas = formatDbData(datas);

    const constrain = {
      ...params,
      totalRows: menteeDatas.length,
    };
    const paginatedData = paginateArray(menteeDatas, params);

    return buildPaginate(paginatedData, constrain);
  };
};
