const monthsUntilNow = (stringDate) => {
  let months;
  const now = new Date();
  const date = new Date(stringDate);

  months = (now.getFullYear() - date.getFullYear()) * 12;
  months -= date.getMonth();
  months += now.getMonth();
  return months <= 0 ? 1 : months;
};

exports.getTotalValue = (transactions) =>
  transactions.reduce((sum, t) => {
    const value = t.kind === "IN" ? t.value : -t.value;

    if (t.recurrent) {
      return monthsUntilNow(t.date) * value + sum;
    }

    return value + sum;
  }, 0);
