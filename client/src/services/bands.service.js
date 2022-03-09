import { UsersService } from "./users.service";
import axios from "axios";

export const BandsService = {
  getBandBySlug(slug) {
    return axios({
      url: `/bands/${slug}`,
      method: "get",
      headers: { Authorization: `Bearer ${UsersService.currentUserToken()}` },
      responseType: "json",
    });
  },

  getBands() {
    return axios({
      url: "/bands",
      method: "get",
      headers: { Authorization: `Bearer ${UsersService.currentUserToken()}` },
      responseType: "json",
    });
  },
};
