//проверка localStorage при запуске
function getList(array) {
  const list = JSON.parse(localStorage.getItem(array));
  if (list) {
    return list;
  } else {
    return [];
  }
}

function saveList(key, array) {
  localStorage.setItem(key, JSON.stringify(array));
}

export { getList, saveList };
