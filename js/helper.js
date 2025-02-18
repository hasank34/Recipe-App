export const elements = {
  form: document.querySelector("form"),
  searchInput: document.querySelector("form input"),
  resultsList: document.querySelector(".results"),
  recipeArea: document.querySelector(".recipe"),
  basketList: document.querySelector(".shopping ul"),
  clearBtn: document.querySelector("#clear"),
  likeList: document.querySelector(".list"),
};

// localStorage verileri kaydet
export const setLocalStorage = (key, data) => {
  // verileri stringe çevir
  const strData = JSON.stringify(data);
  // stringe çevirilen elemanı local storage kaydet
  localStorage.setItem(key, strData);
};

// localStorage verileri al

export const getFromLocalStorage = (key) => {
  // local storage'daki verileri stringe çevir
  const strData = localStorage.getItem(key);
  // stringten bir objeye dönüştür
  if (strData) return JSON.parse(strData);
  return null;
};
