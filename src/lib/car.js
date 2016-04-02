import endpoints from "../config/endpoints";
import { get, post } from "../util/request";

export function getCars() {
    return get(endpoints.cars);
}
