import { v4 } from "https://jspm.dev/uuid";
import { Search } from "./api.js";
import { elements, getFromLocalStorage, setLocalStorage } from "./helper.js";
import {
  clearLoader,
  renderBasketItem,
  renderLoader,
  renderResults,
} from "./ui.js";
import { Recipe } from "./recipe.js";

const recipe = new Recipe();
// ! fonksiyonlar
const handleSubmit = async (e) => {
  e.preventDefault();
  const query = elements.searchInput.value;
  if (query) {
    const search = new Search(query);

    // ekrana loader bas
    renderLoader(elements.resultsList);
    try {
      // api istek at
      await search.getResults();
      // apiden cevap gelince loaderı kaldır
      clearLoader();
      // tarifleri ekrana yaz
      renderResults(search.result);
    } catch (error) {
      alert("Aradığınız kriterlerde uygun tarif bulunamadı");
      clearLoader();
    }
  }
};

// ! olay izleyicilerl
elements.form.addEventListener("submit", handleSubmit);

// Sayfa yüklendiğinde ve url değiştiğinde çalışacak fonksiyon

const controlRecipe = async (eventName) => {
  const id = location.hash.replace("#", "");
  if (id) {
    renderLoader(elements.recipeArea);
    try {
      await recipe.getRecipe(id);
      //  loader ekrandan akldır
      clearLoader();
      // tarif bilgilerini render et
      recipe.renderRecipe(recipe.info);

      // tarif kısmında yer alan arayüz scroll'un düzenlenmesi
      elements.recipeArea.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      alert("Tarif yüklenemedi");
      return;
    }
  }
};
// !sayfanın yüklenmesi ve url değişimini izle
["load", "hashchange"].forEach((eventName) => {
  window.addEventListener(eventName, controlRecipe);
});

// !sepet işlemleri
let basket = getFromLocalStorage("basket") || [];
const handleClick = (e) => {
  if (e.target.id === "add-to-basket") {
    // addtobasket tıklanınca ul erişme
    recipe.ingredients.forEach((title) => {
      // yeni obje oluştur
      const newItem = {
        id: v4(),
        title,
      };
      // newItem sepete ekle
      basket.push(newItem);
    });
    setLocalStorage("basket", basket);
    // ekrana sepetteki elemanları bas
    renderBasketItem(basket);

    // controlBtn();
    controlBtn(basket);
  }

  // like butonuna tıklandıysa
  if (e.target.id == "like-btn") {
    recipe.controlLike();
  }
};

const deleteItem = (e) => {
  if (e.target.id === "delete-item") {
    // kapsayıcısına eriş
    const parent = e.target.parentElement;
    // seçilen ürünün idsine eriş ve diziden kaldır
    basket = basket.filter((item) => item.id != parent.dataset.id);
    // locakstorage'i güncelle
    setLocalStorage("basket", basket);
    // ekrana sepetteki elemanları bas
    parent.remove();
  }
  // kapsayıcıyı kaldır
  parent.parentElement.removeChild(parent);

  controlBtn(basket);
};

const handleClear = (e) => {
  const res = confirm("Bütün sepet silinecek!! Emin misiniz?");

  if (res) {
    // local storage'i temizle
    setLocalStorage("basket", null);
    basket = [];
    // ekrana sepetteki elemanları bas
    elements.basketList.innerHTML = "";

    controlBtn(basket);
  }
};
// tarif alanında gerçekleşen tıklamaları izle
elements.recipeArea.addEventListener("click", handleClick);

// sepetten eleman silme
elements.basketList.addEventListener("click", deleteItem);

// sepeti temizle
elements.clearBtn.addEventListener("click", handleClear);

// sepetin dolu olma durumuna göre clear btn görünürlüğünü belirleyen komut
export const controlBtn = (basket) => {
  if (basket.length > 0) {
    elements.clearBtn.style.display = "flex";
  } else {
    elements.clearBtn.style.display = "none";
  }
};
