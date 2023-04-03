const getOffset = (page, limit) => (page * limit) - limit;

const getNextPage = (page, limit, total) => {
  if ((total / limit) > page) {
    return page + 1;
  }
  return null;
};

const getPreviousPage = (page) => {
  if (page <= 1) {
    return null;
  }
  return page - 1;
};

const paginateArray = (data, params) => {
  const currentPage = parseInt(params?.page, 10) || 1;
  const limit = parseInt(params?.perPage, 10) || 10;

  const offset = getOffset(currentPage, limit);
  return data.slice(offset, limit + offset);
};

const buildPaginate = (data, params) => {
  const perPage = parseInt(params?.perPage, 10) || 10;
  const { totalRows } = params;

  const currentPage = parseInt(params?.page, 10) || 1;
  const nextPage = getNextPage(currentPage, perPage, totalRows);
  const previousPage = getPreviousPage(currentPage);

  return {
    currentPage,
    nextPage,
    previousPage,
    total: totalRows,
    data,
  };
};

module.exports = Object.freeze({
  getOffset,
  getNextPage,
  getPreviousPage,
  paginateArray,
  buildPaginate,
});
