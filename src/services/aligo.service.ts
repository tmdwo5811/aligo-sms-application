import { sendMessageByAligo } from "../repositories/api.repository";
import { getSheetUserList } from "./sheet.service";
import { ICustomer } from "../types/customer";

const sendSmsMessage = async (receiver: string, saleType: string) => {
  const sender = "010-1111-2222";
  const message: string = `문자 테스트\n${saleType} 구해요!\n연락 주세요~!`;
  const result = await sendMessageByAligo(sender, receiver, message);
  return result;
};

export const sendMessageBySheetUserList = async () => {
  const customerList = await getSheetUserList();
  for (let i = 0; i < customerList.length; i++) {
    const customer: ICustomer = customerList[i];
    const sendResult = await sendSmsMessage(customer.phoneNumber, customer.saleType);
    console.log(sendResult);
  }
};
