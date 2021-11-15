const getAvailability = (code, supplyCode, unpricedCode) => {
    if (
      !code ||
      supplyCode === '02' ||
      supplyCode === '06' ||
      supplyCode === '07' ||
      supplyCode === 2 ||
      supplyCode === 6 ||
      supplyCode === 7 ||
      unpricedCode === '02' ||
      unpricedCode === '01' ||
      unpricedCode === 2 ||
      unpricedCode === 1
    ) {
      return 'Not available'
    }
  
    switch (code) {
      case '01':
      case 1:
        return 'Cancelled'
      case '10':
      case '12':
      case 10:
      case 12:
        return 'Not yet available'
      case '11':
      case 11:
        return 'Awaiting stock'
      case '20':
      case 20:
        return 'Available'
      case '21':
      case 21:
        return 'In stock'
      case '22':
      case 22:
        return 'To order'
      case '23':
      case 23:
        return 'POD'
      case '30':
      case 30:
        return 'Temporarily unavailable'
      case '31':
      case 31:
        return 'Out of stock'
      case '32':
      case 32:
        return 'Reprinting'
      case '33':
      case 33:
        return 'Awaiting reissue'
      case '34':
      case 34:
        return 'Temporarily withdrawn from sale'
      case '40':
      case 40:
        return 'Not available (reason unspecified)'
      case '41':
      case 41:
        return 'Not available, replaced by new product'
      case '42':
      case 42:
        return 'Not available, other format available'
      case '43':
      case 43:
        return 'No longer supplied by us'
      case '44':
      case 44:
        return 'Apply direct'
      case '45':
      case 45:
        return 'Not sold separately'
      case '46':
      case 46:
        return 'Withdrawn from sale'
      case '47':
      case 47:
        return 'Remaindered'
      case '48':
      case 48:
        return 'Not available, replaced by POD'
      case '49':
      case 49:
        return 'Recalled'
      case '50':
      case 50:
        return 'Not sold as set'
      case '51':
      case 51:
        return 'Not available, publisher indicates OP'
      case '52':
      case 52:
        return 'Not available, publisher no longer sells product in this market'
      case '97':
      case 97:
        return 'No recent update received'
      case '98':
      case 98:
        return 'No longer receiving updates'
      case '99':
      case 99:
        return 'Contact supplier'
      default:
        return code
    }
  }

  const getStatus = code => {
    switch (code.toString()) {
      case '00':
      case 0:
        return 'Unspecified'
      case '01':
      case 1:
        return 'Cancelled'
      case '02':
      case 2:
        return 'Forthcoming'
      case '03':
      case 3:
        return 'Postponed indefinitely'
      case '04':
      case 4:
        return 'Active'
      case '05':
      case 5:
        return 'No longer our product'
      case '06':
      case 6:
        return 'Out of stock indefinitely'
      case '07':
      case 7:
        return 'Out of print'
      case '08':
      case 8:
        return 'Inactive'
      case '09':
      case 9:
        return 'Unknown'
      case '10':
      case 10:
        return 'Remaindered'
      case '11':
      case 11:
        return 'Withdrawn from sale'
      case '12':
      case 12:
        return 'Not available in this market'
      case '13':
      case 13:
        return 'Active, but not sold separately'
      case '14':
      case 14:
        return 'Active, with market restrictions'
      case '15':
      case 15:
        return 'Recalled'
      case '16':
      case 16:
        return 'Temporarily withdrawn from sale'
      default:
        return code
    }
  }

  const getPriceType = code => {
    switch (code) {
      case '01':
      case 1:
        return 'RRP excluding tax'
      case '02':
      case 2:
        return 'RRP including tax'
      case '03':
      case 3:
        return 'Fixed retail price excluding tax'
      case '04':
      case 4:
        return 'Fixed retail price including tax'
      case '05':
      case 5:
        return 'Supplier’s net price excluding tax'
      case '06':
      case 6:
        return 'Supplier’s net price excluding tax: rental goods'
      case '07':
      case 7:
        return 'Supplier’s net price including tax'
      case '08':
      case 8:
        return 'Supplier’s alternative net price excluding tax'
      case '09':
      case 9:
        return 'Supplier’s alternative net price including tax'
      case '11':
      case 11:
        return 'Special sale RRP excluding tax'
      case '12':
      case 12:
        return 'Special sale RRP including tax'
      case '13':
      case 13:
        return 'Special sale fixed retail price excluding tax'
      case '14':
      case 14:
        return 'Special sale fixed retail price including tax'
      case '15':
      case 15:
        return 'Supplier’s net price for special sale excluding tax'
      case '17':
      case 17:
        return 'Supplier’s net price for special sale including tax'
      case '21':
      case 21:
        return 'Pre-publication RRP excluding tax'
      case '22':
      case 22:
        return 'Pre-publication RRP including tax'
      case '23':
      case 23:
        return 'Pre-publication fixed retail price excluding tax'
      case '24':
      case 24:
        return 'Pre-publication fixed retail price including tax'
      case '25':
      case 25:
        return 'Supplier’s pre-publication net price excluding tax'
      case '27':
      case 27:
        return 'Supplier’s pre-publication net price including tax'
      case '31':
      case 31:
        return 'Freight-pass-through RRP excluding tax'
      case '32':
      case 32:
        return 'Freight-pass-through billing price excluding tax'
      case '33':
      case 33:
        return 'Importer’s Fixed retail price excluding tax'
      case '34':
      case 34:
        return 'Importer’s Fixed retail price including tax'
      case '41':
      case 41:
        return 'Publishers retail price excluding tax'
      case '42':
      case 42:
        return 'Publishers retail price including tax'
      default:
        return code
    }
  }

  const getTaxType = code => {
    switch (code) {
      case '01':
      case 1:
        return 'VAT'
      case '02':
      case 2:
        return 'GST'
      default:
        return code
    }
  }

  module.exports = {
      getAvailability,
      getStatus,
      getPriceType,
      getTaxType
  }