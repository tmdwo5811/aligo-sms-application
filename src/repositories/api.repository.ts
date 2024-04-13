import axios from "axios";
import { ALIGO_API_KEY, ALIGO_USER_ID } from "../consts/api.const";

const ALIGO_API_URL = "https://apis.aligo.in";
export const sendMessageByAligo = async (sender: string, receiver: string, message: string) => {
  try {
    const BASE_URL = `${ALIGO_API_URL}/send`;
    const data: any = {};
    const headers: any = {
      params: {
        key: ALIGO_API_KEY,
        user_id: ALIGO_USER_ID,
        sender,
        receiver,
        msg: message
        // testmode_yn: "Y"
      }
    };
    const res = await axios.post(BASE_URL, data, headers);
    return res.data;
  } catch (e) {
    throw e;
  }
};
