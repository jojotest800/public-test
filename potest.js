const fs = require("fs");
const xmlbuilder = require("xmlbuilder");
const moment = require("moment");

const startDate = moment().subtract(1, 'days').startOf('day')

const orderTest = {
  id: `${startDate.format('DDMMYYYY')}1`,
  createdAt: new Date(),
  Products: [
    {
      price: 47,
      vat: 6,
      discount: 0,
      id: 27262,
      image: "https://static-se.bookis.com/books/78797/full.jpg",
      title: "Lazarus",
      format: "paperback",
      year: 2019,
      quantity: 1,
      condition: "new",
      language: "",
      fullIsbn: "9789175039817",
      author: "Lars Kepler",
      discountPercent: 0,
      supplyStatus: "Active",
      supplyAvailability: "In stock",
      supplySupplier: "SAMD",
      supplyDate: null,
      fsDELink: null,
      trackingReference: null,
      routingCode: null,
      routingDescription: null,
      createdAt: "2021-06-03T15:57:18.010Z",
      updatedAt: "2021-06-03T15:57:18.010Z",
      OrderId: 18021,
      BookId: 78797,
    },
    {
      price: 31,
      vat: 6,
      discount: 0,
      id: 27263,
      image: "https://static-se.bookis.com/books/61305/full.jpg",
      title: "Jack &amp; Jill",
      format: "hardcover",
      year: 2017,
      quantity: 1,
      condition: "new",
      language: "",
      fullIsbn: "9789177017721",
      author: "James Patterson",
      discountPercent: 0,
      supplyStatus: "Active",
      supplyAvailability: "In stock",
      supplySupplier: "FSYS",
      supplyDate: null,
      fsDELink: null,
      trackingReference: null,
      routingCode: null,
      routingDescription: null,
      createdAt: "2021-06-03T15:57:18.010Z",
      updatedAt: "2021-06-03T15:57:18.010Z",
      OrderId: 18021,
      BookId: 61305,
    },
    {
      price: 47,
      vat: 6,
      discount: 0,
      id: 27264,
      image: "https://static-se.bookis.com/books/67795/full.jpg",
      title: "Paganinikontraktet",
      format: "paperback",
      year: 2011,
      quantity: 1,
      condition: "new",
      language: "",
      fullIsbn: "9789170018831",
      author: "Lars Kepler",
      discountPercent: 0,
      supplyStatus: "Active",
      supplyAvailability: "In stock",
      supplySupplier: "SAMD",
      supplyDate: null,
      fsDELink: null,
      trackingReference: null,
      routingCode: null,
      routingDescription: null,
      createdAt: "2021-06-03T15:57:18.010Z",
      updatedAt: "2021-06-03T15:57:18.010Z",
      OrderId: 18021,
      BookId: 67795,
    },
  ],
  supplySupplierId: 102,
};

const GLN_NUMBER = "7080010001559";
const bokinfoGLN = "7350046880009";

const buildXMLOrder = (order) => {
  if (!GLN_NUMBER) {
    throw new Error("GLN_NUMBER is not set!");
  }
  const issueDate = moment(order.createdAt).format("YYYYMMDDTHHmm");
  const xml = xmlbuilder.create("EDItXMessage").att("version", "1.6");
  const editxMessageHeader = xmlbuilder.create({
    EDItXMessageHeader: {
      InterchangeReference: `${order.id}_Order`,
      MessageNumber: 22,
      DocumentType: "Order",
      VersionNumber: "1.3",
      NumberOfDocuments: 1,
      Sender: {
        PartyID: {
          PartyIDType: "GLN",
          Identifier: GLN_NUMBER,
        },
        PartyName: {
          NameLine: "Bookis",
        },
        CommunicationDetails: {
          CommunicationTypeCode: "Email",
          CommunicationLocator: "merchant@bookis.com",
        },
      },
      Receiver: {
        PartyID: {
          PartyIDType: "GLN",
          Identifier: bokinfoGLN,
        },
      },
      PurposeCode: "Original",
      SentDateTime: moment().format("YYYYMMDDTHHmm"),
    },
  });
  xml.importDocument(editxMessageHeader);

  const header = xmlbuilder.create({
    Header: {
      OrderNumber: order.id,
      IssueDateTime: issueDate,
      PurposeCode: "Original",
      BuyerParty: {
        PartyID: {
          PartyIDType: "GLN",
          Identifier: GLN_NUMBER,
        },
        PartyName: {
          NameLine: "ENVIV AS",
        },
      },
      SellerParty: {
        PartyID: {
          PartyIDType: "GLN",
          Identifier: bokinfoGLN,
        },
        AdditionalPartyID: {
          Identifier: order.supplySupplierId,
        },
      },
    },
  });

  const editxMessagePayload = xmlbuilder.create({
    EDItXMessagePayload: {},
  });
  const xmlOrder = xmlbuilder.create({
    Order: {
      "@version": 1.3,
    },
  });
  xmlOrder.importDocument(header);
  order.Products.forEach((product, index) => {
    const itemDetail = xmlbuilder.create({
      ItemDetail: {
        LineNumber: index + 1,
        ProductID: {
          ProductIDType: "EAN13",
          Identifier: product.fullIsbn,
        },
        OrderQuantity: product.quantity,
        ReferenceCoded: {
          ReferenceTypeCode: "BuyersOrderLineReference",
          ReferenceNumber: product.id,
        },
      },
    });
    xmlOrder.importDocument(itemDetail);
  });

  const summary = xmlbuilder.create({
    Summary: {
      NumberOfLines: order.Products.length,
    },
  });
  try {
    xmlOrder.importDocument(summary);
  } catch (err1) {
    console.log(err1);
  }
  try {
    editxMessagePayload.importDocument(xmlOrder);
  } catch (err2) {
    console.log(err2);
  }
  try {
    xml.importDocument(editxMessagePayload);
  } catch (err3) {
    console.log(err3);
  }
  const orderCoverted = xml.end({ pretty: true });

  const fileName = `PO_${moment().format('YYYYMMDDHHmmss')}_${order.id}.xml`

  fs.writeFile(fileName, orderCoverted, (error) => {
    if (error) {
      reject(error);
    }
    console.log('file written successfully');
  });

};

buildXMLOrder(orderTest)
