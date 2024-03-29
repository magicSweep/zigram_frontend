import wait from "waait";
import { request_, setIsRequested, getIsRequested } from ".";
/* import { login } from "../../service/AuthService";

jest.mock("../../service/AuthService", () => ({
  __esModule: true,
  login: jest.fn(),
})); */

//global.console.error = jest.fn();

describe("useLogin", () => {
  const dispatch = jest.fn();

  const loginRequestAC = jest.fn(() => "loginRequestAC");
  const loginRequestErrorAC = jest.fn(() => "loginRequestErrorAC");
  /*   const setIsRequested = jest.fn();
  const getIsRequested = jest.fn(() => false);
 */ const login = jest.fn();

  const request = request_(
    loginRequestAC,
    loginRequestErrorAC,
    setIsRequested,
    getIsRequested,
    login
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("request", () => {
    test("If all ok", async () => {
      (login as jest.Mock).mockResolvedValueOnce(true);

      const startNew = request(dispatch);

      // @ts-ignore
      startNew();

      expect(getIsRequested()).toEqual(true);

      await wait(500);

      expect(dispatch).toHaveBeenCalledTimes(1);

      expect(dispatch).toHaveBeenNthCalledWith(1, "loginRequestAC");

      /*  expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: "LOGIN_REQUEST_SUCCESS",
      }); */

      expect(login).toHaveBeenCalledTimes(1);

      expect(getIsRequested()).toEqual(false);
    });

    test("If error on request", async () => {
      (login as jest.Mock).mockRejectedValueOnce("Bad fat error");

      const startNew = request(dispatch);

      // @ts-ignore
      startNew();

      expect(getIsRequested()).toEqual(true);

      await wait(500);

      expect(dispatch).toHaveBeenCalledTimes(3);

      expect(dispatch).toHaveBeenNthCalledWith(1, "loginRequestAC");

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: "alert/showAlert",
        payload: {
          alertType: "error",
          message: "Упс... Какая-то ошибочка...",
        },
      });

      expect(dispatch).toHaveBeenNthCalledWith(3, "loginRequestErrorAC");

      expect(login).toHaveBeenCalledTimes(1);

      expect(getIsRequested()).toEqual(false);
    });
  });
});
