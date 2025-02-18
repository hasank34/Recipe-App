export class Search {
  // kurucu method
  constructor(query) {
    this.query = query;
    this.result = [];
  }
  // apiye istek atacak fonksiyon
  async getResults() {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/search?q=${this.query}`
    );

    const data = await res.json();
    this.result = data.recipes;
  }
}
