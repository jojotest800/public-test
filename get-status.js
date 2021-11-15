const _ = require("lodash");

const orders = [
  {
    price: 347,
    vat: 21,
    discount: 0,
    certDiscount: null,
    shippingTax: 0,
    total: 347,
    shippingPrice: 0,
    saFloorNo: 1,
    saFlatNo: 1,
    id: 639,
    guid: "f1cb18bb-7e57-4441-8ff2-95d05e1c6944",
    notes: null,
    delivery: null,
    message: null,
    reason: null,
    status: "delivered",
    seenUser: null,
    seenSeller: null,
    expire: null,
    reactedAt: null,
    approved: null,
    delivered: "2021-11-25T12:00:32.124Z",
    canceled: null,
    declined: null,
    DiscountId: null,
    buyerPhone: "+46072219114",
    buyerEmail: "karinhagg00@gmail.com",
    buyerFirstName: "Karin",
    buyerLastName: "Hägg",
    buyerFullName: "Karin Hägg",
    buyerBirthday: null,
    buyerStreetAddress: "REGEMENTSGATAN",
    buyerStreetNumeric: "31",
    buyerEntrance: null,
    buyerCity: "Solna",
    buyerState: null,
    buyerCountry: "Sweden",
    buyerZip: "17066",
    buyerCoordinates: null,
    shippingMethod: "postnord",
    saStreetAddress: "REGEMENTSGATAN",
    saStreetNumeric: "31",
    saCity: "Solna",
    saState: null,
    saCountry: "Sweden",
    saEntrance: null,
    saZip: "17066",
    saFloorType: "K",
    saCoordinates: null,
    orderReference: null,
    createdAt: "2020-11-16T14:29:52.678Z",
    updatedAt: "2020-11-25T12:00:32.125Z",
    BuyerId: 1855,
    MerchantId: 34,
    ShippingAddressId: 811,
    TransactionId: 1306,
    ShippingOrderId: 1015,
    ShippingMethodId: 1,
  },
  {
    price: 347,
    vat: 21,
    discount: 0,
    certDiscount: null,
    shippingTax: 0,
    total: 347,
    shippingPrice: 0,
    saFloorNo: null,
    saFlatNo: null,
    id: 5007,
    guid: "50134a6d-883c-4366-917d-cddcd79432f6",
    notes: null,
    delivery: null,
    message: null,
    reason: null,
    status: "delivered",
    seenUser: null,
    seenSeller: null,
    expire: null,
    reactedAt: null,
    approved: null,
    delivered: "2021-01-15T16:16:19.878Z",
    canceled: null,
    declined: null,
    DiscountId: null,
    buyerPhone: "+46733864576",
    buyerEmail: "holm_cissi+tcgz@hotmail.com",
    buyerFirstName: "Cecilia ",
    buyerLastName: "Holm ",
    buyerFullName: "Cecilia  Holm ",
    buyerBirthday: null,
    buyerStreetAddress: "Landbergavägen",
    buyerStreetNumeric: "20",
    buyerEntrance: null,
    buyerCity: "Frillesås",
    buyerState: null,
    buyerCountry: "Sweden",
    buyerZip: "43963",
    buyerCoordinates: null,
    shippingMethod: "postnord",
    saStreetAddress: "Landbergavägen",
    saStreetNumeric: "20",
    saCity: "Frillesås",
    saState: null,
    saCountry: "Sweden",
    saEntrance: null,
    saZip: "43963",
    saFloorType: null,
    saCoordinates: null,
    orderReference: null,
    createdAt: "2021-01-14T12:40:43.733Z",
    updatedAt: "2021-01-15T16:16:19.878Z",
    BuyerId: 14414,
    MerchantId: 34,
    ShippingAddressId: 9724,
    TransactionId: 6200,
    ShippingOrderId: 5405,
    ShippingMethodId: 1,
  },
  {
    price: 347,
    vat: 21,
    discount: 0,
    certDiscount: null,
    shippingTax: 0,
    total: 347,
    shippingPrice: 0,
    saFloorNo: null,
    saFlatNo: null,
    id: 5331,
    guid: "269e4c3b-b9ba-4dcf-af80-2c13bc6c95a3",
    notes: null,
    delivery: null,
    message: null,
    reason: null,
    status: "delivered",
    seenUser: null,
    seenSeller: null,
    expire: null,
    reactedAt: null,
    approved: null,
    delivered: "2021-01-27T16:13:22.311Z",
    canceled: null,
    declined: null,
    DiscountId: null,
    buyerPhone: "+46070517896",
    buyerEmail: "malmv3g2f1+ucxt@hotmail.com",
    buyerFirstName: "Vilma",
    buyerLastName: "Olsson",
    buyerFullName: "Vilma Olsson",
    buyerBirthday: null,
    buyerStreetAddress: "Frösövägen",
    buyerStreetNumeric: "90",
    buyerEntrance: "b",
    buyerCity: "frösön",
    buyerState: null,
    buyerCountry: "Sweden",
    buyerZip: "83247",
    buyerCoordinates: null,
    shippingMethod: "postnord",
    saStreetAddress: "Frösövägen",
    saStreetNumeric: "90",
    saCity: "frösön",
    saState: null,
    saCountry: "Sweden",
    saEntrance: "b",
    saZip: "83247",
    saFloorType: null,
    saCoordinates: null,
    orderReference: null,
    createdAt: "2021-01-16T10:24:36.302Z",
    updatedAt: "2021-01-27T16:13:22.311Z",
    BuyerId: 15215,
    MerchantId: 34,
    ShippingAddressId: 10318,
    TransactionId: 6569,
    ShippingOrderId: 5735,
    ShippingMethodId: 1,
  },
  {
    price: 347,
    vat: 21,
    discount: 0,
    certDiscount: null,
    shippingTax: 0,
    total: 347,
    shippingPrice: 0,
    saFloorNo: null,
    saFlatNo: null,
    id: 5570,
    guid: "924b170e-4068-4a1c-9b81-ce75c31d31aa",
    notes: null,
    delivery: null,
    message: null,
    reason: null,
    status: "delivered",
    seenUser: null,
    seenSeller: null,
    expire: null,
    reactedAt: null,
    approved: null,
    delivered: "2021-02-03T16:12:02.157Z",
    canceled: null,
    declined: null,
    DiscountId: null,
    buyerPhone: "+46073912110",
    buyerEmail: "jilladolfsson@gmail.com",
    buyerFirstName: "Jill",
    buyerLastName: "Adolfsson",
    buyerFullName: "Jill Adolfsson",
    buyerBirthday: null,
    buyerStreetAddress: "Skolgatan",
    buyerStreetNumeric: "13",
    buyerEntrance: null,
    buyerCity: "Alingsås",
    buyerState: null,
    buyerCountry: "Sweden",
    buyerZip: "44135",
    buyerCoordinates: null,
    shippingMethod: "postnord",
    saStreetAddress: "Skolgatan",
    saStreetNumeric: "13",
    saCity: "Alingsås",
    saState: null,
    saCountry: "Sweden",
    saEntrance: null,
    saZip: "44135",
    saFloorType: null,
    saCoordinates: null,
    orderReference: null,
    createdAt: "2021-01-17T18:28:40.000Z",
    updatedAt: "2021-02-03T16:12:02.157Z",
    BuyerId: 15762,
    MerchantId: 34,
    ShippingAddressId: 10747,
    TransactionId: 6839,
    ShippingOrderId: 5972,
    ShippingMethodId: 1,
  },
  {
    price: 347,
    vat: 21,
    discount: 0,
    certDiscount: null,
    shippingTax: 0,
    total: 347,
    shippingPrice: 0,
    saFloorNo: null,
    saFlatNo: null,
    id: 5727,
    guid: "4b8168ca-2b9b-4d88-9a4c-8a4ebfe0a5ec",
    notes: null,
    delivery: null,
    message: null,
    reason: null,
    status: "delivered",
    seenUser: null,
    seenSeller: null,
    expire: null,
    reactedAt: null,
    approved: null,
    delivered: "2021-02-04T16:11:30.543Z",
    canceled: null,
    declined: null,
    DiscountId: null,
    buyerPhone: "+46070308695",
    buyerEmail: "elinaaberglund+sbvs@hotmail.se",
    buyerFirstName: "Elina",
    buyerLastName: "Berglund",
    buyerFullName: "Elina Berglund",
    buyerBirthday: null,
    buyerStreetAddress: "Skogsgatan",
    buyerStreetNumeric: "19",
    buyerEntrance: null,
    buyerCity: "Älvsbyn",
    buyerState: null,
    buyerCountry: "Sweden",
    buyerZip: "94231",
    buyerCoordinates: null,
    shippingMethod: "postnord",
    saStreetAddress: "Skogsgatan",
    saStreetNumeric: "19",
    saCity: "Älvsbyn",
    saState: null,
    saCountry: "Sweden",
    saEntrance: null,
    saZip: "94231",
    saFloorType: null,
    saCoordinates: null,
    orderReference: null,
    createdAt: "2021-01-18T09:30:51.040Z",
    updatedAt: "2021-02-04T16:11:30.543Z",
    BuyerId: 16117,
    MerchantId: 34,
    ShippingAddressId: 11025,
    TransactionId: 7023,
    ShippingOrderId: 6135,
    ShippingMethodId: 1,
  },
  {
    price: 1335,
    vat: 80,
    discount: 0,
    certDiscount: null,
    shippingTax: 0,
    total: 1335,
    shippingPrice: 0,
    saFloorNo: null,
    saFlatNo: null,
    id: 8664,
    guid: "fe1067ba-d3d3-4d1f-9991-dcf44b64910e",
    notes: null,
    delivery: null,
    message: null,
    reason: null,
    status: "failed",
    seenUser: null,
    seenSeller: null,
    expire: null,
    reactedAt: null,
    approved: null,
    delivered: null,
    canceled: null,
    declined: null,
    DiscountId: null,
    buyerPhone: "+46704445750",
    buyerEmail: "emmakallman@hotmail.com",
    buyerFirstName: "Emma-Karin",
    buyerLastName: "Källman",
    buyerFullName: "Emma-Karin Källman",
    buyerBirthday: null,
    buyerStreetAddress: "Ringvägen",
    buyerStreetNumeric: "127",
    buyerEntrance: null,
    buyerCity: "Stockholm",
    buyerState: null,
    buyerCountry: "Sweden",
    buyerZip: "11661",
    buyerCoordinates: null,
    shippingMethod: "postnord",
    saStreetAddress: "Ringvägen",
    saStreetNumeric: "127",
    saCity: "Stockholm",
    saState: null,
    saCountry: "Sweden",
    saEntrance: null,
    saZip: "11661",
    saFloorType: null,
    saCoordinates: null,
    orderReference: null,
    createdAt: "2021-02-04T15:42:11.556Z",
    updatedAt: "2021-02-04T15:42:47.881Z",
    BuyerId: 12372,
    MerchantId: 34,
    ShippingAddressId: 8255,
    TransactionId: 10275,
    ShippingOrderId: null,
    ShippingMethodId: 1,
  },
  {
    price: 1335,
    vat: 80,
    discount: 0,
    certDiscount: null,
    shippingTax: 0,
    total: 1335,
    shippingPrice: 0,
    saFloorNo: null,
    saFlatNo: null,
    id: 8665,
    guid: "325335b1-2094-4d0b-838e-9848354c6ebb",
    notes: null,
    delivery: null,
    message: null,
    reason: null,
    status: "delivered",
    seenUser: null,
    seenSeller: null,
    expire: null,
    reactedAt: null,
    approved: null,
    delivered: "2021-02-12T16:13:17.890Z",
    canceled: null,
    declined: null,
    DiscountId: null,
    buyerPhone: "+46704445750",
    buyerEmail: "emmakallman@hotmail.com",
    buyerFirstName: "Emma-Karin",
    buyerLastName: "Källman",
    buyerFullName: "Emma-Karin Källman",
    buyerBirthday: null,
    buyerStreetAddress: "Ringvägen",
    buyerStreetNumeric: "127",
    buyerEntrance: null,
    buyerCity: "Stockholm",
    buyerState: null,
    buyerCountry: "Sweden",
    buyerZip: "11661",
    buyerCoordinates: null,
    shippingMethod: "postnord",
    saStreetAddress: "Ringvägen",
    saStreetNumeric: "127",
    saCity: "Stockholm",
    saState: null,
    saCountry: "Sweden",
    saEntrance: null,
    saZip: "11661",
    saFloorType: null,
    saCoordinates: null,
    orderReference: null,
    createdAt: "2021-02-04T15:42:55.705Z",
    updatedAt: "2021-02-12T16:13:17.890Z",
    BuyerId: 12372,
    MerchantId: 34,
    ShippingAddressId: 8255,
    TransactionId: 10276,
    ShippingOrderId: 9111,
    ShippingMethodId: 1,
  },
  {
    price: 640,
    vat: 39,
    discount: 0,
    certDiscount: null,
    shippingTax: 0,
    total: 640,
    shippingPrice: 0,
    saFloorNo: null,
    saFlatNo: null,
    id: 9938,
    guid: "8726aa0b-298c-4631-a61b-bc65ecd26e72",
    notes: null,
    delivery: null,
    message: null,
    reason: null,
    status: "delivered",
    seenUser: null,
    seenSeller: null,
    expire: null,
    reactedAt: null,
    approved: null,
    delivered: "2021-02-24T16:14:00.072Z",
    canceled: null,
    declined: null,
    DiscountId: null,
    buyerPhone: "+46707695605",
    buyerEmail: "liljamadeleinebjork@gmail.com",
    buyerFirstName: "Lilja",
    buyerLastName: "Björk",
    buyerFullName: "Lilja Björk",
    buyerBirthday: null,
    buyerStreetAddress: "sandhamnsplan ",
    buyerStreetNumeric: "1",
    buyerEntrance: null,
    buyerCity: "stockholm",
    buyerState: null,
    buyerCountry: "Sweden",
    buyerZip: "11540",
    buyerCoordinates: null,
    shippingMethod: "postnord",
    saStreetAddress: "sandhamnsplan ",
    saStreetNumeric: "1",
    saCity: "stockholm",
    saState: null,
    saCountry: "Sweden",
    saEntrance: null,
    saZip: "11540",
    saFloorType: null,
    saCoordinates: null,
    orderReference: null,
    createdAt: "2021-02-18T14:29:37.081Z",
    updatedAt: "2021-02-24T16:14:00.072Z",
    BuyerId: 26384,
    MerchantId: 34,
    ShippingAddressId: 18552,
    TransactionId: 11706,
    ShippingOrderId: 10426,
    ShippingMethodId: 1,
  },
  {
    price: 834,
    vat: 50,
    discount: 0,
    certDiscount: null,
    shippingTax: 0,
    total: 834,
    shippingPrice: 0,
    saFloorNo: null,
    saFlatNo: null,
    id: 11518,
    guid: "c12fe67e-afad-4eb4-8b7d-2de62a38655b",
    notes: null,
    delivery: null,
    message: null,
    reason: null,
    status: "delivered",
    seenUser: null,
    seenSeller: null,
    expire: null,
    reactedAt: null,
    approved: null,
    delivered: "2021-03-16T16:12:09.295Z",
    canceled: null,
    declined: null,
    DiscountId: null,
    buyerPhone: "+460761465121",
    buyerEmail: "fredderaberg@gmail.com",
    buyerFirstName: "Fredrik",
    buyerLastName: "Råberg",
    buyerFullName: "Fredrik Råberg",
    buyerBirthday: null,
    buyerStreetAddress: "LÅNGSKEPPSGATAN",
    buyerStreetNumeric: "33",
    buyerEntrance: null,
    buyerCity: "Bromma",
    buyerState: null,
    buyerCountry: "Sweden",
    buyerZip: "16853",
    buyerCoordinates: null,
    shippingMethod: "postnord",
    saStreetAddress: "LÅNGSKEPPSGATAN",
    saStreetNumeric: "33",
    saCity: "Bromma",
    saState: null,
    saCountry: "Sweden",
    saEntrance: null,
    saZip: "16853",
    saFloorType: null,
    saCoordinates: null,
    orderReference: null,
    createdAt: "2021-03-07T14:08:21.560Z",
    updatedAt: "2021-03-16T16:12:09.295Z",
    BuyerId: 30181,
    MerchantId: 34,
    ShippingAddressId: 21501,
    TransactionId: 13456,
    ShippingOrderId: 12044,
    ShippingMethodId: 1,
  },
  {
    price: 1132,
    vat: 68,
    discount: 0,
    certDiscount: null,
    shippingTax: 0,
    total: 1132,
    shippingPrice: 0,
    saFloorNo: null,
    saFlatNo: null,
    id: 12220,
    guid: "48fe7fe6-b800-48c1-ab85-6d4978904a0f",
    notes: null,
    delivery: null,
    message: null,
    reason: null,
    status: "delivered",
    seenUser: null,
    seenSeller: null,
    expire: null,
    reactedAt: null,
    approved: null,
    delivered: "2021-03-17T16:14:21.584Z",
    canceled: null,
    declined: null,
    DiscountId: null,
    buyerPhone: "+46790161738",
    buyerEmail: "linavictoria0908+vadp@hotmail.com",
    buyerFirstName: "Lina Victoria ",
    buyerLastName: "Torres Garcia ",
    buyerFullName: "Lina Victoria  Torres Garcia ",
    buyerBirthday: null,
    buyerStreetAddress: "Fredsgatan ",
    buyerStreetNumeric: "6",
    buyerEntrance: "b",
    buyerCity: "Sundbyberg",
    buyerState: null,
    buyerCountry: "Sweden",
    buyerZip: "17233",
    buyerCoordinates: null,
    shippingMethod: "postnord",
    saStreetAddress: "Fredsgatan ",
    saStreetNumeric: "6",
    saCity: "Sundbyberg",
    saState: null,
    saCountry: "Sweden",
    saEntrance: "b",
    saZip: "17233",
    saFloorType: null,
    saCoordinates: null,
    orderReference: null,
    createdAt: "2021-03-13T20:39:05.372Z",
    updatedAt: "2021-03-17T16:14:21.584Z",
    BuyerId: 31764,
    MerchantId: 34,
    ShippingAddressId: 22759,
    TransactionId: 14238,
    ShippingOrderId: 12761,
    ShippingMethodId: 1,
  },
  {
    price: 1277,
    vat: 77,
    discount: 0,
    certDiscount: null,
    shippingTax: 0,
    total: 1277,
    shippingPrice: 0,
    saFloorNo: null,
    saFlatNo: null,
    id: 12582,
    guid: "6c7ed649-143a-4c58-82d8-20d7abaac78b",
    notes: null,
    delivery: null,
    message: null,
    reason: null,
    status: "delivered",
    seenUser: null,
    seenSeller: null,
    expire: null,
    reactedAt: null,
    approved: null,
    delivered: "2021-05-18T12:55:08.743Z",
    canceled: null,
    declined: null,
    DiscountId: null,
    buyerPhone: "+46768388388",
    buyerEmail: "benjamin.agaga@yahoo.com",
    buyerFirstName: "Benjamin Philshinn Agaga",
    buyerLastName: "Agaga",
    buyerFullName: "Benjamin Philshinn Agaga",
    buyerBirthday: null,
    buyerStreetAddress: "Knipvägen",
    buyerStreetNumeric: "70",
    buyerEntrance: null,
    buyerCity: "Åkersberga",
    buyerState: null,
    buyerCountry: "Sweden",
    buyerZip: "18462",
    buyerCoordinates: null,
    shippingMethod: "postnord",
    saStreetAddress: "Knipvägen",
    saStreetNumeric: "70",
    saCity: "Åkersberga",
    saState: null,
    saCountry: "Sweden",
    saEntrance: null,
    saZip: "18462",
    saFloorType: null,
    saCoordinates: null,
    orderReference: null,
    createdAt: "2021-03-16T13:40:31.115Z",
    updatedAt: "2021-05-18T12:55:08.743Z",
    BuyerId: 16324,
    MerchantId: 34,
    ShippingAddressId: 11166,
    TransactionId: 14638,
    ShippingOrderId: 13118,
    ShippingMethodId: 1,
  },
  {
    price: 347,
    vat: 21,
    discount: 0,
    certDiscount: null,
    shippingTax: 0,
    total: 347,
    shippingPrice: 0,
    saFloorNo: null,
    saFlatNo: null,
    id: 25493,
    guid: "c80ea5d6-471b-46ec-9fbe-1f10e659e013",
    notes: null,
    delivery: null,
    message: null,
    reason: null,
    status: "delivered",
    seenUser: null,
    seenSeller: null,
    expire: null,
    reactedAt: null,
    approved: null,
    delivered: "2021-09-03T16:09:56.730Z",
    canceled: null,
    declined: null,
    DiscountId: null,
    buyerPhone: "+46700734939",
    buyerEmail: "joywanjiru24+ffru@gmail.com",
    buyerFirstName: "Joy",
    buyerLastName: "Wanjiru",
    buyerFullName: "Joy Wanjiru",
    buyerBirthday: null,
    buyerStreetAddress: "Fornborgsvägen 7",
    buyerStreetNumeric: "7",
    buyerEntrance: null,
    buyerCity: "Östersund",
    buyerState: null,
    buyerCountry: "Sweden",
    buyerZip: "83251",
    buyerCoordinates: null,
    shippingMethod: "postnord",
    saStreetAddress: "Fornborgsvägen 7",
    saStreetNumeric: "7",
    saCity: "Östersund",
    saState: null,
    saCountry: "Sweden",
    saEntrance: null,
    saZip: "83251",
    saFloorType: null,
    saCoordinates: null,
    orderReference: null,
    createdAt: "2021-09-03T06:58:37.378Z",
    updatedAt: "2021-09-03T16:09:56.730Z",
    BuyerId: 60309,
    MerchantId: 34,
    ShippingAddressId: 44775,
    TransactionId: 29794,
    ShippingOrderId: 26887,
    ShippingMethodId: 1,
  },
  {
    price: 1101,
    vat: 66,
    discount: 0,
    certDiscount: null,
    shippingTax: 0,
    total: 1101,
    shippingPrice: 0,
    saFloorNo: null,
    saFlatNo: null,
    id: 29357,
    guid: "1f5b722c-819b-4d11-92ae-df8efdb56b67",
    notes: null,
    delivery: null,
    message: null,
    reason: null,
    status: "delivered",
    seenUser: null,
    seenSeller: null,
    expire: null,
    reactedAt: null,
    approved: null,
    delivered: "2021-10-06T16:08:09.840Z",
    canceled: null,
    declined: null,
    DiscountId: null,
    buyerPhone: "+460760102950",
    buyerEmail: "jezzzica.hellstrom@gmail.com",
    buyerFirstName: "jessica",
    buyerLastName: "Hellström",
    buyerFullName: "jessica Hellström",
    buyerBirthday: null,
    buyerStreetAddress: "BERGSLAGSVÄGEN",
    buyerStreetNumeric: "298",
    buyerEntrance: null,
    buyerCity: "Bromma",
    buyerState: null,
    buyerCountry: "Sweden",
    buyerZip: "16842",
    buyerCoordinates: null,
    shippingMethod: "postnord",
    saStreetAddress: "BERGSLAGSVÄGEN",
    saStreetNumeric: "298",
    saCity: "Bromma",
    saState: null,
    saCountry: "Sweden",
    saEntrance: null,
    saZip: "16842",
    saFloorType: null,
    saCoordinates: null,
    orderReference: "3p61JW",
    createdAt: "2021-10-02T12:50:32.057Z",
    updatedAt: "2021-10-06T16:08:09.840Z",
    BuyerId: 69776,
    MerchantId: 34,
    ShippingAddressId: 51848,
    TransactionId: 34885,
    ShippingOrderId: 31494,
    ShippingMethodId: 1,
  },
];
const sales = [
  {
    price: 25,
    id: 105053,
    status: "available",
    format: "paperback",
    condition: "very good",
    comment: "NB. Boken er på svensk.",
    delivery: "both",
    currency: "NOK",
    guid: "06f67def-3485-4839-94ec-daf2d5ebdc72",
    returnDate: null,
    onHand: null,
    mainSaleId: null,
    createdAt: "2019-02-23T13:08:27.006Z",
    updatedAt: "2021-08-20T11:50:59.517Z",
    BookId: 203408,
    SellerId: 23381,
  },
  {
    price: 20,
    id: 991804,
    status: "available",
    format: "paperback",
    condition: "good",
    comment: null,
    delivery: "both",
    currency: "NOK",
    guid: "0bbbbbed-c576-4ddd-8618-d7e72bc224fe",
    returnDate: null,
    onHand: null,
    mainSaleId: null,
    createdAt: "2021-08-20T15:56:04.295Z",
    updatedAt: "2021-08-20T15:56:04.295Z",
    BookId: 203408,
    SellerId: 119674,
  },
  {
    price: 40,
    id: 190957,
    status: "available",
    format: "paperback",
    condition: "like new",
    comment: "",
    delivery: "both",
    currency: "NOK",
    guid: "e4242064-b4e8-4195-84b2-d9fe1d12b16d",
    returnDate: null,
    onHand: null,
    mainSaleId: null,
    createdAt: "2019-08-19T08:55:30.008Z",
    updatedAt: "2021-06-03T11:14:45.910Z",
    BookId: 203408,
    SellerId: 29467,
  },
  {
    price: 50,
    id: 291589,
    status: "available",
    format: "paperback",
    condition: "very good",
    comment: "",
    delivery: "both",
    currency: "NOK",
    guid: "7b11a1ab-430e-4221-a890-2780db001efd",
    returnDate: null,
    onHand: null,
    mainSaleId: null,
    createdAt: "2020-02-01T12:57:01.210Z",
    updatedAt: "2021-06-03T10:47:43.251Z",
    BookId: 203408,
    SellerId: 32938,
  },
  {
    price: 25,
    id: 611984,
    status: "available",
    format: "paperback",
    condition: "very good",
    comment: null,
    delivery: "both",
    currency: "NOK",
    guid: "00616147-985d-4ab4-bd7f-78297ca5a379",
    returnDate: null,
    onHand: null,
    mainSaleId: null,
    createdAt: "2020-12-20T15:32:29.733Z",
    updatedAt: "2021-07-26T12:46:10.456Z",
    BookId: 203408,
    SellerId: 127708,
  },
  {
    price: 50,
    id: 340395,
    status: "deactivated",
    format: "paperback",
    condition: "acceptable",
    comment: "",
    delivery: "both",
    currency: "NOK",
    guid: "16c9c403-e385-4be9-86c2-d497b36555bf",
    returnDate: null,
    onHand: null,
    mainSaleId: null,
    createdAt: "2019-08-11T19:50:05.167Z",
    updatedAt: "2020-06-22T10:44:12.272Z",
    BookId: 203408,
    SellerId: 38036,
  },
  {
    price: 20,
    id: 526911,
    status: "deleted",
    format: "paperback",
    condition: "like new",
    comment: "Helt ny bok som ikke er blitt brukt/lest",
    delivery: "both",
    currency: "NOK",
    guid: "5880abf8-6c14-4dde-9687-3e1643131cc0",
    returnDate: null,
    onHand: null,
    mainSaleId: null,
    createdAt: "2020-10-01T12:01:45.032Z",
    updatedAt: "2021-09-22T08:31:28.218Z",
    BookId: 203408,
    SellerId: 105497,
  },
  {
    price: 20,
    id: 597698,
    status: "available",
    format: "paperback",
    condition: "like new",
    comment: null,
    delivery: "both",
    currency: "NOK",
    guid: "b41480d8-908d-4697-9856-3c17b42b55a5",
    returnDate: null,
    onHand: null,
    mainSaleId: null,
    createdAt: "2020-12-05T16:29:40.024Z",
    updatedAt: "2021-06-03T11:04:34.308Z",
    BookId: 203408,
    SellerId: 124919,
  },
  {
    price: 20,
    id: 913141,
    status: "available",
    format: "paperback",
    condition: "good",
    comment: null,
    delivery: "both",
    currency: "NOK",
    guid: "e41cade8-237e-4dba-b8ff-d56d006e13fe",
    returnDate: null,
    onHand: null,
    mainSaleId: null,
    createdAt: "2021-07-23T11:05:13.727Z",
    updatedAt: "2021-07-23T11:05:13.727Z",
    BookId: 203408,
    SellerId: 118834,
  },
  {
    price: 20,
    id: 422464,
    status: "available",
    format: "paperback",
    condition: "like new",
    comment: "Som ny",
    delivery: "meetup",
    currency: "NOK",
    guid: "a5edda08-2491-4217-a7b2-c55c581e3b38",
    returnDate: null,
    onHand: null,
    mainSaleId: null,
    createdAt: "2020-08-11T09:25:16.625Z",
    updatedAt: "2021-06-03T10:51:09.756Z",
    BookId: 203408,
    SellerId: 88858,
  },
  {
    price: 20,
    id: 431010,
    status: "available",
    format: "paperback",
    condition: "very good",
    comment: null,
    delivery: "both",
    currency: "NOK",
    guid: "1aa895d3-d6d3-47e0-b3cb-dc5cb6a6ab62",
    returnDate: null,
    onHand: null,
    mainSaleId: null,
    createdAt: "2020-08-12T19:05:29.802Z",
    updatedAt: "2021-06-03T10:51:31.707Z",
    BookId: 203408,
    SellerId: 89971,
  },
  {
    price: 20,
    id: 879206,
    status: "sold",
    format: "paperback",
    condition: "like new",
    comment: null,
    delivery: "both",
    currency: "NOK",
    guid: "f03dba67-9d62-4cfd-9378-63fa99fea36c",
    returnDate: null,
    onHand: null,
    mainSaleId: null,
    createdAt: "2021-06-21T13:26:29.526Z",
    updatedAt: "2021-09-23T10:36:27.755Z",
    BookId: 203408,
    SellerId: 119674,
  },
];

