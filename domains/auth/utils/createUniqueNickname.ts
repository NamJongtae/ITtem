import { Model } from "mongoose";
import { UserDB } from "../models/User";
import { v4 as uuid } from "uuid";

export default async function createUniqueNickname(User: Model<UserDB>) {
  const randomString = uuid().substring(0, 8);
  let userNickname = randomString;
  let isDuplicationNickname = true;
  while (isDuplicationNickname) {
    const nicknameCheckResult = await User.findOne({ nickname: userNickname });
    if (nicknameCheckResult) {
      // 닉네임이 중복될 경우, 랜덤 숫자를 추가하여 새로운 닉네임 생성
      userNickname = randomString;
    } else {
      // 닉네임이 중복되지 않으면 루프 종료
      isDuplicationNickname = false;
    }
  }
  return userNickname;
}
