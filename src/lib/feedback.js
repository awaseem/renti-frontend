import endpoints from "../config/endpoints";
import { post } from "../util/request";
import { getToken } from "./tokenStorage";

export function addUserComment(comment, user) {
    return post(endpoints.userFeedback, {
        token: getToken(),
        rating: 3,
        comment: comment,
        user_has: user
    });
}