const bookdata = {
  id: 58294,
  isbn: 9788205191822,
  Sales: sales,
};

const dab = {
  orders: () => [],
};

function getOnDemandSaleStatus(book, db) {
  const _60days = 24 * 60 * 60 * 1000 * 60;
  const last60DaysDate = new Date(Date.now() - _60days);
  const saleStatuses = { low: "low", medium: "medium", high: "high" };
  const bookSales = book.Sales;
  const orders = db.orders();

  if (bookSales.length === 0 && orders.length === 0) {
    return saleStatuses.low;
  }

  const getAmountByStatus = (statuses, content = null) => {
    let amount = 0;
    if (content && content.length > 0) {
      content.forEach((el) => {
        if (statuses.includes(el.status)) {
          amount = amount + el.price;
        }
      });
    } else {
      if (bookSales && bookSales.length > 0) {
        bookSales.forEach((el) => {
          if (statuses.includes(el.status)) {
            amount = amount + el.price;
          }
        });
      }
    }
    return amount;
  };

  const filter = (content, status) =>
    _.filter(
      content,
      (el) => status.includes(el.status) && new Date(el.updatedAt) >= last60DaysDate
    );

  const salesWithGodStatus = filter(bookSales, ["available", "sold", "requested"])
  const ordersWithGodStatus = filter(bookSales, ['delivered', 'waiting', 'pending'])

  const saleWithHighPriceValue = _.maxBy(salesWithGodStatus, 'price')
  const orderWithHighPriceValue = _.maxBy(ordersWithGodStatus, 'price')

  const setStatus  = (highSaleValue, nberOfSales) => {
    console.log('#############################################################################');
    const low = highSaleValue / 3, medium = low*2, high = highSaleValue
    

  console.log('sale with max sale price value is =  ', highSaleValue);
  console.log('number of sales is  ', nberOfSales);
  console.log(`low = 1---${low} ##### medium = ${low+1}---${medium}, #### max = ${medium+1}---${high}`);
 
    if(nberOfSales >= 1 && nberOfSales <= low) return saleStatuses.low
    else if(nberOfSales >=  low+1 && nberOfSales <= medium ) return saleStatuses.medium
    return saleStatuses.high

  }

  const saleStatus = saleWithHighPriceValue ? setStatus(saleWithHighPriceValue.price, salesWithGodStatus.length) : saleStatuses.low
  const orderStatus = orderWithHighPriceValue ? setStatus(orderWithHighPriceValue.price, ordersWithGodStatus.length) : saleStatuses.low

  console.log('on demand status sale for this book is : ',saleStatus);
  console.log('on demand status order for this book is : ',orderStatus);




  const amountOfSales = getAmountByStatus(["available", "sold", "requested"]);
  const amountOfSoldSales = getAmountByStatus(["sold"]);

  const amountOfFailedOrders = getAmountByStatus(
    ['delivered', 'waiting', 'pending'],
    filter(orders)
  );
  const amountOfDeliveredOrders = getAmountByStatus(['delivered'], filter(orders));

  console.log(
    "amountOfSales ",
    amountOfSales,
    "; amountOfSoldSales : ",
    amountOfSoldSales
  );
  console.log(
    "amountOfFailedOrders ",
    amountOfFailedOrders,
    "; amountOfDeliveredOrders : ",
    amountOfDeliveredOrders
  );

  const countByStatus = (status, ordersFromDb = false) => {
    if (ordersFromDb) {
      return ordersFromDb &&
        Array.isArray(ordersFromDb) &&
        ordersFromDb.length > 0
        ? filter(ordersFromDb, status).length
        : 0;
    }
    return bookSales && Array.isArray(bookSales) && bookSales.length > 0
      ? filter(bookSales, status).length
      : 0;
  };

  const available = countByStatus("available");
  const sold = countByStatus("sold");

  const waiting = countByStatus("waiting", orders);
  const delivered = countByStatus("delivered", orders);

  const getAverage = (status1, status2) => {
    if (status1 === 0 && status2 === 0) {
      return 0;
    }

    if (status1 === 0 && status2 > 0) return 100;
    if (status2 === 0) return 0;
    return Math.floor((status2 / status1) * 100);
  };

  const usedBookAverage = getAverage(available, sold);
  const newBookAverage = getAverage(waiting, delivered);

  if (usedBookAverage === 0 && newBookAverage === 0) {
    return saleStatuses.low;
  }

  const average = Math.floor((usedBookAverage + newBookAverage) / 2);

  if (average >= 0 && average < 34) return saleStatuses.low;
  if (average > 33 && average < 67) return saleStatuses.medium;
  return saleStatuses.high;
}

