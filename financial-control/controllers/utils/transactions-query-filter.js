const { Op } = require("sequelize");

const valueRangeFilter = (minValue, maxValue) => {
  const query = {
    where: { value: {} },
  };

  if (minValue)
    query.where.value = {
      ...query.where.value,
      [Op.gte]: minValue,
    };
  if (maxValue)
    query.where.value = {
      ...query.where.value,
      [Op.lte]: maxValue,
    };
  if (!minValue && !maxValue) delete query.where.value;

  return query;
};

exports.transactionsQueryFilters = (queryParms) => {
  const { origin, recurrent, minValue, maxValue } = queryParms;

  const query = {
    where: {
      ...valueRangeFilter(minValue, maxValue).where,
    },
  };

  if (origin) query.where = { ...query.where, origin };
  if (recurrent) query.where = { ...query.where, recurrent };

  return query;
};
