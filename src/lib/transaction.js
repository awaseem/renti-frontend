import endpoints from "../config/endpoints";
import { get, post } from "../util/request";
import { getToken } from "./tokenStorage";

export function createTransaction(userId, dateIn, dateOut, licensePlate, price) {
    return post(endpoints.transactions, {
        token: getToken(),
        user_renter: userId,
        date_in: dateIn,
        date_out: dateOut,
        price: price,
        car_id: licensePlate
    });
}

export function getTransactions(plate) {
    return get(endpoints.transactions + plate);
}