const result = getOnDemandSaleStatus(bookdata, dab);

console.log("result for the book ", bookdata.isbn, " is status : ", result);

// function last60ds() {
//   const saleDate = new Date("2021-06-03T10:51:31.707Z");

//   const _60days = 24 * 60 * 60 * 1000 * 60;
//   const last60DaysDate = new Date(Date.now() - _60days);
//   console.log(
//     "dateof the last 60 days is : ",
//     last60DaysDate,
//     ", current Date is : ",
//     new Date(Date.now()),
//     ", date of the sale is : ",
//     saleDate
//   );
//   console.log(saleDate >= last60DaysDate, new Date(Date.now()));
// }

// last60ds();

// function localGenerator(s3 = null, books, fileNumber) {
//   const fs = require("fs");
//   const fileName = `local_generated_product_feed_${fileNumber}.csv`;
//   const fields = [
//     "id",
//     "description",
//     "image_link",
//     "link",
//     "title",
//     "price",
//     "gtin",
//     "product_type",
//     "condition",
//     "custom_label_0",
//     "custom_label_1",
//     "custom_label_2",
//     "custom_label_3",
//     "custom_label_4",
//     "availability",
//     "google_product_category",
//     "item_group_id",
//     "availability_date",
//     "cost_of_goods_sold",
//   ];

