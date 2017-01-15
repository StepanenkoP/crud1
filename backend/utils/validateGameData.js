export function validateGameData(data) {
  let errors = {}
  if (data.title === '') errors.title = "Can't be empty"
  if (data.cover === '') errors.cover = "Can't be empty"
  const isValid = Object.keys(errors).length === 0
  return {isValid, errors}
}
