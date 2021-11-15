const _ = require("lodash");
const xmltojson = require("xml2json");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const file1 = path.resolve(
    "xml2json",
    "new-3-files",
    "21-10-artupd1_20211020.xml_onix.xml"
  ),
  file2 = path.resolve(
    "xml2json",
    "new-3-files",
    "2-artupd2_20211019.xml_onix.xml"
  ),
  file3 = path.resolve(
    "xml2json",
    "new-3-files",
    "3-artupd2_20211018.xml_onix (1).xml"
  ),
  file4 = path.resolve(
    "xml2json",
    "new-3-files",
    "16-26-20-artupd1_20211019.xml_onix.xml"
  );

const {
  getTaxType,
  getStatus,
  getAvailability,
  getPriceType,
} = require("./external");

const product = {
  RecordReference: "9789180084857",
  NotificationType: "01",
  ProductIdentifier: {
    ProductIDType: "03",
    IDValue: "9789180084857",
  },
  DescriptiveDetail: {
    ProductComposition: "00",
    ProductForm: "BB",
    Measure: [
      {
        MeasureType: "02",
        Measurement: "193",
        MeasureUnitCode: "mm",
      },
      {
        MeasureType: "01",
        Measurement: "246",
        MeasureUnitCode: "mm",
      },
      {
        MeasureType: "03",
        Measurement: "10",
        MeasureUnitCode: "mm",
      },
      {
        MeasureType: "08",
        Measurement: "300",
        MeasureUnitCode: "gr",
      },
    ],
    Collection: {
      CollectionType: "10",
      TitleDetail: [
        {
          TitleType: "01",
          TitleElement: {
            TitleElementLevel: "02",
            TitleText: "Nina och Nino lär om",
          },
        },
      ],
    },
    TitleDetail: [
      {
        TitleType: "01",
        TitleElement: {
          TitleElementLevel: "01",
          TitleText: "Nina och Nino lär om… Titanic",
        },
      },
      {
        TitleType: "10",
        TitleElement: {
          TitleElementLevel: "01",
          TitleText: "Nina och Nino lär om… Titanic",
        },
      },
      {
        TitleType: "03",
        TitleElement: {
          TitleElementLevel: "01",
          TitleText:
            "Le Fil de l'Histoire raconté par Ariane & Nino - Le Titanic, Naufrage d'un géant",
        },
      },
    ],
    Contributor: [
      {
        SequenceNumber: "1",
        ContributorRole: "A01",
        PersonNameInverted: "Erre, Fabrice",
        NamesBeforeKey: "Fabrice",
        KeyNames: "Erre",
      },
      {
        SequenceNumber: "2",
        ContributorRole: "A12",
        PersonNameInverted: "Savoia, Sylvain",
        NamesBeforeKey: "Sylvain",
        KeyNames: "Savoia",
      },
    ],
    EditionNumber: "1",
    Language: {
      LanguageRole: "01",
      LanguageCode: "swe",
    },
    Extent: {
      ExtentType: "00",
      ExtentValue: "50",
      ExtentUnit: "03",
    },
    Illustrated: "02",
    Subject: [
      {
        SubjectSchemeIdentifier: "47",
        SubjectCode: "61",
        SubjectHeadingText: "Skönlitteratur barn och ungdom",
      },
      {
        MainSubject: "",
        SubjectSchemeIdentifier: "93",
        SubjectCode: "YFT",
      },
      {
        SubjectSchemeIdentifier: "98",
        SubjectCode: "5AK",
      },
    ],
    AudienceRange: {
      AudienceRangeQualifier: "17",
      AudienceRangePrecision: "03",
      AudienceRangeValue: "9",
    },
  },
  CollateralDetail: "",
  PublishingDetail: {
    Publisher: {
      PublishingRole: "04",
      PublisherName: "Dupuis",
    },
    PublishingDate: {
      PublishingDateRole: "01",
      Date: "20220502",
    },
  },
  ProductSupply: {
    SupplyDetail: [
      {
        Supplier: {
          SupplierRole: "02",
          SupplierIdentifier: [
            {
              SupplierIDType: "01",
              IDTypeName: "BR-ID",
              IDValue: "3325",
            },
            {
              SupplierIDType: "01",
              IDTypeName: "Distributor_kortnamn",
              IDValue: "HEGA",
            },
          ],
          SupplierName: "Hegas Förlag",
        },
        ProductAvailability: "10",
        Price: {
          UnpricedItemType: "01",
        },
      },
    ],
  },
};

