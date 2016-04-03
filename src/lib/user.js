import { getToken } from "./tokenStorage";
import endpoints from "../config/endpoints";
import { get, post } from "../util/request";

export function getUserById(id) {
    return get(`${endpoints.user}${id}`);
}
