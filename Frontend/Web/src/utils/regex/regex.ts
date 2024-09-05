export function phoneRegex(phoneNumber: number | string) {
    const regex = /^(\d{8}|\d{13})$/;
    return regex.test(phoneNumber.toString());
}

export function addressRegex(address: string) {
    const regex = /^(\d{1,5})?[\w\s.,-]*$/;
    return regex.test(address);
}

export function nameRegex(name: string) {
    const regex = /^[A-Za-z0-9À-ÿ'-\s]+$/;
    return regex.test(name);
}



export function emailRegex(email: string) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

export function phoneNumberRegex(phoneNumber: number | string) {
    const regex = /^(\+?\d{1,3}\s?\d{9}|\d{10})$/;
    return regex.test(phoneNumber.toString());
}


export function passwordRegex(password: string) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return regex.test(password);
}

export function numberRegex(number: number | string) {
    const regex = /^\d+$/;
    return regex.test(number.toString());
}

export function postalCodeRegex(postalCode: number | string) {
    const regex = /^\d{5}$/;
    return regex.test(postalCode.toString());
}

export function cityRegex(city: string) {
    const regex = /^[A-Za-z'-]+$/;
    return regex.test(city);
}

export function countryRegex(country: string) {
    const regex = /^[A-Za-z'-]+$/;
    return regex.test(country);
}

export function cvcRegex(cvc: number | string) {
    const regex = /^\d{3}$/;
    return regex.test(cvc.toString());
}

export function cardNumberRegex(cardNumber: number | string) {
    const regex = /^\d{16}$/;
    return regex.test(cardNumber.toString());
}

export function expirationDateRegex(expirationDate: string) {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    return regex.test(expirationDate);
}

export function usernameRegex(username: string) {
    const regex = /^[A-Za-z0-9]+$/;
    return regex.test(username);
}

export function notesRegex(notes: string) {
    const regex = /^[A-Za-zÀ-ÿ0-9.,;:!?'"()\-_\s\n\r]*$/;
    return regex.test(notes);
}


export function descriptionRegex(description: string) {
    const regex = /^[\w\s.,-]*$/;
    return regex.test(description);
}

export function addressRegex2(address: string) {
    const regex = /^(\d{1,6}\s)?[A-Za-zÀ-ÿ0-9\s'-]+$/;
    return regex.test(address);
}

