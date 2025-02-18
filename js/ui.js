import { elements } from "./helper.js";

// Ekrana Loader render eden fonksiyon
export const renderLoader = (parent) => {
  const loader = `
  <div class='loader'>
  <img src='/images/food-load.gif'/>
  </div>
  `;

  parent.insertAdjacentHTML("afterbegin", loader);
};

// loader'ı ekrandan kaldıran fonksiyon

export const clearLoader = () => {
  const loader = document.querySelector(".loader");
  if (loader) loader.remove();
};

// apiden gelen veriye göre ekrana aram sonuçlarını render eden fonksiyon
export const renderResults = (recipes) => {
  elements.resultsList.innerHTML = "";
  //   herbir sonuç için ekrana kart bas
  recipes.slice(0, 10).forEach((recipe) => {
    // kart html
    const markup = `
    <a href='#${recipe.recipe_id}' class="result-link">
    <img
    src="${recipe.image_url}"
    alt=""
    />
    <div class="data">
    <h4>${recipe.title}</h4>
    <p>${recipe.publisher}</p>
    </div>
    </a>
    `;
    // oluşturulan html'i uygun yere ilet
    elements.resultsList.insertAdjacentHTML("beforeend", markup);
  });
};

// sepete ürünleri ekrana basan fonksiyon

export const renderBasketItem = (items) => {
  const markUp = items
    .map(
      (item) =>
        `
    <li>
        <i class="bi bi-x" id="delete-item"></i>
        <span>${item.title}</span>
    </li>
    `
    )
    .join("");
  elements.basketList.innerHTML = markUp;
};