const product2 = {
  ProductSupply: {
    SupplyDetail: [
      {
        Price: [{ UnpricedItemType: "01" }],
        Stock: { OnHand: "0" },
        Supplier: {
          SupplierName: "Nypon förlag",
          SupplierRole: "02",
          SupplierIdentifier: [
            { IDValue: "4777", IDTypeName: "BR-ID", SupplierIDType: "01" },
            {
              IDValue: "NYPO",
              IDTypeName: "Distributor_kortnamn",
              SupplierIDType: "01",
            },
          ],
        },
        ProductAvailability: "43",
      },
      {
        Price: [
          {
            Tax: { TaxType: "01", TaxRatePercent: "6" },
            PriceType: "05",
            PriceAmount: "77.00",
          },
        ],
        Stock: { OnHand: "0" },
        Supplier: {
          SupplierName: "Förlagssystem bokimporten",
          SupplierRole: "03",
          SupplierIdentifier: [
            { IDValue: "3279", IDTypeName: "BR-ID", SupplierIDType: "01" },
            {
              IDValue: "FSBI",
              IDTypeName: "Distributor_kortnamn",
              SupplierIDType: "01",
            },
          ],
        },
        ProductAvailability: "40",
      },
      {
        Price: [
          {
            Tax: { TaxType: "01", TaxRatePercent: "6" },
            PriceType: "05",
            PriceAmount: "89.00",
          },
        ],
        Stock: { OnHand: "0" },
        Supplier: {
          SupplierName: "Logistikteamet Sverige AB",
          SupplierRole: "03",
          SupplierIdentifier: [
            { IDValue: "4106", IDTypeName: "BR-ID", SupplierIDType: "01" },
            {
              IDValue: "LAOR",
              IDTypeName: "Distributor_kortnamn",
              SupplierIDType: "01",
            },
            { IDValue: "7365565626007", SupplierIDType: "06" },
          ],
        },
        ProductAvailability: "43",
      },
    ],
  },
  RecordReference: "9780237541101",
  CollateralDetail: {
    TextContent: [
      {
        Text: "En ung guvernant får sitt första jobb på en ödslig herrgård på den engelska landsbygden under mitten på 1800-talet. Hon får ta hand om de två föräldralösa barnen Miles och Flora, som visar sig ha särskilda egenskaper ... Den unga guvernanten fattar snart misstankar mot sin arbetsplats. Vilar det onda krafter i huset? Henry James har skrivit verket som är en av våra mest klassiska spökhistorier. Boken på lättläst engelska har illustrationer i fyrfärg och innehåller ordförklaringar och övningar. I litteraturutredningen från 2012 betonas värdet av klassiker som hjälper oss att förstå dagens samhälle. En klassiker berör och talar till läsare även i vår tid och gör oss lite klokare och reflekterande.",
        TextType: "03",
        ContentAudience: "00",
      },
      {
        Text: "En ung guvernant får sitt första jobb på en ödslig herrgård på den engelska landsbygden under mitten på 1800-talet. Hon får ta hand om de två föräldralösa barnen Miles och Flora, som visar sig ha särskilda egenskaper ...",
        TextType: "02",
        ContentAudience: "00",
      },
    ],
  },
  NotificationType: "02",
  PublishingDetail: {
    Publisher: {
      PublisherName: "Readzone books limited",
      PublishingRole: "04",
    },
    PublishingDate: { Date: "20120210", PublishingDateRole: "01" },
  },
  DescriptiveDetail: {
    Extent: { ExtentType: "00", ExtentUnit: "03", ExtentValue: "32" },
    Measure: [
      { MeasureType: "01", Measurement: "211", MeasureUnitCode: "mm" },
      { MeasureType: "08", Measurement: "138", MeasureUnitCode: "gr" },
    ],
    Subject: [
      {
        SubjectCode: "61",
        SubjectHeadingText: "Skönlitteratur barn och ungdom",
        SubjectSchemeIdentifier: "47",
      },
      { SubjectCode: "uHe", SubjectSchemeIdentifier: "48" },
      { MainSubject: "", SubjectCode: "YFA", SubjectSchemeIdentifier: "93" },
      { SubjectCode: "YFD", SubjectSchemeIdentifier: "93" },
      { SubjectCode: "5AN", SubjectSchemeIdentifier: "98" },
      { SubjectCode: "5AR", SubjectSchemeIdentifier: "98" },
    ],
    Language: { LanguageCode: "eng", LanguageRole: "01" },
    Collection: {
      TitleDetail: [
        {
          TitleType: "01",
          TitleElement: {
            TitleText: "ESSENTIAL CLASSICS - HORROR CL",
            TitleElementLevel: "02",
          },
        },
      ],
      CollectionType: "10",
    },
    Contributor: [
      {
        KeyNames: "James",
        NamesBeforeKey: "Henry",
        SequenceNumber: "1",
        ContributorRole: "A01",
        PersonNameInverted: "James, Henry",
      },
    ],
    Illustrated: "01",
    ProductForm: "BC",
    TitleDetail: [
      {
        TitleType: "01",
        TitleElement: {
          TitleText: "Turn of the screw",
          TitleElementLevel: "01",
        },
      },
      {
        TitleType: "10",
        TitleElement: {
          TitleText: "Turn of the screw",
          TitleElementLevel: "01",
        },
      },
    ],
    AudienceRange: {
      AudienceRangeValue: "12",
      AudienceRangePrecision: "03",
      AudienceRangeQualifier: "17",
    },
    ProductFormDetail: "B113",
    ProductComposition: "00",
  },
  ProductIdentifier: { IDValue: "9780237541101", ProductIDType: "03" },
};

