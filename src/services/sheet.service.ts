import { GoogleSpreadsheet } from "google-spreadsheet";

import { ACCOUNT } from "../consts/account.key";

import { SMS_USER_LIST } from "../consts/spread.sheet.id";
import { JWT } from "google-auth-library";
import { ICustomer } from "../types/customer";

export const getSheetUserList = async (): Promise<ICustomer[]> => {
  try {
    const serviceAccountAuth = new JWT({
      email: ACCOUNT.client_email,
      key: ACCOUNT.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"]
    });

    const doc = new GoogleSpreadsheet(SMS_USER_LIST, serviceAccountAuth);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows({ offset: 0, limit: 1000 });
    const result: ICustomer[] = [];
    rows.forEach((s: any) => {
      const customer: ICustomer = { phoneNumber: s._rawData[0], saleType: s._rawData[1] };
      result.push(customer);
    });
    return result;
  } catch (e: any) {
    console.log(e);
    throw e;
  }
};
