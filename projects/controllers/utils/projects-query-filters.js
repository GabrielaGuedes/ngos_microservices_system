const { Op } = require("sequelize");

exports.projectsQueryFilters = (queryParms) => {
  const {
    status,
    minStartDate,
    maxStartDate,
    minIncome,
    maxCost,
    startDateSort,
  } = queryParms;

  const query = {
    order: [["startDate", startDateSort || "DESC"]],
    where: { startDate: {} },
  };

  if (status) query.where = { ...query.where, status };

  if (minStartDate)
    query.where.startDate = {
      ...query.where.startDate,
      [Op.gte]: minStartDate,
    };

  if (maxStartDate)
    query.where.startDate = {
      ...query.where.startDate,
      [Op.lte]: maxStartDate,
    };

  if (!minStartDate && !maxStartDate) delete query.where.startDate;

  if (minIncome)
    query.where = { ...query.where, expectedIncome: { [Op.gte]: minIncome } };

  if (maxCost)
    query.where = { ...query.where, expectedCost: { [Op.lte]: maxCost } };

  return query;
};
