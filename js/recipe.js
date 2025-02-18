import { elements, getFromLocalStorage, setLocalStorage } from "./helper.js";

export class Recipe {
  constructor() {
    // tarif bilgileri
    this.info = {};

    // malzemeler
    this.ingredients = [];

    // likes
    this.likes = getFromLocalStorage("likes") || [];

    this.renderLikes();
  }

  // Tarif bilgilerini alma
  async getRecipe(id) {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );
    // verileri işle
    const data = await res.json();
    this.info = data.recipe;

    // malzemeleri alma
    this.ingredients = data.recipe.ingredients;
  }

  // her tarif için bir liste elemanı oluştur.
  createIngredient() {
    const html = this.ingredients.map(
      (ingredient) => `              
    <li>
      <i class="bi bi-check-circle"></i>
      <span>${ingredient}</span>
    </li>`
    );
    return html.join("");
  }

  // likelandımı kontrol et
  isRecipeLikes() {
    const found = this.likes.find((i) => i.id == this.info.recipe_id);
    return found;
  }

  //
  controlLike() {
    // likelanan elemanın verilerini al
    const newObject = {
      id: this.info.recipe_id,
      img: this.info.image_url,
      title: this.info.title,
    };
    // eleman likelandı mı
    if (this.isRecipeLikes()) {
      this.likes = this.likes.filter((i) => i.id != newObject.id);
    }
    // yoksa likeliyoruz
    else {
      this.likes.push(newObject);
    }
    // local storage'a kaydet
    setLocalStorage("likes", this.likes);

    this.renderRecipe(this.info);

    this.renderLikes();
  }
  // tarif bilgilerini ekrana render etme
  renderRecipe(recipe) {
    const markup = `
    <figure>
            <img
              src="${recipe.image_url}"
              alt=""
            />
            <h1>${recipe.title}</h1>
            <div class="like-area">
              <i id="like-btn" class="bi ${
                this.isRecipeLikes() ? "bi-heart-fill" : "bi-heart"
              }"></i>
            </div>
          </figure>
          <div class="ingredients">
            <ul>
              ${this.createIngredient()}
            </ul>
            <button id="add-to-basket">
              <i class="bi bi-cart2"></i>
              <span>Alışveriş Sepetine Ekle</span>
            </button>
          </div>
          <div class="directions">
            <h2>Nasıl Pişirilir?</h2>
            <p>
              Bu tarif dikkatlice <span>${recipe.publisher} </span>tarafından
              hazırlanmış ve test edilmiştir. Diğer detaylara onların websitesi
              üzerinden erişebilirsiniz.
            </p>
            <a href="${recipe.publisher_url}" target="_blank">Yönerge</a>
          </div>
    `;
    elements.recipeArea.innerHTML = markup;
  }
  renderLikes() {
    const likedHtml = this.likes
      .map(
        (item) =>
          `
  <a href="${item.id}">
    <img src="${item.img}"/>
    <p>${item.title}</p>
  </a>
  `
      )
      .join("");
    elements.likeList.innerHTML = likedHtml;
  }
}
