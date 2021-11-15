const _ = require("lodash");
const xmltojson = require("xml2json");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

const {
  getTaxType,
  getStatus,
  getAvailability,
  getPriceType,
} = require("./external");

const getInfo = (product, priceRate) => {
  const availStatus = [20, "20", 21, "21"];
  const activeSuppliers = [
    "FSYS",
    "FSGR",
    "SAMD",
    "FSBI",
    "ELIB",
    "STUD",
    "PUBT",
    "SDIST",
    "GLUT",
  ];
  const productSuppliers = product.ProductSupply;
  let supplier = null;
  if (Array.isArray(productSuppliers)) {
    console.log("Product suppliers array: ", productSuppliers);
    _.forEach(productSuppliers, (ps) => {
      const supplierCode = _.find(
        ps.Supplier.SupplierIdentifier,
        (si) => si.IDTypeName === "Distributor_kortnamn"
      );
      if (!supplier && activeSuppliers.includes(supplierCode.IDValue)) {
        supplier = ps;
        supplier.supplierCodeValue = supplierCode.IDValue;
      }
    });
    if (!supplier) {
      const firstSupplier = _.first(productSuppliers);
      const firstSupplierCode =
        firstSupplier &&
        _.find(
          firstSupplier.Supplier.SupplierIdentifier,
          (si) => si.IDTypeName === "Distributor_kortnamn"
        );
      if (firstSupplier && firstSupplierCode && firstSupplierCode.IDValue) {
        supplier = firstSupplier;
        supplier.supplierCodeValue = firstSupplierCode.IDValue;
      }
    }
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
      if (!supplier && activeSuppliers.includes(supplierCode.IDValue)) {
        supplier = sd;
        supplier.supplierCodeValue = supplierCode.IDValue;
      } else if (
        supplier &&
        sd.Price &&
        sd.Price.PriceAmount &&
        activeSuppliers.includes(supplierCode.IDValue)
      ) {
        supplier = sd;
        supplier.supplierCodeValue = supplierCode.IDValue;
      }
    });
    if (!supplier) {
      const firstSupplier = _.first(productSuppliers.SupplyDetail);
      const firstSupplierCode =
        firstSupplier &&
        _.find(
          firstSupplier.Supplier.SupplierIdentifier,
          (si) => si.IDTypeName === "Distributor_kortnamn"
        );
      if (firstSupplier && firstSupplierCode && firstSupplierCode.IDValue) {
        supplier = firstSupplier;
        supplier.supplierCodeValue = firstSupplierCode.IDValue;
      }
    }
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
    supplyAvailability:
      activeSuppliers.includes(supplier.supplierCodeValue) &&
      supplier.Price &&
      supplier.Price.PriceAmount
        ? getAvailability(supplier.ProductAvailability)
        : "Out of stock",
    supplyStatus: activeSuppliers.includes(supplier.supplierCodeValue)
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

