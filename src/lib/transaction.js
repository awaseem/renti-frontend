import endpoints from "../config/endpoints";
import { get, post, remove } from "../util/request";
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

export function getTransactionsForUser(uid) {
    return get(`${endpoints.transactions}user/${uid}`);
}

export function approveTransaction(tid) {
    return post(`${endpoints.transactions}approve`, {
        token: getToken(),
        tid: tid
    });
}

export function deleteTransaction(tid) {
    return remove(endpoints.transactions, {
        token: getToken(),
        tid: tid
    });
}
