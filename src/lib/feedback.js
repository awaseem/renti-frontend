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

export function addCarComment(comment, carPlate) {
    return post(endpoints.carFeedback, {
        token: getToken(),
        rating: 3,
        comment: comment,
        car_has: carPlate
    });
}