const product3 = {
  ProductSupply: {
    SupplyDetail: [
      {
        Price: [{ UnpricedItemType: "01" }],
        Stock: { OnHand: "0" },
        Supplier: {
          SupplierName: "Nypon förlag",
          SupplierRole: "02",
          SupplierIdentifier: [
            { IDValue: "4777", IDTypeName: "BR-ID", SupplierIDType: "01" },
            {
              IDValue: "NYPO",
              IDTypeName: "Distributor_kortnamn",
              SupplierIDType: "01",
            },
          ],
        },
        ProductAvailability: "43",
      },
      {
        Price: [
          {
            Tax: { TaxType: "01", TaxRatePercent: "6" },
            PriceType: "05",
            PriceAmount: "107.00",
          },
        ],
        Stock: { OnHand: "0" },
        Supplier: {
          SupplierName: "Förlagssystem bokimporten",
          SupplierRole: "03",
          SupplierIdentifier: [
            { IDValue: "3279", IDTypeName: "BR-ID", SupplierIDType: "01" },
            {
              IDValue: "FSBI",
              IDTypeName: "Distributor_kortnamn",
              SupplierIDType: "01",
            },
          ],
        },
        ProductAvailability: "40",
      },
      {
        Price: [
          {
            Tax: { TaxType: "01", TaxRatePercent: "6" },
            PriceType: "05",
            PriceAmount: "89.00",
          },
        ],
        Stock: { OnHand: "0" },
        Supplier: {
          SupplierName: "Logistikteamet Sverige AB",
          SupplierRole: "03",
          SupplierIdentifier: [
            { IDValue: "4106", IDTypeName: "BR-ID", SupplierIDType: "01" },
            {
              IDValue: "LAOR",
              IDTypeName: "Distributor_kortnamn",
              SupplierIDType: "01",
            },
            { IDValue: "7365565626007", SupplierIDType: "06" },
          ],
        },
        ProductAvailability: "43",
      },
    ],
  },
  RecordReference: "9781846801815",
  CollateralDetail: {
    SupportingResource: {
      ResourceMode: "03",
      ContentAudience: "00",
      ResourceVersion: {
        ResourceForm: "02",
        ResourceLink: "http://bilder.fsys.se/9781846801815.jpg",
      },
      ResourceContentType: "01",
    },
  },
  NotificationType: "02",
  PublishingDetail: {
    Publisher: { PublisherName: "Rising stars uk ltd", PublishingRole: "04" },
    PublishingDate: { Date: "19000101", PublishingDateRole: "23" },
  },
  DescriptiveDetail: {
    Extent: { ExtentType: "00", ExtentUnit: "03", ExtentValue: "48" },
    Measure: [
      { MeasureType: "02", Measurement: "300", MeasureUnitCode: "mm" },
      { MeasureType: "01", Measurement: "216", MeasureUnitCode: "mm" },
      { MeasureType: "08", Measurement: "132", MeasureUnitCode: "gr" },
    ],
    Subject: [
      {
        SubjectCode: "61",
        SubjectHeadingText: "Skönlitteratur barn och ungdom",
        SubjectSchemeIdentifier: "47",
      },
      { MainSubject: "", SubjectCode: "YFB", SubjectSchemeIdentifier: "93" },
    ],
    Language: { LanguageCode: "eng", LanguageRole: "01" },
    Contributor: [
      {
        KeyNames: "Blum",
        NamesBeforeKey: "Paul",
        SequenceNumber: "1",
        ContributorRole: "A01",
        PersonNameInverted: "Blum, Paul",
      },
    ],
    ProductForm: "BC",
    TitleDetail: [
      {
        TitleType: "01",
        TitleElement: {
          TitleText: "Extraordinary files: alien implants",
          TitleElementLevel: "01",
        },
      },
      {
        TitleType: "10",
        TitleElement: {
          TitleText: "Extraordinary files: alien implants",
          TitleElementLevel: "01",
        },
      },
    ],
    ProductFormDetail: "B113",
    ProductComposition: "00",
  },
  ProductIdentifier: { IDValue: "9781846801815", ProductIDType: "03" },
};

