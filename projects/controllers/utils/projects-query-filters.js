const { Op } = require("sequelize");

const dateRangeFilter = (fieldName, minDate, maxDate) => {
  const query = {
    where: { [fieldName]: {} },
  };

  if (minDate)
    query.where[fieldName] = {
      ...query.where[fieldName],
      [Op.gte]: minDate,
    };
  if (maxDate)
    query.where[fieldName] = {
      ...query.where[fieldName],
      [Op.lte]: maxDate,
    };
  if (!minDate && !maxDate) delete query.where[fieldName];

  return query;
};

exports.projectsQueryFilters = (queryParms) => {
  const {
    status,
    minStartDate,
    maxStartDate,
    minCostDate,
    maxCostDate,
    minIncomeDate,
    maxIncomeDate,
    minIncome,
    maxCost,
  } = queryParms;

  const query = {
    where: {
      ...dateRangeFilter("startDate", minStartDate, maxStartDate).where,
      ...dateRangeFilter("costDate", minCostDate, maxCostDate).where,
      ...dateRangeFilter("incomeDate", minIncomeDate, maxIncomeDate).where,
    },
  };

  if (status) query.where = { ...query.where, status };

  if (minIncome)
    query.where = { ...query.where, expectedIncome: { [Op.gte]: minIncome } };

  if (maxCost)
    query.where = { ...query.where, expectedCost: { [Op.lte]: maxCost } };

  return query;
};
