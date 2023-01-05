export const handleResponse = (response: any): any => response;

// TODO: Set up our own way of handling errors
// NOTE: After 3 tries error will be returned by retrySaga in sagas/epics/helpers
export const handleError = (error: any): any => {
  console.log(
    '*** api Error - START ***\n',
    error.message,
    '\n*** api Error - END ***',
  );

  if (error.message) {
    throw new Error(error.message);
  }
};
