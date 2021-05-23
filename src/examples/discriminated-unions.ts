/* eslint-disable @typescript-eslint/no-unused-vars */
// 定義多個不同的 Type，但這些 Type 中都會有一個共同的欄位，例如 `status`
// 以此欄位來判斷物件中會有其他哪些屬性。
interface ISuccessResp {
  status: 'OK';
  payload: unknown;
}

interface IErrorResp {
  status: 'ERROR';
  errorCode: number;
  description: string;
}

// 利用 Union 的方式產生 Union Type
type Resp = ISuccessResp | IErrorResp;

const parseResponse = (resp: Resp) => {
  switch (resp.status) {
    case 'OK':
      // 透過 narrow 可以確定這裡的 resp 是 ISuccessResp 的型別
      return resp.payload;
    case 'ERROR':
      // 透過 narrow 可以確定這裡的 resp 是 IErrorResp 的型別
      return resp.description;
    default: {
      // 沒有判斷到的情況利用 exhaustiveness checking
      // 避免有 case 在上面是沒有被定義到的
      const exhaustiveCheck: never = resp;
      return exhaustiveCheck;
    }
  }
};