//   const result = parse(books, { fields });
//   const resultBuffer = Buffer.from(result, "utf-8");

//   fs.open(fileName, "w", (err, fd) => {
//     if (err) {
//       throw "could not open file: " + err;
//     }

//     fs.write(fd, resultBuffer, 0, resultBuffer.length, null, (err) => {
//       if (err) throw "error writing file: " + err;
//       fs.close(fd, () => {
//         console.log("wrote the file successfully");
//       });
//     });
//   });
// }



function localGenerator (s3 = null, books, fileNumber) {
	// eslint-disable-next-line global-require
	const fs = require('fs')
	const fileName = `productFeedTestGenerator/local_generated_product_feed_${fileNumber}.csv`
	const fields = [
		'id',
		'description',
		'image_link',
		'link',
		'title',
		'price',
		'gtin',
		'product_type',
		'condition',
		'custom_label_0',
		'custom_label_1',
		'custom_label_2',
		'custom_label_3',
		'custom_label_4',
		'availability',
		'google_product_category',
		'item_group_id',
		'availability_date',
		'cost_of_goods_sold'
	]

	const result = parse(books, { fields })
	const resultBuffer = Buffer.from(result, 'utf-8')

	fs.open(fileName, 'w', (err, fd) => {
		if (err) {
			// eslint-disable-next-line no-throw-literal
			throw `could not open file: ${err}`
		}

		// eslint-disable-next-line no-shadow
		fs.write(fd, resultBuffer, 0, resultBuffer.length, null, (err) => {
			// eslint-disable-next-line no-throw-literal
			if (err) throw `error writing file: ${err}`
			fs.close(fd, () => {
				console.log('wrote the file successfully')
			})
		})
	})
}