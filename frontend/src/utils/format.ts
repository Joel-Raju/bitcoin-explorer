import moment from 'moment';

export const getFormattedTime = (unixEpoch: number) => {
  const format = 'YYYY-MM-DD hh:MM';
  return moment.unix(unixEpoch).format(format);
};

export const getBTCFee = (fee: number) => fee / Math.pow(10, 8) || 0;

export const getElapsedTime = (unixEpoch: number) => {
  const time = moment.unix(unixEpoch);
  const currentTime = moment();

  const minDiff = currentTime.diff(time, 'minutes');
  const hourDiff = currentTime.diff(time, 'hours');

  if (minDiff < 59) {
    return `${minDiff} minutes`;
  }

  if (minDiff < 23) {
    return `${hourDiff} hours`;
  }

  return getFormattedTime(unixEpoch);
};
