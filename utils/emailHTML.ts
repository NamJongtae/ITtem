import { EmailVerificationType } from "@/domains/auth/types/auth-types";
export const emailHTML = (verfiyCode: string, type: EmailVerificationType) => {
  return `
<body>
  <h1
  style="
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 24px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  color:black";
"
> ITtem
</h1>

<p style="white-space:pre-line; margin: 20px 0; font-size:16px; font-weight:700; color:black">${
    type === "resetPw"
      ? "ITtem 비밀번호 찾기 인증코드입니다."
      : "ITtem 가입을 환영합니다 :)"
  }\n아래 인증코드를 입력해주세요.</p>
<h2 style="font-size: 14px; margin: 0; padding: 0; margin-bottom: 10px; color:black;">
메일 인증코드
</h2>

<div
style="
  position: relative;
  background-color: #96bffd;
  padding: 20px 40px;
  border-radius: 5px;
  display: inline-block;
  color: white;
  font-size: 1.5rem;
  margin: 0 auto 20px auto;
"
>
<span style="padding: 2px 8px">${verfiyCode.toString()[0]}</span>
<span style="padding: 2px 8px">${verfiyCode.toString()[1]}</span>
<span style="padding: 2px 8px">${verfiyCode.toString()[2]}</span>
<span style="padding: 2px 8px">${verfiyCode.toString()[3]}</span>
<span style="padding: 2px 8px">${verfiyCode.toString()[4]}</span>
<span style="padding: 2px 8px">${verfiyCode.toString()[5]}</span>
</div>

<ul
style="color: #757575; font-size: 14px; list-style: none; padding: 0; margin: 0 0 50px 0; width:100%;"
>
<li style="padding: 0; margin:0 0 5px 0;">자신외 다른사람에게 인증번호를 공유하지마세요.</li>
<li style="padding: 0; margin:0 0 5px 0;">인증을 완료하고 다음단계를 진행해주세요.</li>
</ul>

<p
style="
font-size: 0.875rem;
color: #757575;
"
>
© Copyright ITtem, 2024 All Rights Reserved. 
</p>
<div style="clip: rect(1px, 1px, 1px, 1px);
clip-path: inset(50%);
width: 1px;
height: 1px;
margin: -1px;
overflow: hidden;
padding: 0;
position: absolute;">${verfiyCode}</div>
</body>
  `;
};
