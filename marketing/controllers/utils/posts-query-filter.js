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

exports.postsQueryFilter = (queryParms) => {
  const { posted, minPostedAt, maxPostedAt, withPeopleReached } = queryParms;

  const query = {
    where: {
      ...dateRangeFilter("postedAt", minPostedAt, maxPostedAt).where,
    },
  };

  if (posted) query.where = { ...query.where, postedAt: { [Op.ne]: null } };
  if (withPeopleReached)
    query.where = { ...query.where, peopleReached: { [Op.ne]: null } };

  return query;
};
