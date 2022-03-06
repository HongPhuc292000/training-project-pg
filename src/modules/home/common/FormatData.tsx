import { IPayroll } from "../models/productModal";

export const checkStatus = (status: IPayroll)=>{
    if(status.received){
      return 'Receive';
    }else if(status.matched || status.approved){
      return 'Processing';
    }else if(status.fulfilled){
      return 'Fulfill';
    }else if(status.canceled){
      return 'Cancel';
    }else{
      return 'Pending';
    }
}

export const formatMonth = (monthNumber:string)=>{
    switch (monthNumber){
      case '01':
        return 'Jan';
      case '02':
        return 'Feb';
      case '03':
        return 'Mar';
      case '04':
        return 'Apr';
      case '05':
        return 'May'
      case '06':
        return 'Jun'
      case '07':
        return 'Jul'
      case '08':
        return 'Aug'
      case '09':
        return 'Sep'
      case '10':
        return 'Oct'
      case '11':
        return 'Nov'
      default:
        return 'Dec'
    }
}

export const formatDate = (dateReceive:string)=>{
    const dateFormated = `${dateReceive.slice(8,10)} ${formatMonth(dateReceive.slice(5,7))} ${dateReceive.slice(0,4)}`
    return dateFormated;
}

export const formatCurrency = (currency: number)=>{
    const stringType = currency.toString();
    const currencyIndex = stringType.indexOf('.');
    const currencyInt =  (currencyIndex >= 0 ? stringType.slice(0,currencyIndex) : stringType);
    let currencyFormated = '';
    const currencyDiv = currencyInt.length;
    if(currencyIndex >= 0){
      switch(currencyDiv){
        case 4:
          currencyFormated = currencyInt[0] + ',' + currencyInt.slice(1,4) + stringType.slice(currencyIndex, stringType.length);
          break;
        case 5:
          currencyFormated = currencyInt.slice(0,2) + ',' + currencyInt.slice(2,5) + stringType.slice(currencyIndex, stringType.length);
          break;
        case 6:
          currencyFormated = currencyInt.slice(0,3) + ',' + currencyInt.slice(3,6) + stringType.slice(currencyIndex, stringType.length);
          break;
        default:
          currencyFormated = currencyInt + stringType.slice(currencyIndex, stringType.length);
          break;
      }
    }else{
      switch(currencyDiv){
        case 4:
          currencyFormated = currencyInt[0] + ',' + currencyInt.slice(1,4) + '.00';
          break;
        case 5:
          currencyFormated = currencyInt.slice(0,2) + ',' + currencyInt.slice(2,5) + '.00';
          break;
        case 6:
          currencyFormated = currencyInt.slice(0,3) + ',' + currencyInt.slice(3,6) + '.00';
          break;
        default:
          currencyFormated = currencyInt + '.00';
          break;
      }
    }
    return currencyFormated;
}