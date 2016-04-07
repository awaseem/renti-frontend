import endpoints from "../config/endpoints";
import { post, remove } from "../util/request";
import { getToken } from "./tokenStorage";

export function createCreditCard(creditCardNumber, cvv, expiryDate) {
    return post(endpoints.creditCard, {
        token: getToken(),
        credit_card_number: creditCardNumber,
        cvv: cvv,
        expiry_date: expiryDate
    });
}

export function deleteCreditCard() {
    return remove(endpoints.creditCard, {
        token: getToken()
    });
}