const product4 = {
  ProductSupply: {
    SupplyDetail: [
      {
        Price: [
          {
            Tax: {
              TaxType: "01",
              TaxRatePercent: "6",
            },
            PriceType: "05",
            PriceAmount: "99.00",
          },
        ],
        Stock: {
          OnHand: "-1",
        },
        Supplier: {
          SupplierName: "Hegas Förlag",
          SupplierRole: "02",
          SupplierIdentifier: [
            {
              IDValue: "3325",
              IDTypeName: "BR-ID",
              SupplierIDType: "01",
            },
            {
              IDValue: "HEGA",
              IDTypeName: "Distributor_kortnamn",
              SupplierIDType: "01",
            },
          ],
        },
        ProductAvailability: "01",
      },
    ],
  },
  RecordReference: "9780237541767",
  CollateralDetail: {
    TextContent: [
      {
        Text: "Dracula was written by Bram (Abraham) Stoker in 1897 and it was so popular that a paperback was published just three years later. This chilling tale, which is told through the diaries and letters of the main character, is the story of Count Dracula, a vampire who comes to England from Transylvania to feed on new blood and to widen his verincreasing circle of vampires!<br><br> Essential Classics (from Evans publishing) are a quick way into a range of exciting stories. These stories are shortened versions of the classic novels, which lose none of the strength and flavour of the original. Eaxh title has a detailed glossary and test yourself questions at the back of the back.<br><br> Kommer även på svenska våren 2011.<br> Ges ut i Sverige genom lättläst-förlaget Hegas. Läs mer på www.hegas.se",
        TextType: "03",
        ContentAudience: "00",
      },
      {
        Text: "Dracula is a haunting tale, and is told through diaries and letters. It is the story of Count Dracula, a vampire who comes to England to feed on new blood and to widen his circle of vampires.<br> Retold classic in a shortened version. Each title has a detailed glossery, and test yourself questions at the back of the book.<br><br> Kommer även ut på svenska våren 2011.<br> Ges ut i Sverige genom lättläst-förlaget Hegas. Läs mer på www.hegas.se",
        TextType: "02",
        ContentAudience: "00",
      },
    ],
    SupportingResource: {
      ResourceMode: "03",
      ContentAudience: "00",
      ResourceVersion: {
        ResourceForm: "02",
        ResourceLink: "http://www.smartstep.se/shopimages/404363/c.jpg",
      },
      ResourceContentType: "01",
    },
  },
  NotificationType: "02",
  PublishingDetail: {
    Publisher: {
      PublisherName: "Evans Publishing",
      PublishingRole: "01",
      PublisherIdentifier: [
        {
          IDValue: "3325",
          IDTypeName: "BR-ID",
          PublisherIDType: "01",
        },
        {
          IDValue: "HEGA",
          IDTypeName: "Forlag_kortnamn",
          PublisherIDType: "01",
        },
      ],
    },
    PublishingDate: {
      Date: "19000101",
      PublishingDateRole: "23",
    },
  },
  DescriptiveDetail: {
    Extent: {
      ExtentType: "00",
      ExtentUnit: "03",
      ExtentValue: "50",
    },
    Measure: [
      {
        MeasureType: "02",
        Measurement: "150",
        MeasureUnitCode: "mm",
      },
      {
        MeasureType: "01",
        Measurement: "210",
        MeasureUnitCode: "mm",
      },
    ],
    Subject: [
      {
        SubjectCode: "61",
        SubjectHeadingText: "Skönlitteratur barn och ungdom",
        SubjectSchemeIdentifier: "47",
      },
      {
        SubjectCode: "5AR",
        SubjectSchemeIdentifier: "98",
      },
    ],
    Language: {
      LanguageCode: "eng",
      LanguageRole: "01",
    },
    Collection: {
      TitleDetail: [
        {
          TitleType: "01",
          TitleElement: {
            TitleText: "Lättläst på engelska",
            TitleElementLevel: "02",
          },
        },
      ],
      CollectionType: "10",
    },
    Contributor: [
      {
        KeyNames: "Francis",
        NamesBeforeKey: "Pauline",
        SequenceNumber: "1",
        ContributorRole: "A01",
        PersonNameInverted: "Francis, Pauline",
      },
    ],
    Illustrated: "02",
    ProductForm: "BC",
    TitleDetail: [
      {
        TitleType: "01",
        TitleElement: {
          TitleText: "Dracula",
          TitleElementLevel: "01",
        },
      },
      {
        TitleType: "10",
        TitleElement: {
          TitleText: "Dracula",
          TitleElementLevel: "01",
        },
      },
    ],
    AudienceRange: {
      AudienceRangeValue: "12",
      AudienceRangePrecision: "03",
      AudienceRangeQualifier: "17",
    },
    ProductFormDetail: "B310",
    ProductComposition: "00",
  },
  ProductIdentifier: {
    IDValue: "9780237541767",
    ProductIDType: "03",
  },
};

