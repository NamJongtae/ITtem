import sendVerificationCode from "../../../utils/sendVerificationCode";
import getEmailVerificationCode from "../../../utils/getEmailVerificationCode";
import saveEmailVerificationCode from "../../../utils/saveEmailVerificationCode";
import getSmtpTransport from "../../../utils/getSmtpTransport";
import {
  VERIFICATION_EMAIL_BLOCK_EXP,
  VERIFICATION_EMAIL_EXP
} from "@/domains/auth/shared/common/constants/constansts";

jest.mock("../../../utils/getEmailVerificationCode");
jest.mock("../../../utils/saveEmailVerificationCode");
jest.mock("../../../utils/getSmtpTransport");
jest.mock("uuid", () => ({
  v4: () => "mock-uuid", // uuid mock
}));
jest.mock("../../../utils/emailHTML", () => ({
  emailHTML: jest.fn()
}));

describe("sendVerificationCode", () => {
  const email = "test@example.com";
  const type = "signup";

  const mockSendMail = jest.fn((opts, cb) => cb(null, { success: true }));

  beforeEach(() => {
    jest.clearAllMocks();
    (getSmtpTransport as jest.Mock).mockResolvedValue({
      sendMail: mockSendMail
    });
  });

  it("시도 횟수가 10 이상이면 요청 제한 메시지를 반환합니다.", async () => {
    (getEmailVerificationCode as jest.Mock).mockResolvedValue({
      count: "10"
    });

    const result = await sendVerificationCode(email, type);

    expect(result.success).toBe(false);
    expect(result.status).toBe(403);
    expect(result.message).toContain("요청이 제한되요");
    expect(saveEmailVerificationCode).not.toHaveBeenCalled();
  });

  it("기존 시도 횟수가 있을 때 인증 코드를 증가시켜 저장합니다.", async () => {
    (getEmailVerificationCode as jest.Mock).mockResolvedValue({
      count: "4"
    });

    const result = await sendVerificationCode(email, type);

    expect(getSmtpTransport).toHaveBeenCalled();
    expect(mockSendMail).toHaveBeenCalled();

    expect(saveEmailVerificationCode).toHaveBeenCalledWith(
      email,
      expect.any(String),
      type,
      5, // count + 1
      VERIFICATION_EMAIL_EXP
    );

    expect(result.success).toBe(true);
    expect(result.status).toBe(200);
  });

  it("시도 횟수가 9이상인 경우 BLOCK_EXP를 설정합니다.", async () => {
    (getEmailVerificationCode as jest.Mock).mockResolvedValue({
      count: "9"
    });

    const result = await sendVerificationCode(email, type);

    expect(saveEmailVerificationCode).toHaveBeenCalledWith(
      email,
      expect.any(String),
      type,
      10,
      VERIFICATION_EMAIL_BLOCK_EXP
    );

    expect(result.success).toBe(true);
  });

  it("기존 데이터가 없을 때 count 없이 저장합니다.", async () => {
    (getEmailVerificationCode as jest.Mock).mockResolvedValue(null);

    const result = await sendVerificationCode(email, type);

    expect(saveEmailVerificationCode).toHaveBeenCalledWith(
      email,
      expect.any(String),
      type
    );

    expect(result.success).toBe(true);
  });

  it("메일 전송 실패 시 reject 처리되어야 한다", async () => {
    (getEmailVerificationCode as jest.Mock).mockResolvedValue(null);
    mockSendMail.mockImplementation((_, cb) => cb(new Error("메일 전송 실패")));

    await expect(
      sendVerificationCode("user@example.com", "signup")
    ).rejects.toThrow("메일 전송 실패");
  });
});
