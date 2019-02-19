export function setLsItem (name, value) {
  localStorage.setItem(name, JSON.stringify(value))
}

export function getLsItem (name) {
  try {
    return JSON.parse(localStorage.getItem(name))
  } catch (e) {
    return null
  }
}
export function removeLsItem (name) {
  localStorage.removeItem(name)
}