const getSupplierInfo = (product, priceRate) => {
  const availStatus = [20, "20", 21, "21"];
  const activeSuppliers = [
    { IDTypeName: "FSYS", IDValue: 104 },
    { IDTypeName: "FSGR", IDValue: 3028 },
    { IDTypeName: "SAMD", IDValue: 102 },
    { IDTypeName: "FSBI", IDValue: 3279 },
    { IDTypeName: "ELIB", IDValue: 4849 },
    { IDTypeName: "STUD", IDValue: 1498 },
    { IDTypeName: "PUBT", IDValue: 4105 },
    { IDTypeName: "SDIST", IDValue: 1581 },
    { IDTypeName: "GLUT", IDValue: 2024 },
  ];
  const activeSuppliersCodes = _.map(activeSuppliers, (as) => as.IDTypeName);

  const productSuppliers = product.ProductSupply;
  let supplier = null;
  if (Array.isArray(productSuppliers)) {
    console.log("Product suppliers array: ", productSuppliers);
    _.forEach(productSuppliers, (ps) => {
      const supplierCode = _.find(
        ps.Supplier.SupplierIdentifier,
        (si) => si.IDTypeName === "Distributor_kortnamn"
      );
      if (!supplier && activeSuppliersCodes.includes(supplierCode.IDValue)) {
        supplier = ps;
        supplier.supplierCodeValue = supplierCode.IDValue;
      }
    });
  } else if (Array.isArray(productSuppliers.SupplyDetail)) {
    console.log(
      "Product suppliers supplyDetail: ",
      productSuppliers.SupplyDetail
    );
    _.forEach(productSuppliers.SupplyDetail, (sd) => {
      const supplierCode = _.find(
        sd.Supplier.SupplierIdentifier,
        (si) => si.IDTypeName === "Distributor_kortnamn"
      );
      if (!supplier && activeSuppliersCodes.includes(supplierCode.IDValue)) {
        supplier = sd;
        supplier.supplierCodeValue = supplierCode.IDValue;
      } else if (
        supplier &&
        sd.Price &&
        sd.Price.PriceAmount &&
        activeSuppliersCodes.includes(supplierCode.IDValue)
      ) {
        supplier = sd;
        supplier.supplierCodeValue = supplierCode.IDValue;
      }
    });
  } else {
    supplier = productSuppliers.SupplyDetail;
    if (
      Array.isArray(productSuppliers.SupplyDetail.Supplier.SupplierIdentifier)
    ) {
      console.log(
        "Product suppliers supplier identifier: ",
        productSuppliers.SupplyDetail.Supplier.SupplierIdentifier
      );
      const supplierCode = _.find(
        productSuppliers.SupplyDetail.Supplier.SupplierIdentifier,
        (si) => si.IDTypeName === "Distributor_kortnamn"
      );
      supplier.supplierCodeValue = supplierCode ? supplierCode.IDValue : null;
    } else {
      console.log(
        "else: ",
        productSuppliers.SupplyDetail.Supplier.SupplierIdentifier
      );
      supplier.supplierCodeValue =
        productSuppliers.SupplyDetail.Supplier.SupplierIdentifier.IDValue;
    }
  }

  if (!supplier || !supplier.supplierCodeValue) {
    throw new Error("Supplier not found");
  }

  const price = _.isArray(supplier.Price)
    ? _.find(
        supplier.Price,
        (sp) => sp.PriceAmount && sp.Tax && sp.Tax.TaxRatePercent
      )
    : supplier.Price;

  const priceAmountChecker = price && price.PriceAmount ? price.PriceAmount : 0;
  const amountWithoutVAT = isNaN(priceAmountChecker)
    ? 0
    : Math.ceil(parseFloat(priceAmountChecker));
  let taxAmount;
  if (price && price.Tax && price.Tax.TaxRatePercent) {
    taxAmount = parseInt(price.Tax.TaxRatePercent, 10);
  } else {
    taxAmount = 0;
  }
  console.log("taxAmount: ", taxAmount);
  const amountWithMarkup = Math.ceil(
    amountWithoutVAT + (amountWithoutVAT * priceRate) / 100
  );
  const priceWithVAT = _.round(
    amountWithMarkup + (amountWithMarkup * taxAmount) / 100
  );
  console.log("Supplier content ", supplier);
  let priceIsSet = (price && price.PriceType) || (price && price.Tax);

  return {
    supplySupplier: supplier.supplierCodeValue,
    supplySupplierId: _.get(
      _.find(
        activeSuppliers,
        (as) => as.IDTypeName === supplier.supplierCodeValue
      ),
      "IDValue"
    ),
    supplyAvailability:
      activeSuppliersCodes.includes(supplier.supplierCodeValue) &&
      supplier.Price &&
      supplier.Price.PriceAmount
        ? getAvailability(supplier.ProductAvailability)
        : "Out of stock",
    supplyStatus: activeSuppliersCodes.includes(supplier.supplierCodeValue)
      ? getStatus(
          availStatus.includes(supplier.ProductAvailability) ||
            (supplier.Stock && supplier.Stock.OnHand !== "0")
            ? "04"
            : "06"
        )
      : "Active",
    priceAmount: priceWithVAT,
    priceDiscount: 0,
    priceWithDiscount: priceWithVAT,
    priceType: priceIsSet ? getPriceType(price.PriceType) : null,
    taxAmount: priceIsSet
      ? (price.Tax && parseInt(price.Tax.TaxRatePercent, 10)) || 6
      : 0,
    taxType: priceIsSet
      ? (price.Tax && getTaxType(price.Tax.TaxType)) || "VAT"
      : null,
    onHand:
      supplier.Stock && supplier.Stock.OnHand
        ? parseInt(supplier.Stock.OnHand || 0, 10)
        : 0,
    active:
      supplier.Stock && supplier.Stock.OnHand
        ? parseInt(supplier.Stock.OnHand || 0, 10) > 1
        : 0,
    gardnersPrice: amountWithoutVAT,
  };
};

// const jsonType = xmltojson.toJson(xmlTest, options);
// console.log(jsonType);

// const parsedFile = async () => {
//   fs.readFile(file3, function (err, data) {
//     const jsonType = xmltojson.toJson(data);
//     fs.writeFile(
//       `xml2json/new-3-files/output/${uuid.v4()}21-10-artupd1_20211020.xml_onix.json`,
//       jsonType,
//       (err, res) => {
//         if (err) console.log(err);
//         console.log("ok");
//       }
//     );
//   });
// };

const result = getSupplierInfo(product4, 12);

const book = {
  editionNumber: _.get(product, "DescriptiveDetail.EditionNumber"),
  pages: _.get(product, "DescriptiveDetail.Extent.ExtentValue", null),
  bokbasenId: product.RecordReference,
};

Object.assign(book, result);

// if (typeof book.PriceAmount) {
//   console.log("number");
// } else console.log("NaN");
// parsedFile();

console.log("This is the result of the getsupplyInfo", book);