const unpricdB = {
  ProductSupply: {
    SupplyDetail: [
      {
        Price: [{ UnpricedItemType: "01" }],
        Stock: { OnHand: "0" },
        Supplier: {
          SupplierName: "Serholt läromedel",
          SupplierRole: "02",
          SupplierIdentifier: [
            { IDValue: "5441", IDTypeName: "BR-ID", SupplierIDType: "01" },
            {
              IDValue: "SEHO",
              IDTypeName: "Distributor_kortnamn",
              SupplierIDType: "01",
            },
          ],
        },
        ProductAvailability: "40",
      },
    ],
  },
  RecordReference: "9789179430931",
  CollateralDetail: {
    TextContent: [
      {
        Text: "Här är åtta häften som vart och ett innehåller ett dråpligt äventyr anpassat för nybörjarläsaren. Texten har korta meningar och ord med ytterst få konsonantförbindelser och saknar ljudstridigt tecknade ord. (Serie A)Pirathistorier består av åtta titlar:• Tre pirater i oväder• Tre pirater på hal is• Tre pirater i fara• Tre pirater på fel båt• Tre pirater kapar en båt• Tre pirater åker i havet• Tre pirater och en mina• Tre pirater i döda havet",
        TextType: "02",
        ContentAudience: "00",
      },
    ],
    SupportingResource: {
      ResourceMode: "03",
      ContentAudience: "00",
      ResourceVersion: {
        ResourceForm: "02",
        ResourceLink:
          "http://www.serholt.com/media/content/Svenska/7943_093_1_Pirater_kaparenbat_omslag.jpg",
      },
      ResourceContentType: "01",
    },
  },
  NotificationType: "02",
  PublishingDetail: {
    Publisher: {
      PublisherName: "Serholt Läromedel AB",
      PublishingRole: "01",
      PublisherIdentifier: [
        { IDValue: "5441", IDTypeName: "BR-ID", PublisherIDType: "01" },
        {
          IDValue: "SEHO",
          IDTypeName: "Forlag_kortnamn",
          PublisherIDType: "01",
        },
      ],
    },
    PublishingDate: { Date: "19000101", PublishingDateRole: "23" },
  },
  DescriptiveDetail: {
    Extent: { ExtentType: "00", ExtentUnit: "03", ExtentValue: "12" },
    Measure: [
      { MeasureType: "02", Measurement: "149", MeasureUnitCode: "mm" },
      { MeasureType: "01", Measurement: "210", MeasureUnitCode: "mm" },
      { MeasureType: "08", Measurement: "290", MeasureUnitCode: "gr" },
    ],
    Subject: [
      {
        SubjectCode: "61",
        SubjectHeadingText: "Skönlitteratur barn och ungdom",
        SubjectSchemeIdentifier: "47",
      },
      { SubjectCode: "FTR", SubjectSchemeIdentifier: "49" },
      { MainSubject: "", SubjectCode: "YF", SubjectSchemeIdentifier: "93" },
      { SubjectCode: "SV", SubjectSchemeIdentifier: "A9" },
    ],
    Language: { LanguageCode: "swe", LanguageRole: "01" },
    Contributor: [
      {
        KeyNames: "Bodil Jönsson",
        SequenceNumber: "1",
        ContributorRole: "A01",
        PersonNameInverted: "Bodil Jönsson,",
      },
      {
        KeyNames: "Oskar Jonsson",
        SequenceNumber: "2",
        ContributorRole: "A12",
        PersonNameInverted: "Oskar Jonsson,",
      },
    ],
    Illustrated: "02",
    ProductForm: "BC",
    TitleDetail: [
      {
        TitleType: "01",
        TitleElement: { TitleText: "Pirathistorier", TitleElementLevel: "01" },
      },
      {
        TitleType: "10",
        TitleElement: {
          TitleText: "Pirathistorier A UTGÅTT ERSÄTTS AV 11-779",
          TitleElementLevel: "01",
        },
      },
    ],
    AudienceRange: {
      AudienceRangeValue: "6",
      AudienceRangePrecision: "03",
      AudienceRangeQualifier: "17",
    },
    ProductFormDetail: "B310",
    ProductComposition: "00",
  },
  ProductIdentifier: { IDValue: "9789179430931", ProductIDType: "15" },
};

