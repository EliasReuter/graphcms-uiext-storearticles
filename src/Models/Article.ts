import StoreArticle from "./StoreArticle";

export default interface Article {
  articleID: string;
  name: string;
  description: string;
  storeArticles: StoreArticle[];
}
