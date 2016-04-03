import endpoints from "../config/endpoints";
import { post } from "../util/request";
import { getToken } from "./tokenStorage";

export function createCreditCard(userId, creditCardNumber, cvv, expiryDate) {
    return post(endpoints.creditCard, {
        token: getToken(),
        user_id: userId,
        credit_card_number: creditCardNumber,
        cvv: cvv,
        expiry_date: expiryDate
    });
}
