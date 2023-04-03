module.exports = ({
  classrooms,
  buildPaginate,
  paginateArray,
}) => async function classroomList({ userId, role, params }) {
  let datas = [];
  switch (role.roleName) {
    case 'Mentor':
      datas = await classrooms.findClassroomsByMentor(userId);
      break;
    case 'Mentee':
      datas = await classrooms.findClassroomByMentee(userId);
      break;
    default:
      throw new Error('Unauthorize Role Accessing Process!');
  }

  const constrain = {
    ...params,
    totalRows: datas.length,
  };
  const paginatedData = paginateArray(datas, params);
  const finalizedData = paginatedData.map((data) => {
    const formatted = {
      id: data.id,
      className: data.className,
    };
    return formatted;
  });

  return buildPaginate(finalizedData, constrain);
};
