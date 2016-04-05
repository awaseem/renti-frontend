import { getToken } from "./tokenStorage";
import endpoints from "../config/endpoints";
import { get, put } from "../util/request";

export function getUserById(id) {
    return get(`${endpoints.user}${id}`);
}

export function updateUser(uid, address, email, image, summary) {
    return put(endpoints.user, {
        token: getToken(),
        uid: uid,
        address: address,
        email: email,
        image: image,
        summary: summary
    });
}