const productrWithPriceZero = {
  RecordReference: "9789179130060",
  NotificationType: "03",
  ProductIdentifier: {
    ProductIDType: "03",
    IDValue: "9789179130060",
  },
  DescriptiveDetail: {
    ProductComposition: "00",
    ProductForm: "BC",
    ProductFormDetail: "B113",
    Measure: [
      {
        MeasureType: "02",
        Measurement: "110",
        MeasureUnitCode: "mm",
      },
      {
        MeasureType: "01",
        Measurement: "178",
        MeasureUnitCode: "mm",
      },
      {
        MeasureType: "03",
        Measurement: "31",
        MeasureUnitCode: "mm",
      },
      {
        MeasureType: "08",
        Measurement: "267",
        MeasureUnitCode: "gr",
      },
    ],
    TitleDetail: [
      {
        TitleType: "01",
        TitleElement: {
          TitleElementLevel: "01",
          TitleText: "Min historia",
        },
      },
      {
        TitleType: "10",
        TitleElement: {
          TitleElementLevel: "01",
          TitleText: "Obama/Min historia",
        },
      },
      {
        TitleType: "03",
        TitleElement: {
          TitleElementLevel: "01",
          TitleText: "Becoming",
        },
      },
    ],
    Contributor: [
      {
        SequenceNumber: "1",
        ContributorRole: "A01",
        PersonNameInverted: "Obama, Michelle",
        NamesBeforeKey: "Michelle",
        KeyNames: "Obama",
      },
      {
        SequenceNumber: "2",
        ContributorRole: "B06",
        PersonNameInverted: "Svensson, Manne",
        NamesBeforeKey: "Manne",
        KeyNames: "Svensson",
      },
      {
        SequenceNumber: "3",
        ContributorRole: "A11",
        PersonNameInverted: "Sporrong, Sanna",
        NamesBeforeKey: "Sanna",
        KeyNames: "Sporrong",
        Website: {
          WebsiteRole: "06",
          WebsiteLink: "http://www.sannasporrongform.se",
        },
      },
    ],
    Language: {
      LanguageRole: "01",
      LanguageCode: "swe",
    },
    Extent: {
      ExtentType: "00",
      ExtentValue: "453",
      ExtentUnit: "03",
    },
    Illustrated: "01",
    Subject: [
      {
        SubjectSchemeIdentifier: "47",
        SubjectCode: "13",
        SubjectHeadingText: "Memoarer och biografier",
      },
      {
        SubjectSchemeIdentifier: "48",
        SubjectCode: "Lz Obama, Michelle",
      },
      {
        MainSubject: "",
        SubjectSchemeIdentifier: "93",
        SubjectCode: "DNBA",
      },
      {
        SubjectSchemeIdentifier: "94",
        SubjectCode: "1KBB",
      },
      {
        SubjectSchemeIdentifier: "20",
        SubjectHeadingText:
          "feminism;USA;2010-talet;politik;Washington;Vita huset",
      },
    ],
    NameAsSubject: {
      PersonNameInverted: "Obama, Michelle",
    },
  },
  CollateralDetail: {
    TextContent: [
      {
        TextType: "03",
        ContentAudience: "00",
        Text: "<p>Michelle Obama är en av vår tids mest ikoniska och beundrade kvinnor. Som den första afroamerikanska presidentfrun skapade hon det mest öppna och inkluderande presidentskapet i USA:s historia. Hon är en passionerad och kraftfull förespråkare för kvinnor och flickors rättigheter världen över och har förändrat hur föräldrar och barn ser på hälsa och vikten av ett aktivt liv. Samtidigt har hon uppfostrat två döttrar och stått sida vid sida med sin man i hans uppdrag att leda USA genom några av landets mest påfrestande perioder.</p><p></p><p>I sina självutlämnande och fängslande memoarer bjuder Michelle Obama in läsare till sin värld och berättar om de erfarenheter som har format henne som person. Från barndomen i Chicagos South Side genom åren som företagsledaren som kämpade med livspusslet, till tiden på världens kändaste adress. På ett ärligt och insiktsfullt sätt beskriver hon sina med- och motgångar - i det privata och offentliga - och berättar om sitt liv såsom hon har levt det, med sina egna ord och på sina egna villkor. Det är en ovanligt personlig skildring av en kvinna som ständigt trotsat samhällets förväntningar, och vars historia inspirerar oss att göra detsamma.</p>",
      },
      {
        TextType: "02",
        ContentAudience: "00",
        Text: "<p>Michelle Obama är en av vår tids mest ikoniska och beundrade kvinnor. Som den första afroamerikanska presidentfrun skapade hon det mest öppna och inkluderande presidentskapet i USA:s historia. Hon är en passionerad och kraftfull förespråkare för kvinnor och flickors rättigheter världen över och har förändrat hur föräldrar och barn ser på hälsa och vikten av ett aktivt liv. Samtidigt har hon uppfostrat två döttrar och stått sida vid sida med sin man i hans uppdrag att leda USA genom några av landets mest påfrestande perioder.</p><p></p><p>I sina självutlämnande och fängslande memoarer bjuder Michelle Obama in läsare till sin värld och berättar om de erfarenheter som har format henne som person. Från barndomen i Chicagos South Side genom åren som företagsledaren som kämpade med livspusslet, till tiden på världens kändaste adress. På ett ärligt och insiktsfullt sätt beskriver hon sina med- och motgångar - i det privata och offentliga - och berättar om sitt liv såsom hon har levt det, med sina egna ord och på sina egna villkor. Det är en ovanligt personlig skildring av en kvinna som ständigt trotsat samhällets förväntningar, och vars historia inspirerar oss att göra detsamma.</p>",
      },
    ],
    SupportingResource: {
      ResourceContentType: "01",
      ContentAudience: "00",
      ResourceMode: "03",
      ResourceVersion: {
        ResourceForm: "02",
        ResourceLink:
          "https://media.bonnierforlagen.se/bokbilder3d/tif/9789179130060.jpg?timestamp=20190326153112",
      },
    },
  },
  PublishingDetail: {
    Publisher: {
      PublishingRole: "01",
      PublisherIdentifier: [
        {
          PublisherIDType: "01",
          IDTypeName: "BR-ID",
          IDValue: "1013",
        },
        {
          PublisherIDType: "01",
          IDTypeName: "Forlag_kortnamn",
          IDValue: "MÅPO",
        },
      ],
      PublisherName: "Månpocket",
    },
    PublishingDate: {
      PublishingDateRole: "23",
      Date: "20190910",
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
              IDValue: "102",
            },
            {
              SupplierIDType: "01",
              IDTypeName: "Distributor_kortnamn",
              IDValue: "SAMD",
            },
            {
              SupplierIDType: "06",
              IDValue: "7350022540002",
            },
          ],
          SupplierName: "Bonnierförlagen",
        },
        ProductAvailability: "21",
        Stock: {
          OnHand: "999",
        },
        Price: {
          PriceType: "05",
          PriceCoded: {
            PriceCodeType: "01",
            PriceCode: "K",
          },
        },
      },
    ],
  },
};

