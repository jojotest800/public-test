interface App {
    name: string
    id: number
    public_key: string
    secret_key: string,
    api_url: string
    url_website: string
    plan: Plan,
    createdAt: string | Date
    updatedAt: string | Date
    activated: boolean
    suspend: boolean
    suspension_reason: string
    UserId: number
    User: User
}

interface Plan {
    name: string,
    frequence: string
    payment: Payment
    amount: number
}


interface Payment {
    payment_method: string,
    save: boolean
    card_number: string
    part_card_number: string
}

interface User {
    id: number
    firstName: string
    lastName: string
    displayName: string
    type: string
    active: boolean
    delete: boolean
    phone: string,
    email: string,
    password: string

}

interface Order {
    id: number
    code: string
    status: string
    location: string
    client: ClientOrder
    paymentType: string
}

interface Location {
    id: number
    last_location: string

}


interface ClientOrder {
    id: number
    fullName: string
    address: Address
}


interface Address {
    id: number
    longitude: number
    latitude: number
    country: string
    city: string
    region: string
    street: string
    building_number:number
    floor_number:number
    house_number: number
    house_type: string
}