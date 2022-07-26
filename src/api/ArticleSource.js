import axios from "axios";

export default axios.create({
  baseURL: "https://adam-nc-news.herokuapp.com/api/articles",
});