// const result = getInfo(productrWithPriceZero, 15);

// const book = {
//   editionNumber: _.get(product, "DescriptiveDetail.EditionNumber"),
//   pages: _.get(product, "DescriptiveDetail.Extent.ExtentValue", null),
//   bokbasenId: product.RecordReference,
// };

// Object.assign(book, result);

// console.log(book);

// const genres = [
//   {
//     id: 2767,
//     en: "Children’s: picture books, activity books, early learning concepts",
//     no: "Bøker for barn (0 til 6 år)",
//     sv: "Bilderböcker, pysselböcker och pedagogiska böcker 0–5 år",
//     code: "YB",
//     bicCode: "YB",
//     ParentGenreId: 2766,
//     genreSlug: "boker-for-barn-0-til-6-ar",
//     createdAt: null,
//     updatedAt: "2021-09-15T10:39:41.952Z",
//     ConsolidatedBookGenre: {
//       comment: "migrated to THEMA",
//       oldGenreId: null,
//       createdAt: "2020-10-05T12:40:15.399Z",
//       updatedAt: "2020-10-05T12:40:15.399Z",
//       ConsolidatedBookI: 643193,
//       GenreId: 2767,
//     },
//     ParentGenre: {
//       id: 2766,
//       en: "Children’s, Teenage and Educational",
//       no: "Barnebøker, ungdomsbøker og læremidler",
//       sv: "Barnböcker, ungdomsböcker och läromedel",
//       code: "Y",
//       bicCode: "Y",
//       ParentGenreId: null,
//       genreSlug: "barneboker-ungdomsboker-og-laeremidler",
//       createdAt: null,
//       updatedAt: "2021-09-15T10:39:42.329Z",
//     },
//   },
//   {
//     id: 3043,
//     en: "Educational: Construction, building and related skills",
//     no: "Læremidler: bygg- og anleggsteknikk",
//     sv: "Läromedel: byggteknik",
//     code: "YPWD",
//     bicCode: null,
//     ParentGenreId: 3034,
//     genreSlug: "laeremidler-bygg-og-anleggsteknikk",
//     createdAt: null,
//     updatedAt: "2021-09-15T10:39:41.984Z",
//     ConsolidatedBookGenre: {
//       comment: "migrated to THEMA",
//       oldGenreId: null,
//       createdAt: "2021-01-12T01:34:28.835Z",
//       updatedAt: "2021-01-12T01:34:28.835Z",
//       ConsolidatedBookI: 25598,
//       GenreId: 3043,
//     },
//     ParentGenre: {
//       id: 3034,
//       en: "Educational: Vocational and other subjects",
//       no: "Læremidler: yrkesfag og andre fag",
//       sv: "Läromedel: yrkesutbildning och övriga ämnen",
//       code: "YPW",
//       bicCode: null,
//       ParentGenreId: 2966,
//       genreSlug: "laeremidler-yrkesfag-og-andre-fag",
//       createdAt: null,
//       updatedAt: "2021-09-15T10:39:42.391Z",
//     },
//   },
// ];

// const findNestedGenre = (mainGenre) => {
//   const genresId = [mainGenre.id];
//   const genresObjects = [mainGenre];

//   let parentGenre = mainGenre.ParentGenre;
//   // eslint-disable-next-line no-prototype-builtins
//   while (parentGenre && parentGenre.id) {
//     genresId.push(parentGenre.id);
//     genresObjects.push(parentGenre);

//     parentGenre = parentGenre.ParentGenre;
//   }
//   return {
//     genresId,
//     genresObjects,
//   };
// };

// let ress = []

// if (genres && genres.length > 0) {
//   genres.forEach((g) => {
//     const result = findNestedGenre(g);
//     ress = [...ress, ...result.genresObjects]
//   });
// }


// console.log(ress);


