//проверка localStorage при запуске
function getList(array) {
  const list = JSON.parse(localStorage.getItem(array));
  if (list) {
    return list;
  } else {
    alert("список пуст!");
  }
}

function saveList(key, array) {
  localStorage.setItem(key, JSON.stringify(array));
}

export { getList, saveList };
