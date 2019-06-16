export const buildDate = date => {
  let publishDateYear = date.getFullYear(),
    publishDateMonth = date.getMonth() + 1,
    publishDateDay = date.getDate();

  if (publishDateMonth < 10) publishDateMonth = "0" + publishDateMonth;
  if (publishDateDay < 10) publishDateDay = "0" + publishDateDay;

  return `${publishDateYear}-${publishDateMonth}-${publishDateDay}`;
};

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};
