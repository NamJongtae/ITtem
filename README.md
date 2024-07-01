# 📦 ITtem

![thumbnail](https://github.com/NamJongtae/ITtem/assets/113427991/f996dd94-9c15-481f-a9e4-df3e4d936b1d)

#### 🎈 테스트 계정

| ID         | PW         |
| ---------- | ---------- |
| test@a.com | asdzxc123! |

#### 🌏 배포 URL : 📦 [ITtem](https://ittem.vercel.app)

<br/>

### 📃 목차 (클릭 시 해당 목차로 이동합니다.)

- [🙋‍♂ 프로젝트 소개](#-프로젝트-소개)
- [📆 개발기간](#-개발기간)
- [⚙ 개발환경](#-개발환경)
- [🔩 벡엔드&API](#-벡엔드--api)

- [⛓ 아키텍처](#-아키텍처)

- [💡 프레임워크 및 라이브러리 사용 이유](#-프레임워크-및-라이브러리-사용-이유)

- [🔨 리팩터링](#-리팩터링)

  - [🗜 bundle 사이즈 최적화](#-bundle-사이즈-최적화)
  - [🏭 query-key-factory 적용](#-query-key-factory-적용)
  - [🧩 customhook 패턴 로직 분리](#-customhook-패턴-로직-분리)
  - [⌨ 모달 및 드롭 다운 메뉴 키보드 최적화](#-모달-및-드롭-다운-메뉴-키보드-최적화)
  - [📱 모달 모바일 뒤로가기 버튼적용](#-모달-모바일-뒤로가기-버튼-적용)

- [🔫 트러블 슈팅](#-트러블-슈팅)
  - [🍪 ssr 쿠키 전달 문제](#-ssr-쿠키-전달-문제)
  - [🌍 vercel 배포 문제](#-vercel-배포-문제)
  - [🗜 middleware 토큰 인증 로직 구현 문제](#-middleware-토큰-인증-로직-구현-문제)
  - [🖌 tailwindcss 동적 스타일링 문제](#-tailwindcss-동적-스타일링-문제)

- [👀 구현 기능 미리보기](#-구현-기능-미리보기--제목-클릭-시-해당-기능-상세설명으로-이동됩니다-)

<br>

### 🙋‍♂ 프로젝트 소개

> **ITtem은 중고 상품을 거래하고, 무료 나눔하는 웹 애플리케이션입니다.**

- 중고 상품을 판매, 구매 하거나 무료 나눔 할 수 있습니다.
- 채팅을 통해 편리하게 실시간으로 소통이 가능합니다.
- 다양한 상품을 합리적인 가격에 찾아볼 수 있습니다.
- 실시간 알림 기능으로 거래 과정을 빠르게 확인할 수 있습니다.

<br>

### 📆 개발기간

**개발 시작 : 2024. 04. 05**

**개발 완료 : 2023. 06. 29**

<br>

### ⚙ 개발환경

| 프론트엔드                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | 벡엔드                                                                                                                                                                                                                                                                                | 디자인                                                                                    | 배포, 관리                                                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img alt="Html" src ="https://img.shields.io/badge/HTML5-E34F26?logo=HTML5&logoColor=white"/> <img alt="CSS" src ="https://img.shields.io/badge/CSS3-1572B6?logo=CSS3&logoColor=white"/> <img alt="TypeScript" src ="https://img.shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/react-61DAFB?logo=react&logoColor=black"> <img src ="https://img.shields.io/badge/next.js-000000?logo=nextdotjs&logoColor=white"/> <img src="https://img.shields.io/badge/redux_toolkit-764ABC?&logo=redux&logoColor=white"> <img src="https://img.shields.io/badge/reactquery-FF4154?&logo=reactquery&logoColor=fff"> <img src="https://img.shields.io/badge/tailwindcss-0F172A?&logo=tailwindcss"> | <img src ="https://img.shields.io/badge/-MongoDB-13aa52?logo=mongodb&logoColor=white"/> <img src ="https://img.shields.io/badge/next.js_API_Routers-000000?logo=nextdotjs&logoColor=white"/> <img src ="https://img.shields.io/badge/firebase-ffca28?logo=firebase&logoColor=black"/> | <img src="https://img.shields.io/badge/figma-F24E1E?logo=figma&logoColor=white" width=70> | <img src="https://img.shields.io/badge/vercel-000000?logo=vercel&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?logo=github&logoColor=white"> |

<br>

### 🔩 벡엔드 & API

Serverless로 벡엔드 API를 구축하였습니다.

- Nextjs api routers를 통해 api 엔드 포인트를 구현하였습니다.
- firebase를 통해 실시간 채팅 및 알림 기능을 구현하였습니다.
- 별도의 서버 관리가 필요 없는 firebase, mogodb를 이용하여 db를 구축하였습니다.

<br>

### ⛓ 아키텍처

![architecture](https://github.com/NamJongtae/ITtem/assets/113427991/2aac45da-4f19-40f4-a98f-466d6af1095e)

### 💡 프레임워크 및 라이브러리 사용 이유

#### Next.js

- **SSR, SSG, ISR 제공**: 서버 사이드 렌더링(SSR), 정적 사이트 생성(SSG), 점진적 정적 재생성(ISR)을 지원하여 다양한 렌더링 방식 제공.
- **SEO 최적화**: Pre-rendering을 통해 SEO(검색 엔진 최적화)에 유리.
- **이미지 최적화 및 코드 분할**: 성능 향상을 위한 이미지 최적화 및 코드 분할 기능 제공.
- **페이지 기반 라우팅**: 별도의 라우팅 설정 없이 페이지 파일 생성만으로 라우팅 가능.
- **Serverless 환경 지원**: API 엔드포인트를 손쉽게 만들 수 있는 API Routes 제공.

#### React Query

- **쿼리 키 및 함수 관리 용이**: 쿼리 키와 쿼리 함수를 기능별로 명확히 분리하여 유지 보수 및 관리가 용이.
- **캐싱 및 동기화**: 서버 상태 관리와 캐싱, 동기화를 통해 효율적인 데이터 페칭 및 상태 관리 가능.
- **자동 리페칭**: 데이터 변경 시 자동으로 리페칭하여 최신 상태 유지.
- **배경 데이터 업데이트**: 사용자가 보는 동안 데이터 업데이트를 배경에서 처리.

#### Redux Toolkit

- **전역 상태 관리**: 전역 상태 관리를 위한 강력한 도구로, 일반 Redux보다 사용이 간편.
- **코드 간소화**: 복잡한 설정 없이 간결하게 상태 관리 로직 구현 가능.

#### MongoDB

- **무서버 데이터 관리**: 별도의 서버 관리 없이 클라우드 환경에서 데이터를 편리하게 관리.
- **간단한 사용 방법**: 사용이 쉬워 빠르게 데이터베이스 설정 및 운영 가능.
- **스키마 유연성**: NoSQL 데이터베이스로 스키마가 유연하여 다양한 데이터 구조를 쉽게 저장.

#### Firebase

- **실시간 데이터 통신**: 채팅 및 알림 기능을 위한 실시간 데이터 통신 지원.

#### Jsonwebtoken

- **사용자 인증 및 인가**: 무상태(stateless) 방식으로 클라이언트 측에서 인증 및 인가 구현 가능.
- **서버 세션 불필요**: 서버에 별도의 세션 저장소가 필요하지 않음.
- **보안 강화**: 서명된 토큰을 사용하여 데이터의 무결성을 보장.

#### Redis

- **토큰 관리 및 보안 강화**: 로그인 확인 및 토큰 탈취 시 토큰 무효화 처리 가능.
- **빠른 성능**: 메모리 기반 데이터 저장소로 빠른 속도 제공.
- **TTL 기능**: 토큰 만료 시간을 설정할 수 있어 보안 및 관리 용이.
- **무서버 사용 가능**: 별도의 서버 없이도 사용 가능.

#### Query Key Factory

- **쿼리 키 및 함수 관리 용이**: 기능별로 쿼리 키와 쿼리 함수를 명확히 분리하여 유지 보수 및 관리가 용이.
- **효율적 관리**: 쿼리 키와 함수의 효율적이고 명확한 관리 가능.
- **코드 재사용성 증가**: 쿼리 키와 함수를 재사용 가능하여 코드 중복 감소.

<br>

### 🔨 리팩터링

#### 🗜 bundle 사이즈 최적화

> **적용이유**

- bundle analyze로 번들을 분석하였을 때 필요없는 bundle과 용량이 큰 bundle이 존재하였기 때문입니다.

> **적용 방법**

- bundle analyze로 번들 분석 후 용량이 사용하지 않은 번들과 용량이 큰 번들을 분석하였고, 다이나믹 임포트 방식을 사용하여 코드 스플리팅을 통해 사용하지 않는 번들을 제거하고 번들 사이즈를 최적화 하였습니다.

> **적용으로 얻은 이점**

- 전체적인 번들 사이즈 감소와 공통 번들 사이즈가 588MB에서 340MB로 약 42%(248MB) 감소하였습니다.

> **전후 비교**

**적용 전**
![analyze1](https://github.com/NamJongtae/ITtem/assets/113427991/98f584c3-6dad-410e-8140-f60c97d172f5)

<details>
<summary>분석 결과 보기</summary>

| Route                                                            | Size    | First Load JS |
| ---------------------------------------------------------------- | ------- | ------------- |
| ○ /                                                              | 897 B   | 202 kB        |
| ○ /404                                                           | 774 B   | 164 kB        |
| ○ /signin                                                        | 3.5 kB  | 175 kB        |
| ○ /signin/google                                                 | 1.36 kB | 161 kB        |
| ○ /signin/kakao                                                  | 1.29 kB | 161 kB        |
| ○ /signup                                                        | 4.24 kB | 181 kB        |
| λ /api/auth/changePassword                                       | 0 B     | 159 kB        |
| λ /api/auth/checkEmail                                           | 0 B     | 159 kB        |
| λ /api/auth/deleteToken                                          | 0 B     | 159 kB        |
| λ /api/auth/duplication/email                                    | 0 B     | 159 kB        |
| λ /api/auth/duplication/nickname                                 | 0 B     | 159 kB        |
| λ /api/auth/refreshToken                                         | 0 B     | 159 kB        |
| λ /api/auth/sendVerifyEmail                                      | 0 B     | 159 kB        |
| λ /api/auth/session                                              | 0 B     | 159 kB        |
| λ /api/auth/signin                                               | 0 B     | 159 kB        |
| λ /api/auth/signin/google                                        | 0 B     | 159 kB        |
| λ /api/auth/signin/google/user                                   | 0 B     | 159 kB        |
| λ /api/auth/signin/kakao                                         | 0 B     | 159 kB        |
| λ /api/auth/signin/kakao/user                                    | 0 B     | 159 kB        |
| λ /api/auth/signout                                              | 0 B     | 159 kB        |
| λ /api/auth/signup                                               | 0 B     | 159 kB        |
| λ /api/auth/user                                                 | 0 B     | 159 kB        |
| λ /api/auth/verifyEmail                                          | 0 B     | 159 kB        |
| λ /api/chat                                                      | 0 B     | 159 kB        |
| λ /api/chat/[chatRoomId]                                         | 0 B     | 159 kB        |
| λ /api/chat/[chatRoomId]/enter                                   | 0 B     | 159 kB        |
| λ /api/chat/[chatRoomId]/exit                                    | 0 B     | 159 kB        |
| λ /api/chat/[chatRoomId]/leave                                   | 0 B     | 159 kB        |
| λ /api/chat/[chatRoomId]/message                                 | 0 B     | 159 kB        |
| λ /api/notification                                              | 0 B     | 159 kB        |
| λ /api/notification/[messageId]                                  | 0 B     | 159 kB        |
| λ /api/notification/[messageId]/read                             | 0 B     | 159 kB        |
| λ /api/product                                                   | 0 B     | 159 kB        |
| λ /api/product/[productId]                                       | 0 B     | 159 kB        |
| λ /api/product/[productId]/purchase                              | 0 B     | 159 kB        |
| λ /api/product/[productId]/purchase/cancel                       | 0 B     | 159 kB        |
| λ /api/product/[productId]/purchase/cancel/withdrawal            | 0 B     | 159 kB        |
| λ /api/product/[productId]/purchase/product-receipt-confirmation | 0 B     | 159 kB        |
| λ /api/product/[productId]/purchase/return                       | 0 B     | 159 kB        |
| λ /api/product/[productId]/purchase/return/delivery-confirmation | 0 B     | 159 kB        |
| λ /api/product/[productId]/purchase/return/withdrawal            | 0 B     | 159 kB        |
| λ /api/product/[productId]/report                                | 0 B     | 159 kB        |
| λ /api/product/[productId]/review                                | 0 B     | 159 kB        |
| λ /api/product/[productId]/sales/cancel-comfirmation             | 0 B     | 159 kB        |
| λ /api/product/[productId]/sales/cancel-reject                   | 0 B     | 159 kB        |
| λ /api/product/[productId]/sales/delivery-confirmation           | 0 B     | 159 kB        |
| λ /api/product/[productId]/sales/purchase-request-confirmation   | 0 B     | 159 kB        |
| λ /api/product/[productId]/sales/purchase-request-reject         | 0 B     | 159 kB        |
| λ /api/product/[productId]/sales/return-confirmation             | 0 B     | 159 kB        |
| λ /api/product/[productId]/sales/return-receipt-confirmation     | 0 B     | 159 kB        |
| λ /api/product/[productId]/sales/return-reject                   | 0 B     | 159 kB        |
| λ /profile                                                       | 439 B   | 231 kB        |
| λ /profile/[uid]                                                 | 354 B   | 231 kB        |
| λ /search/product                                                | 2.73 kB | 204 kB        |
| λ /product/[productId]                                           | 8.39 kB | 211 kB        |
| λ /product/[productId]/edit                                      | 363 B   | 225 kB        |
| λ /product/manage                                                | 10.1 kB | 197 kB        |
| ○ /product/upload                                                | 427 B   | 225 kB        |
| First Load JS shared by all                                      | 340 kB  |               |
| ├ chunks/framework-03cd576e71e4cd66.js                           | 45.2 kB |               |
| ├ chunks/main-2022d5fc3fdade3c.js                                | 31.9 kB |               |
| ├ chunks/pages/\_app-0d627b907842ab6f.js                         | 80.1 kB |               |
| ├ css/e523be9dea407922.css                                       | 181 kB  |               |
| └ other shared chunks (total)                                    | 2.2 kB  |               |
| Middleware                                                       | 42.1 kB |               |

</details>

- client에서 사용되지 않는 crypto, bcryptjs 모듈이 번들에 포함되어 있습니다.
- firebase 모듈의 용량이 매우 크게 분포해 있습니다.
- 번들 분석 결과 공통 번들 사이즈가 588MB로 나타났습니다.

<br>

**적용 후**
![analyze2](https://github.com/NamJongtae/ITtem/assets/113427991/a4630da4-940c-44c9-95d9-fa7edb5e17ba)

<details>
<summary>분석 결과 보기</summary>

| Route                                                            | Size    | First Load JS |
| ---------------------------------------------------------------- | ------- | ------------- |
| ○ /                                                              | 897 B   | 449 kB        |
| /\_app                                                           | 0 B     | 407 kB        |
| ○ /404                                                           | 774 B   | 412 kB        |
| λ /api/auth/changePassword                                       | 0 B     | 407 kB        |
| λ /api/auth/checkEmail                                           | 0 B     | 407 kB        |
| λ /api/auth/deleteToken                                          | 0 B     | 407 kB        |
| λ /api/auth/duplication/email                                    | 0 B     | 407 kB        |
| λ /api/auth/duplication/nickname                                 | 0 B     | 407 kB        |
| λ /api/auth/refreshToken                                         | 0 B     | 407 kB        |
| λ /api/auth/sendVerifyEmail                                      | 0 B     | 407 kB        |
| λ /api/auth/session                                              | 0 B     | 407 kB        |
| λ /api/auth/signin                                               | 0 B     | 407 kB        |
| λ /api/auth/signin/google                                        | 0 B     | 407 kB        |
| λ /api/auth/signin/google/user                                   | 0 B     | 407 kB        |
| λ /api/auth/signin/kakao                                         | 0 B     | 407 kB        |
| λ /api/auth/signin/kakao/user                                    | 0 B     | 407 kB        |
| λ /api/auth/signout                                              | 0 B     | 407 kB        |
| λ /api/auth/signup                                               | 0 B     | 407 kB        |
| λ /api/auth/user                                                 | 0 B     | 407 kB        |
| λ /api/auth/verifyEmail                                          | 0 B     | 407 kB        |
| λ /api/chat                                                      | 0 B     | 407 kB        |
| λ /api/chat/[chatRoomId]                                         | 0 B     | 407 kB        |
| λ /api/chat/[chatRoomId]/enter                                   | 0 B     | 407 kB        |
| λ /api/chat/[chatRoomId]/exit                                    | 0 B     | 407 kB        |
| λ /api/chat/[chatRoomId]/leave                                   | 0 B     | 407 kB        |
| λ /api/chat/[chatRoomId]/message                                 | 0 B     | 407 kB        |
| λ /api/notification                                              | 0 B     | 407 kB        |
| λ /api/notification/[messageId]                                  | 0 B     | 407 kB        |
| λ /api/notification/[messageId]/read                             | 0 B     | 407 kB        |
| λ /api/product                                                   | 0 B     | 407 kB        |
| λ /api/product/[productId]                                       | 0 B     | 407 kB        |
| λ /api/product/[productId]/purchase                              | 0 B     | 407 kB        |
| λ /api/product/[productId]/purchase/cancel                       | 0 B     | 407 kB        |
| λ /api/product/[productId]/purchase/cancel/withdrawal            | 0 B     | 407 kB        |
| λ /api/product/[productId]/purchase/product-receipt-confirmation | 0 B     | 407 kB        |
| λ /api/product/[productId]/purchase/return                       | 0 B     | 407 kB        |
| λ /api/product/[productId]/purchase/return/delivery-confirmation | 0 B     | 407 kB        |
| λ /api/product/[productId]/purchase/return/withdrawal            | 0 B     | 407 kB        |
| λ /api/product/[productId]/report                                | 0 B     | 407 kB        |
| λ /api/product/[productId]/review                                | 0 B     | 407 kB        |
| λ /api/product/[productId]/sales/cancel-comfirmation             | 0 B     | 407 kB        |
| λ /api/product/[productId]/sales/cancel-reject                   | 0 B     | 407 kB        |
| λ /api/product/[productId]/sales/delivery-confirmation           | 0 B     | 407 kB        |
| λ /api/product/[productId]/sales/purchase-request-confirmation   | 0 B     | 407 kB        |
| λ /api/product/[productId]/sales/purchase-request-reject         | 0 B     | 407 kB        |
| λ /api/product/[productId]/sales/return-confirmation             | 0 B     | 407 kB        |
| λ /api/product/[productId]/sales/return-receipt-confirmation     | 0 B     | 407 kB        |
| λ /api/product/[productId]/sales/return-reject                   | 0 B     | 407 kB        |
| λ /api/product/[productId]/view                                  | 0 B     | 407 kB        |
| λ /api/product/[productId]/wish                                  | 0 B     | 407 kB        |
| λ /api/product/search                                            | 0 B     | 407 kB        |
| λ /api/product/today                                             | 0 B     | 407 kB        |
| λ /api/product/upload                                            | 0 B     | 407 kB        |
| λ /api/profile                                                   | 0 B     | 407 kB        |
| λ /api/profile/[uid]                                             | 0 B     | 407 kB        |
| λ /api/profile/[uid]/follow                                      | 0 B     | 407 kB        |
| λ /api/profile/[uid]/review                                      | 0 B     | 407 kB        |
| λ /api/profile/followers                                         | 0 B     | 407 kB        |
| λ /api/profile/followings                                        | 0 B     | 407 kB        |
| λ /api/profile/product                                           | 0 B     | 407 kB        |
| λ /api/profile/wish                                              | 0 B     | 407 kB        |
| λ /api/purchase-trading                                          | 0 B     | 407 kB        |
| λ /api/sales-trading                                             | 0 B     | 407 kB        |
| ○ /chat                                                          | 2.8 kB  | 417 kB        |
| λ /chat/[chatRoomId]                                             | 7.55 kB | 430 kB        |
| ○ /findpassword                                                  | 2.21 kB | 427 kB        |
| λ /product                                                       | 3.78 kB | 452 kB        |
| λ /product/[productId]                                           | 8.39 kB | 458 kB        |
| λ /product/[productId]/edit                                      | 363 B   | 472 kB        |
| λ /product/manage                                                | 10.1 kB | 444 kB        |
| ○ /product/upload                                                | 427 B   | 472 kB        |
| λ /profile                                                       | 439 B   | 477 kB        |
| λ /profile/[uid]                                                 | 354 B   | 477 kB        |
| λ /search/product                                                | 2.73 kB | 451 kB        |
| ○ /signin                                                        | 3.49 kB | 423 kB        |
| ○ /signin/google                                                 | 1.36 kB | 409 kB        |
| ○ /signin/kakao                                                  | 1.29 kB | 408 kB        |
| ○ /signup                                                        | 4.24 kB | 429 kB        |
| First Load JS shared by all                                      |         | 588 kB        |
| ├ chunks/framework-5429a50ba5373c56.js                           | 45.2 kB |               |
| ├ chunks/main-2022d5fc3fdade3c.js                                | 31.9 kB |               |
| ├ chunks/pages/\_app-aedf7feb874fe3ea.js                         | 328 kB  |               |
| ├ css/a34982c1a8b93d6e.css                                       | 180 kB  |               |
| └ other shared chunks (total)                                    | 2.06 kB |               |
| Middleware                                                       | 42.1 kB |               |

</details>

- client에서 사용되지 않는 crypto, bcryptjs 모듈이 번들에서 사라졌습니다
- firebase에서 사용하지 않는 모듈들은 청크로 분리되어 생성되었습니다.
- 번들 분석 결과 전체적인 번들 사이즈가 감소하였으며, 공통 번들 사이즈가 588MB에서 340MB로 248MB(약 42%) 감소하였습니다.

<br>

> **적용 코드**

<details>
<summary>코드 보기</summary>

<br>

**1 ) 다이나믹 임포트를 통해 firebase instance 생성**

**적용 전**

```javascript
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { Firestore, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const app = initializeApp(firebaseConfig);
export const firestoreDB = getFirestore(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
```

<br>

**적용 후**

```javascript
import { getApp, getApps, initializeApp } from "firebase/app";

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const getFirestoreDB = async () => {
  const { getFirestore } = await import("firebase/firestore");
  return getFirestore(app);
};
export const getRealtimeDB = async () => {
  const { getDatabase } = await import("firebase/database");
  return getDatabase(app);
};
export const getStorageInstance = async () => {
  const { getStorage } = await import("firebase/storage");
  return getStorage(app);
};
```

<br>

**2 ) api 함수에서 사용되는 firestore, database, storage 모듈 다이나믹 임포트 적용**

**적용 전**

```javascript
import { getRealtimeDB } from "../firebaseSetting";
import { push, set, ref: databaseRef } from "/firebase/database"

//                             •
//                             •
//                           (생략)
//                             •
//                             •

export const sendNotificationMessage = async (
  userId: string,
  message: string
) => {
  if (!userId) return;
  const firebaseDatabase = await import("firebase/database");
  const database = await getRealtimeDB();
  const messageObj: Omit<NotificationMessageData, "id"> = {
    content: message,
    isRead: false,
    isNotification: false,
    timestamp: Date.now(),
  };

  const messageRef = databaseRef(database, `notification/${userId}/messages`);

  const newMessageRef = push(messageRef);
  set(newMessageRef, messageObj);
};

//                             •
//                             •
//                           (생략)
//                             •
//                             •
```

<br>

**적용 후**

```javascript
import { getRealtimeDB } from "../firebaseSetting";

//                             •
//                             •
//                           (생략)
//                             •
//                             •

export const sendNotificationMessage = async (
  userId: string,
  message: string
) => {
  if (!userId) return;
  const firebaseDatabase = await import("firebase/database");
  const database = await getRealtimeDB();
  const { push, set, ref: databaseRef } = firebaseDatabase;
  const messageObj: Omit<NotificationMessageData, "id"> = {
    content: message,
    isRead: false,
    isNotification: false,
    timestamp: Date.now(),
  };

  const messageRef = databaseRef(database, `notification/${userId}/messages`);

  const newMessageRef = push(messageRef);
  set(newMessageRef, messageObj);
};

//                             •
//                             •
//                           (생략)
//                             •
//                             •
```

<br>

**3 ) bcryptjs 모듈 다이나믹 임포트**

**적용 전**

```javascript
import { hash, compare } from "bcryptjs";

export async function getHasdPassword(password: string) {
  try {
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function verifyPassword(password: string, hashedPassword: string) {
  try {
    const isVerify = await compare(password, hashedPassword);
    return isVerify;
  } catch (error) {
    throw error;
  }
}
```

<br>

**적용 후**

```javascript
export async function getHasdPassword(password: string) {
  try {
    const { hash } = await import("bcryptjs");

    const hashedPassword = await hash(password, 12);
    return hashedPassword;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function verifyPassword(password: string, hashedPassword: string) {
  try {
    const { compare } = await import("bcryptjs");

    const isVerify = await compare(password, hashedPassword);
    return isVerify;
  } catch (error) {
    throw error;
  }
}
```

</details>

<br>

#### 🏭 query-key-factory 적용

> **적용이유**

- 이전에 사용했던 방식으로는 쿼리 키를 개별적으로 관리해야 했기 때문에 일관성 있고 명확한 관리가 어려웠습니다. 또한 쿼리 키가 늘어날수록 유지보수성이 떨어졌습니다.

> **적용 방법**

- @lukemorales/query-key-factory 라이브러리을 설치하여 쿼리키와 쿼리 함수를 관리하였습니다.
- createQueryKeys 함수를 사용하여 쿼리 키를 그룹화하고 구조화하였습니다.
- mergeQueryKeys 함수를 사용하여 관련된 쿼리 키들을 하나의 객체로 관리하였습니다.

> **적용으로 얻은 이점**

- 이전에는 각 쿼리 키를 별도의 상수나 함수로 수동으로 정의했지만, createQueryKeys 함수를 사용하여 쿼리 키를 더 체계적으로 정의할 수 있게 되었습니다.
- mergeQueryKeys 함수를 사용하여 쿼리 키들을 하나의 객체로 관리할 수 있게 되었습니다.
- 중앙에서 쿼리 키를 정의하여 일관성 있게 사용할 수 있게 되었고, 재사용성이 높아졌으며, 유지 보수성이 향상되었습니다.

> **적용 코드**

<details>
<summary>코드 보기</summary>

<br>

**적용 전**

```javascript
//                             •
//                             •
//                           (생략)
//                             •
//                             •

export const getProductQueryKey = (productId: string) => {
  return ["product", productId];
};

export const getProfileQueryKey = (uid: string) => {
  return ["profile", uid];
};

export const MY_PROFILE_QUERY_KEY = ["profile", "my"];

//                             •
//                             •
//                           (생략)
//                             •
//                             •
```

- 쿼리키와 쿼리키 생성 함수를 수동으로 직접 생성하였습니다.

<br>

**적용 후**

```javascript
import { ProductManageMenu } from "@/components/product-manage/product-manage-page";
import { getSessionCookies, getUser } from "@/lib/api/auth";
import { getNotificationMessage } from "@/lib/api/notification";
import {
  getCategoryProductList,
  getProduct,
  getProfileProductList,
  getPurchaseTrading,
  getReview,
  getSalesTrading,
  getSearchProductList,
  getTodayProductList,
} from "@/lib/api/product";
import {
  getFollowers,
  getFollowings,
  getMyProfile,
  getProfileReviews,
  getProfileWish,
  getUserProfile,
} from "@/lib/api/profile";
import { ProductCategory, ProductListType } from "@/types/productTypes";
import {
  createQueryKeys,
  mergeQueryKeys,
} from "@lukemorales/query-key-factory";

export const authQueryKey = createQueryKeys("auth", {
  info: (userId?: string) => ({
    queryKey: [userId],
    queryFn: getUser,
  }),
});

export const productQueryKey = createQueryKeys("product", {
  list: ({
    productListType,
    produdctCategory,
    location,
    limit,
  }: {
    productListType?: ProductListType;
    produdctCategory?: ProductCategory;
    location?: string;
    limit: number;
  }) => ({
    queryKey: productListType
      ? [productListType]
      : produdctCategory && location
      ? [produdctCategory, location]
      : [produdctCategory],
    queryFn: produdctCategory
      ? async ({ pageParam }) => {
          const response = await getCategoryProductList({
            category: produdctCategory,
            cursor: pageParam,
            limit,
            location,
          });
          return response.data.products;
        }
      : async ({ pageParam }) => {
          const response = await getTodayProductList(pageParam, limit);
          return response.data.products;
        },
  }),
  search: ({
    keyword,
    category,
    limit,
  }: {
    keyword?: string;
    category: ProductCategory;
    limit: number;
  }) => ({
    queryKey: [keyword, category],
    queryFn: async ({ pageParam }) => {
      const response = await getSearchProductList({
        category,
        cursor: pageParam,
        limit,
        keyword: (keyword as string) || "",
      });
      return response.data.products;
    },
  }),
  detail: (productId: string) => ({
    queryKey: [productId],
    queryFn: async () => {
      const response = await getProduct(productId);
      return response.data.product;
    },
  }),
  review: (productId: string) => ({
    queryKey: [productId],
    queryFn: async () => {
      const response = await getReview(productId);
      return response.data.review;
    },
  }),
  manage: ({
    currentMenu,
    status,
    search,
    menu,
    limit,
  }: {
    currentMenu: "sale" | "purchase";
    status: string;
    search: string | undefined;
    menu: ProductManageMenu;
    limit: number;
  }) => ({
    queryKey: [currentMenu, status, search],
    queryFn: async ({ pageParam }) => {
      if (menu === "판매") {
        const response = await getSalesTrading({
          status,
          cursor: pageParam,
          search,
          limit,
        });
        return response.data.saleTrading;
      } else {
        const response = await getPurchaseTrading({
          status,
          cursor: pageParam,
          search,
          limit,
        });
        return response.data.purchaseTrading;
      }
    },
  }),
});

//                             •
//                             •
//                           (생략)
//                             •
//                             •

export const queryKeys = mergeQueryKeys(
  authQueryKey,
  productQueryKey,
  profileQueryKey,
  sessionQueryKey,
  notificationQueryKey
);
```

- query-key-factory 라이브러리를 통해 쿼리키와 쿼리함수를 하나의 객체로 관리하였습니다.
- mergeQueryKeys 함수를 통해 쿼리 키들을 하나의 객체로 관리하였습니다.

</details>

<br>

#### 🧩 customhook 패턴 로직 분리

> **적용이유**

- 기존 컴포넌트에서 UI와 로직 코드가 함께 존재하여 유지보수 및 코드 가독성이 안좋았기 때문입니다.

> **적용 방법**

- 로직은 컴포넌트 마다 별도의 customhook를 생성하여 관리 하도록 적용하였습니다.

> **적용으로 얻은 이점**

- UI와 로직을 분리하여 관리할 수 있게 되어, 유지 보수 및 가독성이 향상되었습니다.
- customhook 패턴으로 분리하여 공통된 로직의 재사용성이 증가하였습니다.

> **적용 코드**

<details>
<summary>코드보기</summary>

**적용 전**

```javascript
import ProfileUserInfo from "./profileUserInfo/profile-userInfo";
import ProfileDetail from "./profile-detail";
import { useState } from "react";
import useProfileQuery from "@/hooks/reactQuery/querys/profile/useProfileQuery";
import Loading from "../commons/loading";
import Empty from "../commons/Empty";
import { isAxiosError } from "axios";
import useMyProfileQuery from "@/hooks/reactQuery/querys/profile/useMyProfileQuery";

export type ProfileMenu = "판매상품" | "거래후기" | "팔로잉" | "팔로워" | "찜";

interface IProps {
  my?: boolean;
}

export default function ProfilePage({ my }: IProps) {
  const [profileMenu, setProfileMenu] = useState < ProfileMenu > "판매상품";
  const { profileData, loadProfileDataLoading, loadProfileDataError } =
    useProfileQuery();

  const { myProfileData, loadMyProfileLoading } = useMyProfileQuery();

  const handleClickMenu = (menu: ProfileMenu) => {
    setProfileMenu(menu);
  };

  if (loadProfileDataLoading || loadMyProfileLoading) {
    return <Loading />;
  }

  if (loadProfileDataError) {
    return (
      <Empty
        message={
          (isAxiosError < { message: string } > loadProfileDataError &&
            loadProfileDataError.response?.data.message) ||
          ""
        }
      />
    );
  }
  return (
    <>
      <ProfileUserInfo
        handleClickMenu={handleClickMenu}
        userProfileData={my ? myProfileData : profileData}
        myProfileData={myProfileData}
      />
      <ProfileDetail
        profileMenu={profileMenu}
        handleClickMenu={handleClickMenu}
        userProfileData={my ? myProfileData : profileData}
        myProfileData={myProfileData}
        my={my}
      />
    </>
  );
}
```

- 현재 필요한 로직과 UI가 컴포넌트에 같이 존재합니다.

<br>

**적용 후**

```javascript
import ProfileUserInfo from "./profileUserInfo/profile-userInfo";
import ProfileDetail from "./profile-detail";
import Loading from "../commons/loading";
import Empty from "../commons/Empty";
import { isAxiosError } from "axios";
import useProfilePage from "@/hooks/profile/useProfilePage";

export type ProfileMenu = "판매상품" | "거래후기" | "팔로잉" | "팔로워" | "찜";

interface IProps {
  my?: boolean;
}

export default function ProfilePage({ my }: IProps) {
  const {
    profileMenu,
    profileData,
    myProfileData,
    isLoading,
    error,
    handleClickMenu,
  } = useProfilePage();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Empty
        message={
          (isAxiosError < { message: string } > error &&
            error.response?.data.message) ||
          ""
        }
      />
    );
  }
  return (
    <>
      <ProfileUserInfo
        handleClickMenu={handleClickMenu}
        userProfileData={my ? myProfileData : profileData}
        myProfileData={myProfileData}
      />
      <ProfileDetail
        profileMenu={profileMenu}
        handleClickMenu={handleClickMenu}
        userProfileData={my ? myProfileData : profileData}
        myProfileData={myProfileData}
        my={my}
      />
    </>
  );
}
```

- 현재 필요한 로직이 하나의 customhook으로 분리되어 UI와 로직이 잘 분리되어있습니다.

<br>

</details>

<br>

#### ⌨ 모달 및 드롭 다운 메뉴 키보드 최적화

> **적용이유**

- 기존 모달 및 드롭 다운 메뉴에서 tab 포커싱이 벗어나는 현상이 있었고, 키보드 접근성을 향상 시키고자 적용하였습니다.

> **적용 방법**

- 별도의 유틸함수를 만들어 keyDown 이벤트에 적용하였습니다.
- ref 객체를 통해 요소들에 포커싱을 조정하였습니다.
- esc키를 누를시 해당 모달 및 드롭 다운 메뉴가 닫히도록 적용하였습니다.

> **적용으로 얻은 이점**

- 모달 및 드롭 다운 메뉴에서 tab 포커싱이 벗어나는 현상이 없었고, 키보드 접근성이 향상되었습니다.

> **적용 전후 비교**

**적용 전**

![optKeyboard_before](https://github.com/NamJongtae/ITtem/assets/113427991/d9f7833f-9d71-45d9-b4d5-1ba4d6e0ac61)

- 메뉴에서 포커싱이 벗어나는 것을 볼 수 있습니다.

<br>

**적용 후**

![optKeyboard_after](https://github.com/NamJongtae/ITtem/assets/113427991/cf1123e7-a80f-4ea3-8e37-21224ef8396c)

- 메뉴에서 포커싱이 더 이상 벗어나지 않습니다.
- esc키를 누르면 메뉴가 닫히는 것을 볼 수 있습니다.

> **적용 코드**

<details>
<summary>코드보기</summary>

<br>

**1 ) 유틸 함수**

```javascript
/**
 * @param {React.KeyboardEvent<HTMLElement>} params.event - 키보드 이벤트 객체입니다.
 * @param {HTMLElement | null} params.previousTarget - 이전 포커싱 대상입니다.
 * @param {HTMLElement | null} [params.nextTarget] - 다음 포커싱 대상입니다.
 */
export const optimizationTabFocus = ({
  event,
  previousTarget,
  nextTarget,
}: {
  event: React.KeyboardEvent<HTMLElement>,
  previousTarget: HTMLElement | null,
  nextTarget?: HTMLElement | null,
}) => {
  if (event.shiftKey && event.keyCode === 9 && previousTarget) {
    event.preventDefault();
    console.log(previousTarget);
    previousTarget.focus();
  } else if (nextTarget && event.keyCode === 9) {
    event.preventDefault();
    nextTarget.focus();
  }
};

export const escKeyClose = ({
  event,
  closeCb,
}: {
  event: React.KeyboardEvent<HTMLElement>,
  closeCb: () => void,
}) => {
  if (event.keyCode === 27) {
    closeCb();
  }
};
```

<br>

**2 ) 유틸 함수 적용 코드**

```javascript
import { CATEGORY } from "@/constants/constant";
import useCateogryMobileList from "@/hooks/commons/layout/useCateogryMobileList";
import { escKeyClose } from "@/lib/optimizationKeyboard";
import React, { forwardRef } from "react";

interface IProps {
  isOpenCategory: boolean;
  toggleMenu: () => void;
  handleSelectCategory: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  currentCategory: string;
}

const CategoryMobileList = forwardRef<HTMLUListElement, IProps>(
  (
    { isOpenCategory, toggleMenu, handleSelectCategory, currentCategory },
    ref
  ) => {
    const { setCategoryClassName, setCategoryBtnRef, categoryOnKeyDown } =
      useCateogryMobileList({ currentCategory });

    return (
      isOpenCategory && (
        <ul
          className="absolute sm:hidden right-[10px] mt-10 w-[105px] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-x-hidden overflow-y-scroll p-1 max-h-[222px] scrollbar-hide animate-entering"
          role="menu"
          ref={ref}
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          onKeyDown={(e) => escKeyClose({ event: e, closeCb: toggleMenu })}
        >
          {CATEGORY.map((category, index) => (
            <li key={category} className="">
              <button
                type="button"
                data-category={category}
                onClick={handleSelectCategory}
                className={setCategoryClassName(category)}
                role="menuitem"
                ref={setCategoryBtnRef(index)}
                onKeyDown={(e) => categoryOnKeyDown(e, index)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      )
    );
  }
);

CategoryMobileList.displayName = "CategoryMobileList";
export default CategoryMobileList;

```

```javascript
// categoryKeyDown 함수

const categoryOnKeyDown = (
  e: React.KeyboardEvent<HTMLElement>,
  index: number
) => {
  if (index === CATEGORY.length - 1) {
    optimizationTabFocus({
      event: e,
      previousTarget: lastCategoryPreviousRef.current,
      nextTarget: firstCategoryRef.current,
    });
  } else if (index === 0) {
    optimizationTabFocus({
      event: e,
      previousTarget: lastCategoryRef.current,
    });
  }
};
```

<br>

</details>

<br>

#### 📱 모달 모바일 뒤로가기 버튼 적용

> **적용이유**

- 모달창에서 모바일 환경에서 뒤로가기 버튼을 누르면 이전 페이지로 돌아가기 않고 모달창이 닫히도록 구현하여, 사용자 경험을 향상 시키고자 적용하였습니다.

> **적용 방법**

- history api를 이용하여 빈 히스토리를 생성하고 뒤로가기 버튼을 눌렀을 경우 이전 페이지로 돌아가는 것을 막고, 모달창을 닫히도록 구현하였습니다.
- 재사용을 위해 별도의 customhook를 만들어 적용하였습니다.

> **적용으로 얻은 이점**

- 모바일 환경에서의 사용자 경험이 향상되었습니다.

> **적용 코드**

<details>
<summary>코드보기</summary>

```javascript
import { useEffect } from "react";
import { isMobile } from "react-device-detect";

interface IParams {
  closeModal: () => void;
  isOpenModal: boolean;
}
export const useModalMobileBackBtn = ({ closeModal, isOpenModal }: IParams) => {
  // 모바일 뒤로가기 구현을 위해 빈 히스토리 생성
  // 뒤로가기 버튼을 눌러도 현재 페이지가 유지
  useEffect(() => {
    if (isMobile && isOpenModal) {
      window.history.pushState(null, "", window.location.href);
    }
  }, [isOpenModal]);

  useEffect(() => {
    if (isMobile && isOpenModal) {
      const handlePopState = () => {
        closeModal();
      };

      window.onpopstate = handlePopState;

      return () => {
        window.onpopstate = null;
      };
    }
  }, [closeModal, isOpenModal]);
};
```

- 파라미터로 closeModal 콜백함수를 받아 뒤로가기가 감지된 경우 콜백함수를 실행시키도록 구현하였습니다.
- window.onpopstate 이벤트를 이용하여 뒤로가기를 감지하였습니다.
- 파라미터로 isOpenModal 조건을 받아 모달창이 열렸을 경우에만 적용되도록 구현하였습니다.
- react-device-detect 라이브러리의 isMobile를 이용하여 모바일 환경일 경우에만 동작하도록 구현하였습니다.

<br>

</details>

<br>

### 🔫 트러블 슈팅

#### 🍪 SSR 쿠키 전달 문제

> 문제 상황

- SSR에서 prefetch를 통해 데이터를 가져올 때, 유저 토큰이 만료되었을 경우 리프레쉬 토큰을 통해 엑세스 토큰을 발급 받는 로직이 실행되지 않았습니다.
- 따라서, 토큰이 만료되고나면 prefetch가 이루어지지 않는 문제가 발생하였습니다.

> 문제 원인

- SSR에서 api 실행시 헤더에 쿠키가 전달되지 않아 발생한 문제입니다.
- SSR에서는 서버사이드의 쿠키만을 사용하기 때문에 클라이언트의 쿠키를 전달 받을 수 없어 발생한 문제입니다.

> 해결 방법

- SSR에서 **context.req.cookies** 를 통해 클라이언트의 쿠키를 직접 서버 사이드로 전달하여 문제를 해결하였습니다.

> 해결 코드

<details>
<summary>코드 보기</summary>

```javascript
export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { getIronSession } = await import("iron-session");
  const session = await getIronSession<IronSessionData>(
    context.req,
    context.res,
    sessionOptions
  );
  const cookie = context.req.headers.cookie;
  const myProfuileQueryKeyConfig = queryKeys.profile.my;

  if (session.refreshToken) {
    // headers에 쿠키를 직접 전달
    customAxios.
    await queryClient.prefetchQuery({
      queryKey: myProfuileQueryKeyConfig.queryKey,
      queryFn: async () => {
        try {
          const response = await customAxios("/api/profile", {
            headers: {
              Cookie: cookie,
            },
          });
          return response.data.profile;
        } catch (error) {
          console.error(error);
        }
      },
    });
  }
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};
```

</details>

<br>

#### 🌍 vercel 배포 문제

> 문제 상황

- vercel에 프로젝트 배포후 504 gateway timeout가 빈번하게 발생하였습니다.

> 문제 원인

- vercel의 무료 버전의 경우 응답 시간이 10s 이상일 경우 nextjs에서는 504 에러를 반환하고 서버를 중단하게됩니다.
- 현재 vercel CDN 지역이 미국 워싱턴 DC로 설정되어 있어 응답 시간 지연이 발생하였습니다.

> 해결 방법

- 해결방법은 응답 지연시간을 늘려주는 pro 버전으로 업그레이드와 서버 위치 변경이 있었습니다.
- 프로젝트 최상단에 vercel.json 파일 생성하여 지역 설정 코드를 넣으면 지역을 변경할 수 있었습니다.
- vercel CDN 지역을 서울로 변경하여 문제를 해결할 수 있었습니다.

> 해결 코드

<details>
<summary>코드보기</summary>

```javascript
// vercel.json
{
  "regions": ["icn1"],
}
```
- 프로젝트 최상단 vercel.json를 추가해주고 지역설정을 변경하였습니다.
</details>

<br>

#### 🗜 middleware 토큰 인증 로직 구현 문제
>문제 상황
- nextjs에서 제공하는 middleware로 api 함수 요청시 마다 토큰 인증 로직을 만들어 적용하려고 하였습니다.
- 하지만 nextjs에서 제공하는 middleware에서 토큰 인증 후 만료된 토큰 재발급 로직, 토급 재발급 후 기존 요청 재실행 구현에 한계가 있었습니다.

>해결 방법
- middleware에서 토큰 인증 로직을 실행 하지 않고, 라우터 리다이렉트 처리만을 담당하게 하였습니다.
- 대신 토큰 인증이 필요한 api router마다 토큰 인증 로직이 포함 별도의 유틸 함수를 적용하여 인증이 처리되도록 구현하였습니다.
- axios intercetor를 이용하여 api 요청시 토큰 만료 에러 발생시 리프레쉬 토큰을 통해 엑세스 토큰을 재발급하고, 기존 요청을 실행하도록 하였습니다.

>해결 코드

<details>
<summary>코드 보기</summary>

**1 ) 인증 로직 유틸 함수** 
```javascript
export async function checkAuthorization(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { getIronSession } = await import("iron-session");
  const session = await getIronSession<IronSessionType>(
    req,
    res,
    sessionOptions
  );
  const accessToken = session.accessToken;

  const decodeAccessToken = await verifyToken(
    accessToken as string,
    process.env.NEXT_SECRET_ACCESS_TOKEN_KEY as string
  );

  if (!decodeAccessToken?.isValid) {
    return { isValid: false, message: "만료된 토큰이에요." };
  }

  const redisAccessToken = await getToken(
    decodeAccessToken?.data?.user.uid as string,
    "accessToken"
  );

  if (accessToken && accessToken !== redisAccessToken) {
    return { isValid: false, message: "만료된 토큰이에요." };
  } else {
    return {
      isValid: true,
      auth: decodeAccessToken.data?.user,
      message: "유효한 토큰이에요.",
    };
  }
}
```

<br>

**2 ) axios interceptor 설정**
```javascript
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;
const customAxios = axios.create({
  baseURL: BASE_URL,
});

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;
    if (isAxiosError<RegenerateAccessTokenResponseData>(error)) {
      if (
        error.response?.status === 401 &&
        error.response?.data.message === "만료된 토큰이에요."
      ) {
        try {
          const cookies = originalRequest?.headers["Cookie"];
          const response = await axios(`${BASE_URL}/api/auth/refreshToken`, {
            headers: {
              Cookie: cookies,
            },
          });
          const reposeCookies = response.headers["set-cookie"];
          if (reposeCookies) {
            originalRequest!.headers["Cookie"] = reposeCookies.join("; ");
          }
          if (originalRequest) return axios(originalRequest);
        } catch (refreshError) {
          if (isAxiosError<RegenerateAccessTokenResponseData>(refreshError)) {
            if (refreshError.response?.status === 401) {
              if (typeof window !== "undefined") {
                toast.warn("로그인이 만료됬어요.", {
                  autoClose: 3000,
                });
                window.location.replace("/signin");
              }
            }
            return Promise.reject(refreshError);
          }
        }
      }
    }

    return Promise.reject(error);
  }
);

export default customAxios;
``` 

</details>

<br>

#### 🖌 tailwindCSS 동적 스타일링 문제

> 문제 상황

- tailwindCSS에서 동적으로 스타일링 적용시 적용이 되지 않는 문제가 발생하였습니다.

> 문제 원인

- tailwindCSS는 유틸리티 기반의 CSS 프레임워크로, 기본적으로 정적 클래스 이름을 사용하기 때문에 동적으로 클래스명이 적용되지 않기 때문입니다.

> 해결 방법

- 동적으로 적용할 클래스명을 safelist에 미리 추가 설정하여 해결할 수 있었습니다.

> 해결 코드

<details>
<summary>코드보기</summary>

```javascript
  safelist: [
    "animate-slideOutRight",
    "animate-slideOutLeft",
    "animate-entering",
    "animate-leaving",
    "animate-slideFadeOutRight",
    "animate-bounceOpacity",
    "animate-slideUp",
    "animate-slideDown",
    "bg-red-400",
    "before:content-['판매완료']",
    "before:content-['거래중']",
    "before:text-3xl",
  ],

```

</details>

<br>

### 👀 구현 기능 미리보기 ( 제목 클릭 시 해당 기능 상세설명으로 이동됩니다. )
