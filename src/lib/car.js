import endpoints from "../config/endpoints";
import { get, post, put, remove } from "../util/request";
import { getToken } from "./tokenStorage";

export function addCar(userId, licensePlate, model, make, year, numberOfSeats,
    price, colour, image, summary) {
    return post(endpoints.cars, {
        token: getToken(),
        license_plate: licensePlate,
        model: model,
        make: make,
        year: year,
        number_of_seats: numberOfSeats,
        price: price,
        colour: colour,
        image: image,
        summary: summary
    });
}

export function getCars() {
    return get(endpoints.cars);
}

export function getCar(plate) {
    return get(endpoints.cars + plate);
}

export function editCar(plate, model, make, year, numberOfSeats,
    price, colour, image, summary) {
    return put(endpoints.cars, {
        token: getToken(),
        license_plate: plate,
        model: model,
        make: make,
        year: year,
        number_of_seats: numberOfSeats,
        price: price,
        colour: colour,
        image: image,
        summary: summary
    });
}

export function deleteCar(plate) {
    return remove(endpoints.cars, {
        token: getToken(),
        license_plate: plate
    });
}
