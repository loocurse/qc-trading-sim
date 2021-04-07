const getNextDay = (date, days) => {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + days);
  return nextDay;
};

const generateData = () => {
  let xaxis = [];
  const date = new Date();
  for (let i = 0; i < 10; i++) {
    xaxis.push(getNextDay(date, i));
  }
  const yaxis = [10, 15, 13, 12, 10, 14, 9, 7, 6, 7, 10];
  return xaxis.map((value, idx) => {
    return { x: value, y: yaxis[idx] };
  });
}; // [{x: day 1, y: price}, {x: day 2, y: price}, ...]

const parseDate = (str) => {
  const parts = str.split("/");
  const date = new Date(
    parseInt("20" + parts[2], 10),
    parseInt(parts[1], 10) - 1,
    parseInt(parts[0], 10)
  );
  return date;
};

export { getNextDay, generateData, parseDate };
