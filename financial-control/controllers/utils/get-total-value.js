const monthsUntilEndDate = (stringStartDate, stringEndDate) => {
  let months;
  const endDate = stringEndDate ? new Date(stringEndDate) : new Date();
  const date = new Date(stringStartDate);

  months = (endDate.getFullYear() - date.getFullYear()) * 12;
  months -= date.getMonth();
  months += endDate.getMonth();
  return months <= 0 ? 1 : months;
};

exports.getTotalValue = (transactions) =>
  transactions.reduce((sum, t) => {
    const value = t.kind === "IN" ? t.value : -t.value;

    if (t.recurrent) {
      return monthsUntilEndDate(t.date, t.canceledAt) * value + sum;
    }

    return value + sum;
  }, 0);
