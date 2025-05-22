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

- [📜 API Router 명세](#-api-router-명세)

- [⛓ 아키텍처](#-아키텍처)

- [💡 프레임워크 및 라이브러리 사용 이유](#-프레임워크-및-라이브러리-사용-이유)

- [🔨 리팩토링](#-리팩토링)

  - [🗜 bundle 사이즈 최적화](#-bundle-사이즈-최적화)
  - [🏭 query-key-factory 적용](#-query-key-factory-적용)
  - [🧩 customhook 패턴 로직 분리](#-customhook-패턴-로직-분리)
  - [⌨ 모달 및 드롭 다운 메뉴 키보드 최적화](#-모달-및-드롭-다운-메뉴-키보드-최적화)
  - [📱 모달 모바일 뒤로가기 버튼적용](#-모달-모바일-뒤로가기-버튼-적용)
  - [📤 App Router 마이그레이션](#-app-router-마이그레이션)
  - [🗃 폴더명 및 파일명 일관된 규칙 적용](#-폴더명-및-파일명-일관된-규칙-적용)
  - [🔄 redux-toolkit zustand로 전환](#-redux-toolkit-zustand로-전환)
  - [🚹 유저 정보 관리 로직 수정](#-유저-정보-관리-로직-수정)
  - [🔑 QueryKey 관리 개선](#-querykey-관리-개선)
  - [✨ Any 타입을 명확한 타입으로 전환](#-any-타입을-명확한-타입으로-전환)
  - [🗂 비동기 처리 컴포넌트 분리 및 Suspense Fallback UI 개선](#-비동기-처리-컴포넌트-분리-및-suspense-fallback-ui-개선)
  - [🔨 Next.js v15 마이그레이션](#-nextjs-v15-마이그레이션)
  - [🔧 react-infinite-scroller → react-intersection-observer로 대체](#-react-infinite-scroller--react-intersection-observer로-대체)
  - [🎈 page별 SkeletonUI Loading 컴포넌트 적용](#-page별-skeletonui-loading-컴포넌트-적용)
  - [💫 전역 로딩 컴포넌트 및 로딩 상태 추가](#-전역-로딩-컴포넌트-및-로딩-상태-추가)
  - [🎯 SRP 원칙에 따라 custom hook 코드 분리 및 hook명 수정](#-srp-원칙에-따라-custom-hook-코드-분리-및-hook명-수정)
  - [🔁 Zustand 이메일 인증 상태 Context API로 전환](#-zustand-이메일-인증-상태-context-api로-전환)
  - [🗂 도메인 디렉토리 구조 적용](#-도메인-디렉토리-구조-적용)

- [🔫 트러블 슈팅](#-트러블-슈팅)

  - [🍪 Client to SSR cookie 전달 문제](#-client-to-ssr-cookie-전달-문제)
  - [💫 Hydrate Redux state 초기화 문제](#-hydrate-redux-state-초기화-문제)
  - [🌍 vercel 배포 문제](#-vercel-배포-문제)
  - [❗ 504 Gateway Timeout Error](#-504-gateway-timeout-error)
  - [🗜 middleware 토큰 인증 로직 구현 문제](#-middleware-토큰-인증-로직-구현-문제)
  - [🖌 tailwindcss 동적 스타일링 문제](#-tailwindcss-동적-스타일링-문제)
  - [❌ 배포 후 Hydrate 불일치 문제](#-배포-후-hydrate-불일치-문제)
  - [🍪 SSR to Client cookie 전달 문제](#-ssr-to-client-cookie-전달-문제)
  - [🧨 CustomAxios acceessToken 재발급 중복 요청 문제](#-customaxios-accesstoken-재발급-중복-요청-문제) 
  - [🔴 Layout 컴포넌트 Invalid hook call 에러](#-layout-컴포넌트-invalid-hook-call-에러)
  - [🕳 로그아웃 시 빈 유저 정보가 페이지에 노출되는 문제](#-로그아웃-시-빈-유저-정보가-페이지에-노출되는-문제)

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

**개발 완료 : 2024. 06. 29**

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

![architecture](https://github.com/user-attachments/assets/72eb0d09-31de-416b-b931-42d743c5e684)

### 📜 API Router 명세

<details>
<summary>API 전체 엔드 포인트 보기</summary>

<br>

| 기능                    | 메서드 | 엔드포인트                                                                              |
| ----------------------- | ------ | --------------------------------------------------------------------------------------- |
| **유저(auth)**          |
| 로그인                  | POST   | /api/auth/signin                                                                        |
| Kakao 소셜 로그인       | POST   | /api/auth/signin/kakao                                                                  |
| Kakao 계정 데이터 조회  | POST   | /api/auth/signin/kakao/user                                                             |
| Google 소셜 로그인      | POST   | /api/auth/signin/google                                                                 |
| Google 계정 데이터 조회 | POST   | /api/auth/signin/google/user                                                            |
| 회원가입                | POST   | /api/auth/signup                                                                        |
| 이메일 중복 확인        | POST   | /api/auth/dulication/email                                                              |
| 닉네임 중복 확인        | POST   | /api/auth/dulication/nickname                                                           |
| 이메일 확인             | POST   | /api/auth/check-email                                                                   |
| 비밀번호 찾기/변경      | PATCH  | /api/auth/change-password                                                               |
| 이메일 인증 메일 전송   | POST   | /api/auth/send-verify-email                                                             |
| 이메일 인증             | POST   | /api/auth/verify-email                                                                  |
| 유저 인증               | GET    | /api/auth/user                                                                          |
| 세션 쿠키 확인          | GET    | /api/auth/session                                                                       |
| 토큰 재발급             | POST   | /api/auth/refresh-token                                                                 |
| 토큰 삭제               | DELETE | /api/auth/delete-token                                                                  |
| 로그아웃                | POST    | /api/auth/signout                                                                       |
| **프로필(profile)**     |
| 나의 프로필 조회        | GET    | /api/profile                                                                            |
| 프로필 수정             | PATCH  | /api/profile                                                                            |
| 프로필 팔로워 목록 조회 | POST   | /api/profile/followers?cursor={cursor}&limit={limit}                                    |
| 프로필 팔로잉 목록 조회 | POST   | /api/profile/followings                                                                 |
| 프로필 상품 목록 조회   | POST   | /api/profile/product?category={category}&limit={limit}&cursor={cursor}                  |
| 프로필 찜 목록 조회     | POST   | /api/profile/wish?cursor={cursor}&limit={limit}                                         |
| 유저 찜 목록 삭제       | DELETE | /api/profile/wish                                                                       |
| 유저 프로필 조회        | GET    | /api/:uid/profile                                                                       |
| 유저 팔로우             | POST   | /api/profile/:uid/follow                                                                |
| 유저 언팔로우           | POST   | /api/profile/:uid/follow                                                                |
| 유저 리뷰 목록 조회     | GET    | /api/profile/:uid/review                                                                |
| **상품(product)**       |
| 상품 조회               | GET    | /api/product                                                                            |
| 상품 검색               | GET    | /api/product/search?cursor={cursor}&limit={limit}&category={category}&keyword={keyword} |
| 오늘의 상품 조회        | GET    | /api/product/today?cursor={cursor}&limit={limit}                                        |
| 상품 업로드             | POST   | /api/product/upload                                                                     |
| 상품 상세               | GET    | /api/product/:produId                                                                   |
| 상품 수정               | PATCH  | /api/product/:produId                                                                   |
| 상품 삭제               | DELETE | /api/product/:produId                                                                   |
| 상품 구매               | GET    | /api/product/:productId/purchase                                                        |
| 상품 신고               | PATCH  | /api/product/:productId/report                                                          |
| 상품 리뷰 조회          | GET    | /api/product/:prodcutId/review                                                          |
| 상품 리뷰 작성          | POST   | /api/product/:productId/review                                                          |
| 상품 찜                 | PATCH  | /api/product/:productId/wish                                                            |
| 상품 찜해제             | DELETE | /api/product/:productId/wish                                                            |
| 상품 조회수 증가        | PATCH  | /api/product/:productId/view                                                            |
| 상품 구매 취소          | PATCH  | /api/product/:productId/purchase/cancel                                                 |
| 상품 구매 취소 철회     | PATCH  | /api/product/:productId/purchase/cancel/withdrawal                                      |
| 상품 인수 확인          | PATCH  | /api/product/:productId/purchase/product-receipt-confirmation                           |
| 상품 반품               | PATCH  | /api/product/:productId/purchase/return                                                 |
| 상품 반품 철회          | PATCH  | /api/product/:productId/purchase/return/withdrawal                                      |
| 상품 반품 전달 확인     | PATCH  | /api/product/:productId/purchase/return/delivery-confirmation                           |
| 상품 구매 요청 확인     | PATCH  | /api/product/:productId/sales/purchase-request-confirmation                             |
| 상품 구매 요청 거절     | PATCH  | /api/product/:productId/sales/purchase-request-reject                                   |
| 상품 전달 확인          | PATCH  | /api/product/:productId/sales/delivery-confirmation                                     |
| 상품 취소 요청 확인     | PATCH  | /api/product/:productId/sales/cancel-comfirmation                                       |
| 상품 취소 요청 거절     | PATCH  | /api/product /:productId/sales/cancel-reject                                            |
| 상품 반품 요청 확인     | PATCH  | /api/product/:productId/sales/return-confirmation                                       |
| 상품 반품 요청 거절     | PATCH  | /api/product/:productId/sales/return-reject                                             |
| **거래 정보(trading)**  |
| 판매 거래 정보 조회     | GET    | /api/trading/sales?cursor={cursor}&limit={limt}&status={status}&search={search}         |
| 구매 거래 정보 조회     | GET    | /api/trading/purchase?cursor={cursor}&limit={limt}&status={status}&search={search}      |
| **채팅(chat)**          |
| 채팅방 조회             | POST   | /api/chat                                                                               |
| 채팅방 삭제             | DELETE | /api/chat/:chatRoomId                                                                   |
| 채팅방 입장             | PATCH  | /api/chat/:chatRoomId/join                                                              |
| 채팅방 퇴장             | PATCH  | /api/chat/:chatRoomId/exit                                                              |
| 채팅방 나가기           | PATCH  | /api/chat/:chatRoomId/leave                                                             |
| 채팅방 메세지 전송      | POST   | /api/chat/:chatRoomId/message                                                           |
| **알림(notification)**  |
| 알림 메세지 조회        | GET    | /api/notification                                                                       |
| 알림 메세지 전체 삭제   | DELETE | /api/notification                                                                       |
| 알림 메세지 전체 읽음   | PATCH  | /api/notification                                                                       |
| 알림 메세지 삭제        | DELETE | /api/notification/:messageId                                                            |
| 알림 메세지 읽음        | PATCH  | /api/notification /:messageId                                                           |

</details>

[👉 API Router 상세 명세 보기](https://github.com/NamJongtae/ITtem/wiki/API-Router-%EB%AA%85%EC%84%B8)

<br>

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

#### Zustand

- **전역 상태 관리**: 전역 상태 관리를 위한 강력한 도구로, 일반 Redux보다 사용이 간편하고 가벼움.
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

### 🔨 리팩토링

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

#### 📤 App Router 마이그레이션

> **적용이유**

- App Router 마이그레이션을 통해 `Server Component`를 사용하여 **bundle size 감소**및 **초기 로딩 속도 개선**을 위해 적용하였습니다.
- `Streaming SSR`, `Suspense` 기능을 통해 UX을 향상시키고자 적용하였습니다.
- **parallel routes & interceptor routes**를 이용하여 모달창을 구현하여 **UX 및 SEO 향상**을 위해 적용하였습니다.

<br>

> **적용으로 얻은 이점**

- 전체적인 번들 사이즈가 감소하였으며, 공통 번들 사이즈가 **340MB에서 84.8MB로 약 76% 감소**하였습니다.
- `Streaming SSR`, `Suspnse` 기능으로 SSR이 진행되는 동안 fallback UI를 표시할 수 있어 UX가 향상되었습니다.
- **parallel routes & interceptor routes**를 이용하여 모달창을 구현하여 **UX 및 SEO 향상**되었으며, 별도로 모바일의 뒤로가기 구현이 필요없어졌습니다.

<br>

**1 ) 번들 사이즈 분석 결과**

<details>
<summary>분석 결과 보기</summary>
  
<br>
  
| Route                                                   | Size   | First Load JS |
|---------------------------------------------------------|--------|---------------|
| ○ /                                                     | 4.36 kB | 186 kB        |
| ├ ○ /_not-found                                         | 0 B    | 0 B           |
| ├ ○ /(.)signin                                          | 533 B  | 163 kB        |
| ├ λ /api/auth/changePassword                            | 0 B    | 0 B           |
| ├ λ /api/auth/checkEmail                                | 0 B    | 0 B           |
| ├ λ /api/auth/deleteToken                               | 0 B    | 0 B           |
| ├ λ /api/auth/duplication/email                         | 0 B    | 0 B           |
| ├ λ /api/auth/duplication/nickname                      | 0 B    | 0 B           |
| ├ λ /api/auth/refreshToken                              | 0 B    | 0 B           |
| ├ λ /api/auth/sendVerifyEmail                           | 0 B    | 0 B           |
| ├ λ /api/auth/session                                   | 0 B    | 0 B           |
| ├ λ /api/auth/signin                                    | 0 B    | 0 B           |
| ├ λ /api/auth/signin/google                             | 0 B    | 0 B           |
| ├ λ /api/auth/signin/google/user                        | 0 B    | 0 B           |
| ├ λ /api/auth/signin/kakao                              | 0 B    | 0 B           |
| ├ λ /api/auth/signin/kakao/user                         | 0 B    | 0 B           |
| ├ λ /api/auth/signout                                   | 0 B    | 0 B           |
| ├ λ /api/auth/signup                                    | 0 B    | 0 B           |
| ├ λ /api/auth/user                                      | 0 B    | 0 B           |
| ├ λ /api/auth/verifyEmail                               | 0 B    | 0 B           |
| ├ λ /api/chat                                           | 0 B    | 0 B           |
| ├ λ /api/chat/[chatRoomId]                              | 0 B    | 0 B           |
| ├ λ /api/chat/[chatRoomId]/exit                         | 0 B    | 0 B           |
| ├ λ /api/chat/[chatRoomId]/join                         | 0 B    | 0 B           |
| ├ λ /api/chat/[chatRoomId]/leave                        | 0 B    | 0 B           |
| ├ λ /api/chat/[chatRoomId]/message                      | 0 B    | 0 B           |
| ├ λ /api/notification                                   | 0 B    | 0 B           |
| ├ λ /api/notification/[messageId]                       | 0 B    | 0 B           |
| ├ λ /api/product                                        | 0 B    | 0 B           |
| ├ λ /api/product/[productId]                            | 0 B    | 0 B           |
| ├ λ /api/product/[productId]/purchase                   | 0 B    | 0 B           |
| ├ λ /api/product/[productId]/report                     | 0 B    | 0 B           |
| ├ λ /api/product/[productId]/review                     | 0 B    | 0 B           |
| ├ λ /api/product/[productId]/view                       | 0 B    | 0 B           |
| ├ λ /api/product/[productId]/wish                       | 0 B    | 0 B           |
| ├ λ /api/product/search                                 | 0 B    | 0 B           |
| ├ λ /api/product/today                                  | 0 B    | 0 B           |
| ├ λ /api/product/upload                                 | 0 B    | 0 B           |
| ├ λ /api/profile                                        | 0 B    | 0 B           |
| ├ λ /api/profile/[uid]                                  | 0 B    | 0 B           |
| ├ λ /api/profile/[uid]/follow                           | 0 B    | 0 B           |
| ├ λ /api/profile/[uid]/review                           | 0 B    | 0 B           |
| ├ λ /api/profile/followers                              | 0 B    | 0 B           |
| ├ λ /api/profile/followings                             | 0 B    | 0 B           |
| ├ λ /api/profile/product                                | 0 B    | 0 B           |
| ├ λ /api/profile/wish                                   | 0 B    | 0 B           |
| ├ λ /api/trading/purchase                               | 0 B    | 0 B           |
| ├ λ /api/trading/purchase/[productId]/cancel            | 0 B    | 0 B           |
| ├ λ /api/trading/purchase/[productId]/cancel/withdrawal | 0 B    | 0 B           |
| ├ λ /api/trading/purchase/[productId]/product-receipt-confirmation | 0 B | 0 B |
| ├ λ /api/trading/purchase/[productId]/return            | 0 B    | 0 B           |
| ├ λ /api/trading/purchase/[productId]/return/delivery-confirmation | 0 B | 0 B |
| ├ λ /api/trading/purchase/[productId]/return/withdrawal | 0 B    | 0 B           |
| ├ λ /api/trading/sales                                  | 0 B    | 0 B           |
| ├ λ /api/trading/sales/[productId]/cancel-comfirmation  | 0 B    | 0 B           |
| ├ λ /api/trading/sales/[productId]/cancel-reject        | 0 B    | 0 B           |
| ├ λ /api/trading/sales/[productId]/delivery-confirmation| 0 B    | 0 B           |
| ├ λ /api/trading/sales/[productId]/purchase-request-confirmation | 0 B | 0 B |
| ├ λ /api/trading/sales/[productId]/purchase-request-reject | 0 B  | 0 B           |
| ├ λ /api/trading/sales/[productId]/return-confirmation  | 0 B    | 0 B           |
| ├ λ /api/trading/sales/[productId]/return-receipt-confirmation | 0 B | 0 B |
| ├ λ /api/trading/sales/[productId]/return-reject        | 0 B    | 0 B           |
| ├ ○ /chat                                               | 2.48 kB | 149 kB        |
| ├ λ /chat/[chatRoomId]                                  | 25.9 kB| 184 kB        |
| ├ ○ /findpassword                                       | 2.19 kB | 154 kB        |
| ├ λ /product                                            | 4.46 kB | 198 kB        |
| ├ λ /product/[productId]                                | 12 kB   | 199 kB        |
| ├ λ /product/[productId]/edit                           | 178 B  | 210 kB        |
| ├ λ /product/manage                                     | 12.4 kB| 173 kB        |
| ├ ○ /product/upload                                     | 176 B  | 210 kB        |
| ├ λ /profile                                            | 2.47 kB | 195 kB        |
| ├ ○ /profile/(.)edit                                    | 1.07 kB | 166 kB        |
| ├ ○ /profile/(.)passwordChange                          | 491 B  | 149 kB        |
| ├ λ /profile/[uid]                                      | 226 B  | 193 kB        |
| ├ λ /profile/edit                                       | 3.93 kB | 169 kB        |
| ├ ○ /profile/passwordChange                             | 188 B  | 149 kB        |
| ├ λ /search/product                                     | 3.34 kB | 189 kB        |
| ├ ○ /signin                                             | 199 B  | 163 kB        |
| ├ ○ /signin/google                                      | 3.09 kB | 138 kB        |
| ├ ○ /signin/kakao                                       | 3.01 kB | 138 kB        |
| └ ○ /signup                                             | 4.59 kB | 161 kB        |
| **First Load JS shared by all**                         |        | 84.8 kB       |
| ├ chunks/8069-edc8d10e59d09018.js                       | 29 kB  |               |
| ├ chunks/fd9d1056-47f05366a5e29db8.js                   | 53.4 kB|               |
| └ other shared chunks (total)                           |        | 2.33 kB        |
| **Middleware**                                          |        | 99.1 kB       |
| ○ (Static)                                               |        |               |
| λ (Dynamic)                                              |        |               |

<br>

</details>

<br>

**2 ) Streaming SSR, Suspense 적용**

상품 목록 첫 페이지를 SSR로 prefetching 하고, `Streaming SSR`과 `Suspense`를 통해 fallback Loading UI를 표시합니다.

<details>
<summary>코드보기</summary>

<br>

```javascript
// app/product/page.tsx

import ProductPage from "@/components/product/product-page";
import { queryKeys } from "@/queryKeys";
import { ProductCategory } from "@/types/productTypes";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Loading from '../loading';
import { Suspense } from 'react';

async function prefetchProductList({
  category = ProductCategory.전체,
  queryClient,
}: {
  category: ProductCategory;
  queryClient: QueryClient;
}) {
  const queryKeyConfig = queryKeys.product.list({
    produdctCategory: category || ProductCategory.전체,
  });
  await queryClient.prefetchInfiniteQuery({
    queryKey: queryKeyConfig.queryKey,
    queryFn: queryKeyConfig.queryFn,
    initialPageParam: null,
  });
}

export default async function Product({
  searchParams,
}: {
  searchParams: { category: string | undefined };
}) {
  const queryClient = new QueryClient();
  const category = searchParams.category || null;

  await prefetchProductList({
    category: category as ProductCategory,
    queryClient,
  });

  return (
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductPage />
      </HydrationBoundary>
    </Suspense>
  );
}
```

</details>

<br>

**3 ) parallel routes & interceptor routes 모달 적용**

로그인 페이지를 **parallel routes & interceptor routes**를 통해 모달창으로 구현합니다.

<details>
<summary>코드보기</summary>

<br>

**parallerl routes default.tsx** : 새로고침시 parallerl routes가 사용되지 않는 경우 unmatched route 오류 해결을 위해 사용합니다.

```javascript
// /app/@sign/default.tsx

export default function SigninModalDefault() {
  return null;
}
```

<br>

**interceptor routes page.tsx** : signin 경로를 대신할 페이지 RootLayout에 레이아웃을 공유하여, 로그인 모달창이 나타나도록합니다.

```javascript
// /app/@sign/(.)signin/page.tsx

import SigninModal from "@/components/signin/modal/signin-modal";

export default function Modal() {
  return <SigninModal />;
}
```

<br>

**RootLayout.tsx** : 루트 레이아웃에 signin 모달창을 공유합니다.

```javascript
// /app/layout.tsx
//                             •
//                             •
//                           (생략)
//                             •
//                             •

export default async function RootLayout({
  children,
  signin,
}: Readonly<{
  children: React.ReactNode;
  signin: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ReduxProvider>
          <ReactQueryProvider>
            <Suspense fallback={<Loading />}>
              <Layout>
                {signin}
                <main className={"flex-grow mt-[113px] md:mt-[127px]"}>
                  {children}
                </main>

                <ToastContainer
                  position="top-center"
                  limit={1}
                  closeOnClick={true}
                  closeButton={true}
                  pauseOnHover={false}
                  draggable={true}
                  autoClose={2000}
                  pauseOnFocusLoss={false}
                  theme="light"
                  hideProgressBar={true}
                />
              </Layout>
            </Suspense>
          </ReactQueryProvider>
        </ReduxProvider>
        <div id="portal-root"></div>
      </body>
    </html>
  );
}
```

</details>

<br>

#### 🗃 폴더명 및 파일명 일관된 규칙 적용

> **적용이유**

- 폴더명 및 파일명이 일관성 없이 적용되지 않아, 유지 보수와 가독성이 저하되며 프로젝트 구조를 이해하는 데 어려움이 있습니다. 이를 개선하기 위해 일관된 명명 규칙을 적용했습니다.

> **적용 방법**

- 폴더명 및 파일명에 일정한 규칙을 정하여 이를 토대로 폴더명 및 파일명을 수정하였습니다.
- 폴더명과 파일명 모두 케밥 케이스를 사용하여 명명합니다.
- 폴더 하위의 파일의 이름의 경우 구분할 수 있도록 상위 폴더명을 prefix에 포함시켜 명명합니다.
- 파일명 prefix는 상위 폴더가 여러개 일시 가장 가까운 폴더명을 prefix에 포함시키되 파일명이 중복되거나 중복될 여지가 있는 파일명의 경우 그 상위 폴더명의 prefix도 추가로 포함시키도록 명명합니다.
- 폴더 안에 파일이 많은 경우 새로운 하위 폴더를 생성하여 분리합니다.
- hook, DB model, 라이브러리 구현 함수, Provider의 경우 예외적으로 카멜 케이스를 사용하여 파일명을 명명합니다.

> **적용으로 얻은 이점**

- 폴더명 및 파일명을 일관된 규칙으로 관리하여 유지 보수 측면이 향상 되었으며, 폴더 구조 파악이 쉬워졌습니다.

<br>

#### 🔄 redux-toolkit zustand로 전환

> **적용이유**

- 기존 전역 상태관리를 Redux-toolkit를 이용해 관리했습니다. Redux-toolkit의 복잡한 기능들을 활용할 필요없이 단순히 전역 상태관리만 하면 되기 때문에 Redux-toolkit 사용이 불필요하다고 생각하였습니다. 그래서 Redux-toolkit 보다 가볍고, 간결한 Zustand를 적용하게되었습니다.

> **적용 방법**

- 기존 Redux-toolkit slice 대신 각 Zustand store를 생성하여 전역상태를 관리하도록 하였습니다.
- 기존 Redux-toolkit reducers은 Zustand store에 actions 객체에 넣어 생성하였습니다.

> **적용으로 얻은 이점**

- 기존 Redux-toolkit에 비해 적은 용량으로 번들 크기를 줄일 수 있었습니다.
- 복잡하게 Provider, slice, reducer를 생성하지 않아도 되어 사용하기 쉽고 간편해졌습니다.

> **적용 코드**

<details>
<summary>코드보기</summary>

<br>

**auth-store.ts**

```javascript
import { AuthData } from "@/types/auth-types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface AuthState {
  user: AuthData | null;
  isLoading: boolean;
  actions: {
    setAuth: (user: AuthData) => void;
    resetAuth: () => void;
    setIsLoading: (isLoading: boolean) => void;
  };
}

const isClient = typeof window !== "undefined";

export const store = (set: any): AuthState => ({
  user: null,
  isLoading: true,
  actions: {
    setAuth: (user: AuthData) => {
      set((state: AuthState) => {
        state.user = user;
      }, false, "user/setAuth");
      if (isClient) {
        localStorage.setItem("uid", JSON.stringify(user.uid));
      }
    },
    resetAuth: () => {
      set((state: AuthState) => {
        state.user = null;
      }, false, "user/resetAuth");
      if (isClient) {
        localStorage.removeItem("uid");
      }
    },
    setIsLoading: (isLoading: boolean) => {
      set((state: AuthState) => {
        state.isLoading = isLoading;
      }, false, "user/setIsLoading");
    },
  },
});

const useAuthStore = create<AuthState>()(
  immer(process.env.NODE_ENV !== "production" ? devtools(store) : store)
);

export default useAuthStore;
```

</details>

<br>

#### 🚹 유저 정보 관리 로직 수정

> **적용이유**

- layout 헤더에서 tanstack-query(서버 상태 관리)와 zustand(전역 상태 관리)를 사용하여 유저 정보를 관리하고 있었습니다. 기존 로직에서 페이지 전환시 마다 유저 정보를 갱신하여 너무 자주 유저 정보를 갱신하여 불필요한 요청이 발생하였습니다.

> **적용 방법**

- 로그인시 최초 한 번 유저 정보를 저장하고, 이후 부터 저장된 데이터를 사용하도록 변경하였습니다.
- tanstack-query의 enable 옵션을 false로 설정하고, staleTime을 Infinity로 두고, 최초 로그인시 유저 데이터를 저장하도록 하였습니다.
- 이를 통해 최초 로그인시에만 유저 데이터가 저장되도록 하였고, 이후 로그인이 된 상태에서만 유저 정보를 저장하도록 하기 위해 세션 쿠키를 불러와 세션 쿠키가 존재한다면 유저 정보를 refetch 하도록 하였습니다.
  
> **적용으로 얻은 이점**

- 페이지 전환 마다 유저 정보를 갱신하지 않아 불필요한 요청이 발생하지 않게되었습니다.

> **적용 코드**

<details>
<summary>코드보기</summary>

<br>

**useAuthQuery.tsx**

```javascript
import { queryKeys } from "@/query-keys/query-keys";
import useAuthStore from "@/store/auth-store";
import { useQuery } from "@tanstack/react-query";

export default function useAuthQuery() {
  const loading = useAuthStore((state) => state.isLoading);

  // 유저를 한 번만 저장하고 이후 캐싱 값 사용 => staleTime: Infinity, enabled: false
  const {
    data: user,
    isLoading,
    error: authError,
    refetch: refetchAuth
  } = useQuery({
    ...queryKeys.auth.info,
    retry: 0,
    staleTime: Infinity,
    enabled: false
  });

  const authIsLoading = loading || isLoading;

  return { user, authIsLoading, authError, refetchAuth };
}
```

**useAuth.tsx**

```javascript
//...
  useEffect(() => {
    if (
      sessionQueryIsSuccess &&
      pathname !== "/refresh-token" &&
      pathname !== "/session-expired"
    ) {
      // 세션 쿠키가 존재할 때 유저 refetch
      if (isExistSession) {
        refetchAuth();
      } else {
        actions.resetAuth();
      }
      actions.setIsLoading(false);
    }
  }, [isExistSession, sessionQueryIsSuccess, pathname, actions, refetchAuth]);
```
//...
</details>

<br>

#### 🔑 QueryKey 관리 개선

> **적용이유**

- 현재 queryKey 관리를 일관성 있지 않고 상품 목록 queryKey 설정에서 삼항 연산자를 이용하여 동적으로 쿼리키를 적용하도록 하여 가독성이 떨어졌습니다.
- 라이브러리 타입을 제대로 파악하지 못하여 queryKey 중 다수에 any 타입을 사용하였습니다. 이는 타입 안전성을 해칠수 있어 수정이 필요했습니다.

> **적용 방법**

- 상품 목록 queryKey를 삼항연산자를 사용하여 동적으로 쿼리키를 지정하지 않고, 각 상품 목록 queryKey를 독립적으로 만들어서 관리하도록 수정하여 가독성을 향상시켰습니다.
- 동적 queryKey와 정적 queryKey 타입에 차이가 존재하며, 동적 queryKey에는 쿼리키가 동적으로 계산되어 하위 키로 빈 배열이 사용될 수 있지만 정적 queryKey는 Tuple 타입을 가져 하나 이상의 배열 키값을 가져야한다는 것을 파악하였습니다. 이를 참고하여 빈 배열인 queryKey를 채우고 쿼리키 타입을 any 타입에서 읽기전용 타입인 const 타입으로 수정하였습니다.
  
> **적용으로 얻은 이점**

- 상품 목록 queryKey 관리 부분의 가독성이 향상 되었으며, 타입 안정성이 향상 되었습니다.

> **적용 코드**

<details>
<summary>코드보기</summary>

<br>

**query-keys.ts**

```javascript
//...
export const productQueryKey = createQueryKeys("product", {
  today: (limit: number = 10) => ({
    queryKey: ["list"] as const,
    queryFn: async ({ pageParam }) => {
      const response = await getTodayProductList(pageParam, limit);
      return response.data.products;
    }
  }),
  category: ({
    category,
    location,
    limit = 10
  }: {
    category: ProductCategory;
    location?: string;
    limit?: number;
  }) => ({
    queryKey: (() => {
      if (location) {
        return [category, location, "list"] as const;
      }
      return [category, "list"] as const;
    })(),
    queryFn: async ({ pageParam }) => {
      const response = await getCategoryProductList({
        category,
        location,
        limit,
        cursor: pageParam
      });
      return response.data.products;
    }
  }),
  search: ({
    keyword,
    category = ProductCategory.전체,
    limit = 10
  }: {
    keyword?: string;
    category?: ProductCategory;
    limit?: number;
  }) => ({
    queryKey: [keyword, category] as const,
    queryFn: async ({ pageParam }) => {
      const response = await getSearchProductList({
        category,
        cursor: pageParam,
        limit,
        keyword: (keyword as string) || ""
      });
      return response.data.products;
    }
  }),
  detail: (productId: string) => ({
    queryKey: [productId] as const,
    queryFn: async () => {
      const response = await getProduct(productId);
      return response.data.product;
    }
  }),
  review: (productId: string) => ({
    queryKey: [productId] as const,
    queryFn: async () => {
      const response = await getReview(productId);
      return response.data.review;
    }
  }),
  manage: ({
    currentMenu,
    status,
    search,
    menu,
    limit = 10
  }: {
    currentMenu: "sale" | "purchase";
    status: string;
    search: string | undefined;
    menu: ProductManageMenu;
    limit?: number;
  }) => ({
    queryKey: [currentMenu, status, search] as const,
    queryFn: async ({ pageParam }) => {
      if (menu === "판매") {
        const response = await getSalesTrading({
          status,
          cursor: pageParam,
          search,
          limit
        });
        return response.data.saleTrading;
      } else {
        const response = await getPurchaseTrading({
          status,
          cursor: pageParam,
          search,
          limit
        });
        return response.data.purchaseTrading;
      }
    }
  })
});
// ...
```
</details>

<br>

#### ✨ Any 타입을 명확한 타입으로 전환

> **적용이유**

- 라이브러리의 타입 정의를 명확히 파악하지 못한 채 any 타입을 사용한 코드가 포함되어 있었고, 이로 인해 타입 안정성과 예측 가능성이 떨어질 수 있었습니다.

> **적용 방법**

- 라이브러리에서 제공하는 공식 타입 정의를 참고하여, any를 제거하고 정확한 타입으로 대체하였습니다. 이를 통해 타입 안정성을 높였습니다.
  
> **적용으로 얻은 이점**

- 타입 안정성이 향상 되었습니다.

> **적용 코드**

<details>
<summary>코드보기</summary>

<br>

**zustand.d.ts**

immer + devtools 미들웨어 적용 유틸 타입을 정의합니다.

```javascript
import { StateCreator } from "zustand";

declare module "zustand" {
  type ImmerDevtoolsStateCreator<T> = StateCreator<
    T,
    [["zustand/immer", never], ["zustand/devtools", never]]
  >;
}
```

**authStore.ts**

ImmerDevtoolsStateCreator 유틸 타입 적용, 유틸 타입 적용 따른 devtool 적용 방식을 수정합니다.

```javascript
//...
export const store: ImmerDevtoolsStateCreator<AuthState> = (set) => ({
  //...
});

const useAuthStore =
  process.env.NODE_ENV !== "production"
    ? create<AuthState>()(devtools(immer(store)))
    : create<AuthState>()(immer(store));
```

</details>

<br/>

####  🗂 비동기 처리 컴포넌트 분리 및 Suspense Fallback UI 개선
> **적용이유**

- 현재 일부 페이지에서는 비동기 데이터를 최상위에서 처리하고 있어, 데이터가 로딩되기 전까지 전체 페이지가 로딩 상태로 표시됩니다.
- 이를 개선하기 위해 비동기 데이터가 필요한 컴포넌트만 별도로 분리하고, 필요 없는 UI는 먼저 렌더링되도록 구성합니다.
- 현재 일부 비동기 컴포넌트 로딩 시, 단순한 Loading 컴포넌트를 표시하고 있습니다. 이는 실제 콘텐츠의 형태를 예측하기 어렵습니다. 이를 Skeleton UI로 교체하여 로딩 중에도 레이아웃이 유지되고, 사용자가 콘텐츠를 더 빠르게 인식할 수 있습니다.

> **적용 방법**

- 비동기 컴포넌트를 분리합니다.
- Suspense Fallback UI를 Skeleton UI로 교체합니다.
  
> **적용으로 얻은 이점**

- SSR 페이지의 초기 렌더링 속도가 향상되었습니다.
- UX가 향상되었습니다.

> **적용 코드**

<details>
<summary>코드보기</summary>

<br>

**ProductDetailContiner.tsx**

ProductDetailContainer 컴포넌트를 생성하여 비동기 처리를 분리하였습니다.

```javascript
//...
export default async function ProductDetailContainer({
  params
}: {
  params: { productId: string | undefined };
}) {
  const myProfileQueryKeyConfig = queryKeys.profile.my;
  const queryClient = new QueryClient();
  const productId = params?.productId;

  if (productId) {
    await incrementViewCount(productId);
    await Promise.all([
      fetchProductData({ productId, queryClient }),
      queryClient.fetchQuery({
        queryKey: myProfileQueryKeyConfig.queryKey,
        queryFn: fetchProfileData
      })
    ]);
  }
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailPage />
    </HydrationBoundary>
  );
}
//...
```

**Prouct Detail page**

ProductDetailSkeletonUI 컴포넌트를 생성하고, ProductDetailContainer 비동기 컴포넌트 Suspense Fallback에 SkeletonUI 적용하였습니다.
```javascript
//...
export default async function ProductDetail({
  params
}: {
  params: { productId: string | undefined };
}) {
  return (
    <>
      <Suspense
        fallback={<ProductDetailSkeletonUI userUid={params.productId} />}
      >
        <ProductDetailContainer params={params} />
      </Suspense>
    </>
  );
}
```

</details>

> **적용 전 후 UI 비교**

**적용 전**

<div align="center">
  <img src="https://github.com/user-attachments/assets/76b51059-3d05-4383-953b-b9215e339260"/>
</div>

**적용 후**

<div align="center">
  <img src="https://github.com/user-attachments/assets/3542c5ef-0fb2-4ffb-87c8-9a9a5187f4d3"/>
</div>

<br/>

#### 🔨 Next.js v15 마이그레이션
> **적용이유**

- 개발 편의성 향상과 보안 취약점 해결을 위해 Next.js v15로 마이그레이션을 진행했습니다.

> **적용 방법**

- Next.js 공식 마이그레이션 가이드를 참고하여 주요 변경 사항을 반영하였습니다.
- TurboPack 설정을 적용하고, React 19 및 기타 종속성 업데이트를 함께 진행하였습니다.
  
> **적용으로 얻은 이점**

- 안정적인 TurboPack 사용으로 개발 서버 구동 속도가 향상되고, 번들링 시간이 대폭 단축되었습니다.
- Hydration Error 메시지가 구체적으로 개선되어, 문제 발생 시 디버깅이 훨씬 수월해졌습니다.
- 보안 취약점이 해결되었습니다.

<br/>

#### 🔧 `react-infinite-scroller` → `react-intersection-observer`로 대체
> **적용이유**

- React 19 버전 업데이트 이후 종속성 충돌 문제가 발생하여, React 19를 지원하지 않는 `react-infinite-scroller` 라이브러리를 `react-intersection-observer`로 대체합니다.

> **적용 방법**

- useInfiniteScrollObserver 훅을 생성하여 관찰 대상 감지합니다.
- InfiniteScrollTarget 컴포넌트로 관찰 대상 설정합니다.
- 관찰 대상이 뷰포트(Viewport) 내에 진입할 경우, 다음 페이지 데이터를 비동기로 가져옵니다.
- InfiniteScrollEndMessage 컴포넌트로 마지막 데이터 도달 시 메시지 출력합니다.
  
> **적용으로 얻은 이점**

- React 19 버전 업데이트 이후 종속성 충돌 문제가 해결되었습니다.

> **적용 코드**

<details>
<summary>코드보기</summary>

<br/>

**useInfiniteScrollObserver.ts**

```javascript
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface IParams {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  threshold?: number;
}

export default function useInfiniteScrollObserver({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  threshold = 0.8
}: IParams) {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  return { ref };
}

```

**InfiniteScrollTarget.tsx**

```tsx
import React, { forwardRef } from "react";

const InfiniteScrollTarget = forwardRef<
  HTMLDivElement | null,
  { hasNextPage: boolean }
>(({ hasNextPage }, ref) => {
  return hasNextPage ? (
    <li>
      <div ref={ref} className="h-10" />
    </li>
  ) : null;
});

InfiniteScrollTarget.displayName = "InfiniteScrollTarget";

export default InfiniteScrollTarget;

```

**InfiniteScrollEndMessage.tsx**

```tsx
import React from "react";

export default function InfiniteScrollEndMessage({
  hasNextPage,
  data,
  message = "더 이상 데이터가 존재하지 않습니다."
}: {
  hasNextPage: boolean;
  data: unknown[] | undefined;
  message?: string;
}) {
  return data && data.length > 0 && !hasNextPage ? (
    <div className="flex justify-center items-center my-8 border-b mx-8">
      <p className="absolute text-center text-xs sm:text-sm text-gray-400 bg-white px-4 sm:px-8">
        {message}
      </p>
    </div>
  ) : null;
}

```

</details>

<br/>

#### 🎈 page별 SkeletonUI Loading 컴포넌트 적용
> **적용이유**

- 현재 페이지별 Loading 컴포넌트가 동일하고, Loading 컴포넌트가 전체 페이지 UX가 일치하지 않아 사용자가 UI 형태를 미리 볼 수 없어 UX 개선이 필요하다고 생각되어 Loading 컴포넌트를 Skeleton UI로 생성하였습니다.

> **적용 방법**

아래 페이지들에 SkeletonUI Loading 컴포넌트를 생성하였습니다.
  - home 페이지 Skeleton UI 생성
  - Product 페이지 Skeleton UI 생성
  - Product Serach 페이지 Skeleton UI 생성
  - Product manage 페이지 Skeleton UI 생성
  - Product Upload/Edit 페이지 Skeleton UI 생성
  - Product Detail 페이지 Skeleton UI 생성
  - Profile 페이지 Skeleton UI 생성
  - Chat 페이지 Skeleton UI 생성
  - Chat Detail 페이지 Skeleton UI 생성
  
> **적용으로 얻은 이점**

- 사용자에게 페이지 UI 형태를 빠르게 보여 줄 수 있어 UX가 개선됩니다.
- 사용자가 느끼는 로딩 시간이 단축됩니다.

> **적용 전 후 UI 비교**

**적용 전**

<div align="center">
  <img src="https://github.com/user-attachments/assets/ddc5ccb1-5a3d-4ef2-80e2-77191a8e8380"/>
</div>

**적용 후**

<div align="center">
  <img src="https://github.com/user-attachments/assets/ac5d96ba-acb3-4be3-984e-da4ae782f17a"/>
</div>

<br/>


#### 💫 전역 로딩 컴포넌트 및 로딩 상태 추가
> **적용이유**

- 기존 비동기 작업 중 Loading 컴포넌트는 페이지 하위에서 렌더링되기 때문에 레이아웃 컴포넌트를 포함하지 않아, 로딩 중에도 레이아웃이 노출되는 문제가 있었습니다.
- 이로 인해 사용자가 로딩 중에 레이아웃과 상호작용하거나 다른 페이지로 이동할 수 있어 예기치 않은 문제 발생 가능성이 존재했습니다.

> **적용 방법**
- 전역 로딩 컴포넌트를 생성하여 root layout 컴포넌트에 추가하였습니다.
- 로딩 상태 관리는 Zustand를 사용하여 전역에서 일관성 있게 제어합니다.
- 전역 로딩 상태가 필요한 경우 useMutation 내부에서 전역 로딩 상태를 제어합니다.

**❓ Zustand를 사용하는 이유**

로딩 상태는 여러 곳에서 빈번하게 발생하므로, Context API를 사용할 경우 많은 컴포넌트가 구독하고 있어 전체 리렌더링이 발생할 수 있습니다.
Zustand는 상태를 사용하는 컴포넌트만 리렌더링되므로 성능 최적화에 유리합니다.
설정이 간단하며, 전역 상태를 빠르게 도입할 수 있다는 장점이 있습니다.

**🏁 Race Condition 문제 해결하기**

useMutation 내부에서 전역 로딩상태를 관리하게 되면 한 페이지 내에서 useMutation이 동시에 여러개 실행되면 race Condition 문제가 발생할 수 있습니다.
아래와 같은 상황에서 문제가 발생합니다:

- mutation A 실행 → loading = true
- mutation B 실행 → loading = true
- mutation A 완료 → loading = false ❌ ← 이 시점엔 B가 아직 안 끝났는데 로딩이 꺼져버림
- mutation B 완료 → 원래 이때 loading = false가 되어야 정상

이를 해결하기 위해 loading count를 도입하여 count가 1 이상이면 loading 상태를 유지 하도록합니다.

- mutation A 실행 → loading = true ← count = 1
- mutation B 실행 → loading = true ← count = 2
- mutation A 완료 → loading = false ← count = 1
- mutation B 완료 → count = 0 → loading = false

> **적용으로 얻은 이점**

- 비동기 작업 중 레이아웃 노출을 방지하여 사용자 혼란을 줄이고, 예기치 않은 행동을 예방할 수 있습니다.

> **적용 코드**

<details>
<summary>코드보기</summary>

<br/>

**global-loading-store.ts**

```javascript
import { create, ImmerDevtoolsStateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface LoadingState {
  isLoading: boolean;
  loadingCount: number;
  actions: {
    startLoading: () => void;
    stopLoading: () => void;
  };
}

export const store: ImmerDevtoolsStateCreator<LoadingState> = (set) => ({
  isLoading: false,
  loadingCount: 0,
  actions: {
    startLoading: () => {
      set(
        (state: LoadingState) => {
          state.loadingCount++;
          state.isLoading = true;
        },
        false,
        "loading/startLoading"
      );
    },
    stopLoading: () => {
      set(
        (state: LoadingState) => {
          state.loadingCount = Math.max(0, state.loadingCount - 1);
          state.isLoading = state.loadingCount > 0;
        },
        false,
        "loading/stopLoading"
      );
    }
  }
});

const useGlobalLoadingStore =
  process.env.NODE_ENV !== "production"
    ? create<LoadingState>()(immer(devtools(store)))
    : create<LoadingState>()(immer(store));

export default useGlobalLoadingStore;
```

**GlobalLoading.tsx**

```javascript
"use client";

import useGlobalLoadingStore from "@/store/global-loging-store";
import Loading from "./loading";
import useBodyOverflow from "@/hooks/commons/useBodyOverflow";

export default function GlobalLoading() {
  const { isLoading } = useGlobalLoadingStore();
  useBodyOverflow({ isLocked: isLoading });
  return isLoading ? <Loading /> : null;
}
```

</details>

<br/>

#### 🎯 SRP 원칙에 따라 custom hook 코드 분리 및 hook명 수정
> **적용이유**

- 현재 각 컴포넌트 별로 custom hook를 통해 로직이 분리되어있습니다.
- 하지만 SRP 원칙에 부합하도록 하나의 책임을 지도록 custom hook이 분리되어있지 않습니다.
- 또한, custom hook의 명명이 use+컴포넌트명으로 되어 있어 어떤 역할을 하는 훅인지 정확히 인지하기 어렵습니다.
- 따라서 각 hook을 하나의 책임을 지도록 분리하고, hook의 이름을 수행할 역할에 맞도록 변경합니다.

> **적용 방법**
아래 규칙에 따라 custom hook를 분리하였습니다.

- 현재의 custom hook 로직이 복잡한 경우 별도의 custom hook으로 분리합니다.
- 재사용의 여지가 있는 경우 별도의 custom hook으로 분리합니다.
- 내부 로직이 복잡하지 않거나 변경 가능성이 낮고 재사용 하지 않는 로직은 별도로 분리하지 않습니다.
  
> **적용으로 얻은 이점**
- 유지보수성 증가: 로직이 책임 단위로 분리되어 각 기능을 빠르게 파악하고 수정할 수 있습니다.
- 재사용성 향상: 하나의 책임을 갖는 hook은 다양한 컴포넌트에서 쉽게 재사용할 수 있습니다.
- 파일명을 통해 역할 파악 가능: 명확한 네이밍으로 hook의 기능을 직관적으로 이해할 수 있습니다.


> **적용 코드**

<details>
<summary>코드보기</summary>

<br/>

**useSendToVerifyEmail.ts**

기존 코드에서는 여러 가지 책을 수행하고 있습니다.
- 인증 메일 전송 로직
- 인증 메일 전송 로직 내부 이메일 유효성 검사
- 이메일 input focus
- 언마운트 시 인증 메일 전송 초기화

```javascript
import { useCallback, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useFormContext } from "react-hook-form";
import useSendToVerifyEmailMutate from "../react-query/mutations/auth/useSendToVerifyEmailMutate";
import useEmailDuplicationMutate from "../react-query/mutations/auth/useEmailDuplicationMutate";
import useCheckEmailMutate from "../react-query/mutations/auth/useCheckEmailMutate";
import useSignupStore from "@/store/signup-store";

export default function useSendToVerifyEmail(isFindPw?: boolean) {
  const { getValues } = useFormContext();
  const actions = useSignupStore((state) => state.actions);
  const isSendToVerifyEmail = useSignupStore(
    (state) => state.isSendToVerifyEmail
  );
  const emailRef = useRef<HTMLInputElement | null>(null);

  const { sendToVerifyEmailMutate } = useSendToVerifyEmailMutate();
  const { emailDuplicationMuate } = useEmailDuplicationMutate();
  const { checkEmailMutate } = useCheckEmailMutate();

  const handleClickSendToVerifyEmail = useCallback(async () => {
    const email = getValues("email");

    if (!email) {
      toast.warn("이메일을 입력해주세요.");
      return;
    }

    if (isFindPw) {
      try {
        await checkEmailMutate(email);
      } catch {
        return;
      }
    } else {
      try {
        await emailDuplicationMuate(email);
      } catch (error) {
        console.error(error);
        return;
      }
    }

    actions.sendToVerifyEmail();
    actions.resetTimer();
    actions.setSendToVerifyEmailLoading(true);
    sendToVerifyEmailMutate({ email, isFindPw });
  }, []);

  useEffect(() => {
    if (!isSendToVerifyEmail) {
      if (!emailRef.current) return;
      emailRef.current.focus();
    }
  }, [isSendToVerifyEmail]);

  useEffect(() => {
    return () => {
      actions.resetIsSendToVerifyEmail();
    };
  }, []);

  return {
    isSendToVerifyEmail,
    handleClickSendToVerifyEmail,
    emailRef
  };
}
```

위의 책임들을 책임별로 custom hook으로 분리합니다.

**useEmailVerificationHandler.ts**

```javascript
import { useFormContext } from "react-hook-form";
import useVerificationEmailMutate from "../../react-query/mutations/auth/useVerificationEmailMutate";
import { toast } from "react-toastify";
import { useCallback } from "react";
import { EmailVerificationType } from "@/types/auth-types";

export default function useEmailVerificationHandler(
  type: EmailVerificationType
) {
  const { getValues } = useFormContext();

  const { verificationEmailMuate, verificationEmailLoading } =
    useVerificationEmailMutate();

  const handleClickVerificationEmail = useCallback(async () => {
    const email = getValues("email");
    const verificationCode = getValues("verificationCode");
    if (!verificationCode) {
      toast.warn("인증번호를 입력해주세요.");
      return;
    }

    verificationEmailMuate({ email, verificationCode, type });
  }, [getValues, type, verificationEmailMuate]);

  return { verificationEmailLoading, handleClickVerificationEmail };
}
```

**useEmailVerificationValidator**

```javascript
import { useFormContext } from 'react-hook-form';
import useCheckEmailMutate from '@/hooks/react-query/mutations/auth/useCheckEmailMutate';
import useEmailDuplicationMutate from '@/hooks/react-query/mutations/auth/useEmailDuplicationMutate';
import { toast } from 'react-toastify';
import { EmailVerificationType } from '@/types/auth-types';

export function useEmailVerificationValidator(type: EmailVerificationType) {
  const { getValues } = useFormContext();
  const { checkEmailMutate } = useCheckEmailMutate();
  const { emailDuplicationMuate } = useEmailDuplicationMutate();

  const validate = async () => {
    const email = getValues("email");
    if (!email) {
      toast.warn("이메일을 입력해주세요.");
      return false;
    }

    try {
      if (type==="resetPw") {
        await checkEmailMutate(email);
      } else {
        await emailDuplicationMuate(email);
      }
      return true;
    } catch {
      return false;
    }
  };

  return { validate };
}

```

**useFocusEmailVerificationInput.ts**

```javascript
export function useFocusEmailVerificationInput() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const { emailStatus } = useContext(EmailVerificationContext);

  useEffect(() => {
    if (emailStatus === "INITIAL" && emailRef.current) {
      emailRef.current.focus();
    }
  }, [emailRef, emailStatus]);

  return { emailRef };
}
```

**useResetVerificationEmail**

```javascript
import { EmailVerificationContext } from '@/store/EmailVerificationProvider';
import { useContext } from "react";

export default function useResetVerificationEmail() {
  const { setEmailStatus } = useContext(EmailVerificationContext);

  const resetSendToVerificationEmail = () => {
    setEmailStatus("INITIAL");
  };

  return { resetSendToVerificationEmail };
}

```

</details>

<br/>

#### 🔁 Zustand 이메일 인증 상태 Context API로 전환
> **적용이유**

- 이메일 인증 상태는 회원가입과 비밀번호 찾기 과정에서만 사용되며, 애플리케이션 전체에서 공유할 필요가 없는 상태입니다.
- Zustand는 전역 상태를 유지하기 때문에, 페이지 전환 시 상태가 의도치 않게 유지되거나 직접 초기화해야 하는 번거로움이 있었습니다.
- 반면 Context API는 컴포넌트 트리 기반으로 상태 범위를 제한할 수 있어, 특정 흐름(회원가입/비밀번호 찾기)에 필요한 상태를 안전하게 캡슐화할 수 있습니다.

> **적용 방법**
- 이메일 인증 전용 Context API를 생성하여 회원가입, 비밀번호 찾기 페이지에서 공유 상태를 사용할 상위 컴포넌트를 Provider로 감쌈니다.
-  기존 Zustand 기반 커스텀 훅 및 상태 로직 제거 및 Context API 상태 로직 적용합니다.
  
> **적용으로 얻은 이점**
- 페이지 전환 시 상태 초기화 코드 제거
- 인증 관련 상태의 책임 범위가 명확해지고 응집력 향상
- 메모리 사용 최적화 (필요할 때만 Context가 생성되고 해제됨)

> **적용 코드**

<details>
<summary>코드보기</summary>

<br/>

**EmailVerificationContext**

```javascript
// ...
export const EmailVerificationContext =
  createContext<EmailVerificationContextType>({
    emailStatus: "INITIAL",
    isLoading: false,
    isError: false,
    timer: VERIFICATION_EMAIL_EXP,
    setEmailStatus: () => {},
    setIsLoading: () => {},
    setIsError: () => {},
    countDown: () => {},
    resetTimer: () => {},
    reset: () => {},
    send: () => {}
  });

export function EmailVerificationContextProvider({
  children
}: {
  children: ReactNode;
}) {
  const [emailStatus, setEmailStatus] =
    useState<EmailVerificationStatus>("INITIAL");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [timer, setTimer] = useState(VERIFICATION_EMAIL_EXP);

  const countDown = () => {
    setTimer((prev) => prev - 1);
  };
  const resetTimer = () => {
    setTimer(VERIFICATION_EMAIL_EXP);
  };

  const reset = () => {
    setEmailStatus("INITIAL");
    setTimer(VERIFICATION_EMAIL_EXP);
    setIsLoading(false);
    setIsError(false);
  };

  const send = () => {
    resetTimer();
    setEmailStatus("SEND");
    setIsLoading(true);
    setIsError(false);
  };

  return (
    <EmailVerificationContext.Provider
      value={{
        emailStatus,
        isLoading,
        isError,
        timer,
        setEmailStatus,
        setIsLoading,
        setIsError,
        countDown,
        resetTimer,
        reset,
        send
      }}
    >
      {children}
    </EmailVerificationContext.Provider>
  );
}
```

</details>

<br/>

#### 🗂 도메인 디렉토리 구조 적용
> **적용이유**
- 기존 파일 구조는 `components`, `constants`, `hooks`, `types` 등 역할별로 분산되어 있어, 수정이나 삭제 시 관련된 파일들을 일일이 찾아야 하는 번거로움이 있습니다.
- 이를 개선하기 위해 관련된 코드들이 하나의 도메인안에서 관리되도록 도메인별 디렉토리 구조로 파일 구조를 변경하였습니다.

> **적용 방법**
- 공통 요소는 기존처럼 상위에 두되, `domains` 폴더 하위에 도메인별 폴더를 생성하고, 각 도메인 내부에 `components`, `constansts`, `hooks`, `types`, `utils` 등 폴더를 생성하여 관련된 코드들이 하나의 디렉토리 안에서 관리되도록 구성합니다.

> **적용으로 얻은 이점**
- 관련 코드들이 모여 있어 의존 관계 파악이 쉬워졌습니다.
- 도메인 단위의 디렉토리 삭제로 깔끔한 코드 정리가능합니다.
- import 경로만 보더라도 파일 위치 및 역할 파악 가능합니다.

> **폴더 구조 비교**

<details>
<summary>폴더 구조 보기</summary>

<br/>

**적용 전 폴더 구조**

```text
 ┣ 📂app
 ┣ 📂components
 ┣ 📂constants
 ┣ 📂hooks
 ┣ 📂lib
 ┣ 📂types
 ┣ ...
```

**적용 후 폴더 구조**

- 상위 components, contstants, hooks, utils, types 등 공통적으로 사용하는 파일들을 두며, domains 폴더 하위에 domain 폴더를 생성하여 관련된 코드들이 하나의 디렉토리 안에서 관리되도록 구성합니다.

```text
 ┣ 📂app
 ┣ 📂components
 ┣ 📂constants
 ┣ 📂hooks
 ┣ 📂utils
 ┣ 📂types
 ┣ 📂domains
 ┃ ┣ 📂auth
 ┃ ┣ ┣ 📂api
 ┃ ┣ ┣ 📂components
 ┃ ┣ ┣ 📂hooks
 ┃ ┣ ┣ 📂models
 ┃ ┣ ┗ ...
 ┃ ┣ 📂chat
 ┃ ┣ ┣ 📂api
 ┃ ┣ ┣ 📂components
 ┃ ┣ ┣ 📂hooks
 ┃ ┣ ┣ 📂models
 ┃ ┣ ┗ ...
 ┃ ┣ 📂home
 ┃ ┣ 📂notification
 ┃ ┣ 📂product
 ┃ ┣ 📂search
 ┃ ┗ 📂user
 ┣ ...
```

</details>

<br/>

### 🔫 트러블 슈팅

#### 🍪 Client to SSR cookie 전달 문제

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

#### 💫 Hydrate Redux state 초기화 문제

> 문제 상황

- 유저 로그인 인증 로직을 SSR를 이용하여 prefetch하여 유저 정보를 HYDRATE로 Redux state에 저장하는 과정에서 기존 다른 Redux state가 초기화 되는 문제가 발생하였습니다.

> 문제 원인

- reducer 설정에서 HYDRATE가 Redux의 모든 state를 덮어쓰도록 설정되어 문제가 발생하였습니다.

> 해결 방법

- 1 ) `redux-persist`를 사용하여 기존 redux state 데이터를 저장하는 방법
- 2 ) rootReducer에서 HYDRATE를 적용하지 않고, 각 slice에서 `extraReducers`를 사용하여 필요한 action에만 HYDRATE를 적용하는 방법
- 두 번째 방법을 사용하여 문제를 해결하였습니다.

> 해결 코드

<details>
<summary>코드보기</summary>

<br>

**1 ) rootReducer HYDRATE 제거**
**기존 코드**

```javascript
// store/reducers/index.ts
import { combineReducers, AnyAction } from "@reduxjs/toolkit";
import { signupSlice } from "../signupSlice";
import { authSlice } from "../authSlice";
import { locationSlice } from "../locationSlice";
import { chatSlice } from "../chatSlice";

const combinedReducer = combineReducers({
  signup: signupSlice.reducer,
  auth: authSlice.reducer,
  location: locationSlice.reducer,
  chat: chatSlice.reducer,
});

type CombinedState = ReturnType<typeof combinedReducer>;

const rootReducer = (
  state: CombinedState | undefined,
  action: AnyAction
): CombinedState => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export default rootReducer;
```

<br>

**수정 코드**

```javascript
// store/reducers/index.ts
import { combineReducers, AnyAction } from "@reduxjs/toolkit";
import { signupSlice } from "../signupSlice";
import { authSlice } from "../authSlice";
import { locationSlice } from "../locationSlice";
import { chatSlice } from "../chatSlice";

const combinedReducer = combineReducers({
  signup: signupSlice.reducer,
  auth: authSlice.reducer,
  location: locationSlice.reducer,
  chat: chatSlice.reducer,
});

type CombinedState = ReturnType<typeof combinedReducer>;

const rootReducer = (
  state: CombinedState | undefined,
  action: AnyAction
): CombinedState => {
  return combinedReducer(state, action);
};

export default rootReducer;
```

- rootReducer의 HYDRATE를 제거하였습니다.

<br>

**2 ) HYDRATE가 필요한 slice에 extraReducer를 이용하여 변경**

```javascript
import { AuthData } from "@/types/authTypes";
import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const isClient = typeof window !== "undefined";

// 클라이언트 환경에서만 localStorage에 접근합니다.
const storedUser = isClient
  ? JSON.parse(localStorage.getItem("uid") || "null")
  : null;

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: storedUser as AuthData | null,
    isLoading: true,
  },
  reducers: {
    saveAuth: (
      state,
      action: {
        payload: {
          uid: string;
          nickname: string;
          email: string;
          profileImg: string;
        };
        type: string;
      }
    ) => {
      state.user = action.payload;
      if (isClient) {
        localStorage.setItem("uid", JSON.stringify(action.payload));
      }
    },
    resetAuth: (state) => {
      state.user = null;
      if (isClient) {
        localStorage.removeItem("uid");
      }
    },
    setIsLoading: (state, action: { payload: boolean; type: string }) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(HYDRATE, (state, action: AnyAction) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    });
  },
});

```

- `extraReducers`를 통해 HYDRATE 적용

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

#### ❗ 504 Gateway Timeout Error

> 문제 상황

- vercel에 프로젝트 배포후 504 gateway timeout를 해결를 위해 region을 변경하였지만 로그인 이후 빈번하게 504 Gateway Timeout 발생하였습니다.

> 문제 원인

- MongoDB의 DB 연결을 캐싱하여 사용했습니다. 유저 인증 API Router에서 dbConnect 함수를 빠트려 배포하여 초기 DB 연결이 이루어지지 않은 상태에서 DB에 접근하려고 했기 때문에 DB에서 연결이 이루어질 때까지 계속 요청을 보냈고, 결국 10초 지연 시간을 초과하여 문제가 발생했습니다.
- 종종 제대로 동작했던 이유는 캐싱된 DB 연결을 사용했기 때문에 연결이 한 번 이루어진 뒤에는 문제가 발생하지 않았기 때문입니다.

> 해결 방법

- 해결방법은 유저 인증 api router에 dbConnect 함수를 추가하여 해결할 수 있었습니다.

> 해결 코드

<details>
<summary>코드보기</summary>

```javascript
// /api/auth/user
import User from "@/lib/db/models/User";
import mongoose from "mongoose";
import { checkAuthorization } from "@/lib/server";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const isValidAuth = await checkAuthorization(req, res);

      if (!isValidAuth.isValid) {
        res.status(401).json({
          message: isValidAuth.message,
        });
        return;
      }

      const myUid = isValidAuth?.auth?.uid;

      await dbConnect(); // dbConnect 추가 => 에러 해결

      const user = await User.findOne({
        _id: new mongoose.Types.ObjectId(myUid),
      });

      res.status(200).json({
        message: "유저정보를 성공적으로 불러왔어요.",
        user: {
          uid: user._id,
          nickname: user.nickname,
          profileImg: user.profileImg,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "유저 인증에 실패했어요.\n잠시 후 다시 시도해주세요.",
      });
    }
  }
}
```

</details>

<br>

#### 🗜 middleware 토큰 인증 로직 구현 문제

> 문제 상황

- nextjs에서 제공하는 middleware로 api 함수 요청시 마다 토큰 인증 로직을 만들어 적용하려고 하였습니다.
- 하지만 nextjs에서 제공하는 middleware에서 토큰 인증 후 만료된 토큰 재발급 로직, 토급 재발급 후 기존 요청 재실행 구현에 한계가 있었습니다.

> 해결 방법

- middleware에서 토큰 인증 로직을 실행 하지 않고, 라우터 리다이렉트 처리만을 담당하게 하였습니다.
- 대신 토큰 인증이 필요한 api router마다 토큰 인증 로직이 포함 별도의 유틸 함수를 적용하여 인증이 처리되도록 구현하였습니다.
- axios intercetor를 이용하여 api 요청시 토큰 만료 에러 발생시 리프레쉬 토큰을 통해 엑세스 토큰을 재발급하고, 기존 요청을 실행하도록 하였습니다.

> 해결 코드

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

<br/>

#### ❌ 배포 후 Hydrate 불일치 문제

> 문제 상황

- 로컬 환경에서는 Hydrate 불일치 문제가 발생하지 않았는데 Vercel 배포 후 Hydrate 불일치 문제가 발생하였습니다.

> 문제 원인

- 상품 목록 날짜 형식에서 Hydreate 불일치가 발생하였습니다.
- 날짜 형식을 포맷팅 하는 함수에서 Vercel 배포 서버에서는 UTC를 사용 중이지만 KST 시간 차이를 계산하지 않아 날짜 형식 불일치가 발생하였습니다.

> 해결 방법

- 날짜 형식 포맷팅 함수에 UTC -> KST 시간대로 변환하는 코드를 추가하여 해결하였습니다. 

> 해결 코드

<details>
<summary>코드보기</summary>

```javascript
  export const getDateFormat = (time: string) => {
  const now = new Date();
  const dataTime = new Date(time);

  // UTC → KST 변환 (밀리초 단위로 +9시간 추가)
  const kstTime = new Date(dataTime.getTime() + 9 * 60 * 60 * 1000);
  //...
  }
```
</details>

<br>

#### 🍪 SSR to Client cookie 전달 문제

> 문제 상황

- SSR 페이지에서 토큰 만료 에러가 발생하면, cookie에 저장된 refreshToken를 통해 accessToken를 재발급 받은 cookie가 client로 전달되지 않는 문제가 발생하였습니다.
- 이로 인해 Client에서 인증이 필요한 API 요청시 토큰 재발급 로직을 중복 요청한다는 문제가 있었습니다.


> 문제 원인

- App Router에서는 SSR 페이지의 쿠키를 클라이언트로 전송할 수 없기 때문에 SSR 측에서 새로운 accessToken를 갱신하여도 클라이언트에는 갱신된 accessToken이 포함된 cookie가 전달되지 않습니다. 

> 해결 방법

- SSR 측에서 토큰 만료에러를 감지하면 토큰 재발급 페이지로 redirect시켜 토큰 재발급을 클라이언트가 처리하도록 위임하였습니다.
- redirect 후 클라이언트 측에서 토큰 재발급을 처리하고 이전 페이지로 돌아가도록 하기 위해 middleware에 현재 페이지를 저장하는 X-Requested-URL cookie를 추가하도록 하였습니다.

> 해결 코드

<details>
<summary>코드 보기</summary>

#### profile page
accessToken 만료 에러 감지 시 redirect를 통해 클라이언트 측으로 aceessToken 토큰 재발급을 위임합니다.
```javascript
//...
async function prefetchProfile() {
  const { getIronSession } = await import("iron-session");
  const session = await getIronSession<IronSessionData>(
    cookies(),
    sessionOptions
  );
  const allCookies = headers().get("cookie");

  if (session.refreshToken) {
    try {
      const response = await customAxios("/api/profile", {
        headers: {
          Cookie: allCookies
        }
      });
      return response.data.profile as ProfileData;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Expired AccessToken.") {
          const { cookies } = await import("next/headers");
          const cookie = cookies();
          const currentURL = cookie.get("X-Requested-URL")?.value || "/"; // 현재 페이지 가져오기
          redirect(`${BASE_URL}/refresh-token?next=${currentURL}`); // 클라이언트 측으로 aceessToken 토큰 재발급을 위임
        }
      }
    }
  }
}
//...
```


**middleware.ts**

현재 페이지를 저장하는 X-Requested-URL cookie 설정 로직 추가합니다.
```javascript
//...
 const { pathname } = req.nextUrl;

  const response = NextResponse.next();
  response.cookies.set("X-Requested-URL", pathname, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    path: "/"
  });
//...
```

**refresh-token page**

accessToken 재발급을 위임받아 처리합니다.
```javascript
"use client";

import React, { useEffect } from "react";
import Loading from "../loading";
import { useRouter, useSearchParams } from "next/navigation";
import axios, { isAxiosError } from "axios";
import { BASE_URL } from "@/constants/constant";
import { RegenerateAccessTokenResponseData } from "@/types/api-types";

export default function RefreshToken() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";
  const router = useRouter();

  useEffect(() => {
    const fechAccessToken = async () => {
      try {
        await axios.post(`${BASE_URL}/api/auth/refresh-token`, {
          withCredentials: true
        });
        // SSR 재요청을 위한 서버 리다이렉트
        window.location.href = next;
      } catch (error) {
        if (isAxiosError<RegenerateAccessTokenResponseData>(error)) {
          if (error.response?.status === 401) {
            router.replace("/session-expired");
          } else {
            throw error;
          }
        }
      }
    };

    fechAccessToken();
  }, []);

  return <Loading />;
}
```

</details>

<br>

#### 🧨 CustomAxios accessToken 재발급 중복 요청 문제

> 문제 상황

- 일부 페이지에서 accessToken이 만료된 경우 accessToken 재발급 요청이 중복으로 발생하는 문제가 있었습니다.


> 문제 원인

- 일부 페이지에서 인증이 필요한 API 요청이 여러 개 동시에 올 수 있어 accessToken이 만료된 경우 accessToken 재발급 요청이 중복으로 발생하는 문제였습니다.

> 해결 방법

- Observer Pattern을 사용하여 accessToken 재발급 요청이 있다면 현재 요청을 실행하지않고 요청을 구독해 두었다가 accessToken이 재발급된 이후 구독한 요청들을 실행하도록 하여 중복 요청을 방지하였습니다.

> 해결 코드

<details>
<summary>코드 보기</summary>

**Observable.tsx**

```javascript
type Callback = () => void;
class Observable {
  private observers: Observer[] = [];

  setObserver(callback: Callback) {
    const observer = new Observer(callback);
    this.observers.push(observer);

    return observer;
  }

  notifyAll() {
    this.observers.forEach((observer) => {
      observer.callback();
    });
  }

  removeAll() {
    this.observers = [];
  }
}

class Observer {
  callback: Callback;

  constructor(callback: Callback) {
    this.callback = callback;
  }
}

const tokenObservable = new Observable();
export default tokenObservable;

```

**customAxios.ts**

```javascript
import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  isAxiosError
} from "axios";
import { RegenerateAccessTokenResponseData } from "@/types/api-types";
import tokenObservable from "./Observable";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

const customAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

// accessToken 재발급 요청 확인 flag
let isRefreshing = false;

customAxios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (typeof window === "undefined" && 
        isAxiosError<RegenerateAccessTokenResponseData>(error) &&
        error.response?.status === 401 &&
        error.response?.data.message === "만료된 토큰이에요."
      ) {
      throw new Error("Expired AccessToken.");
    }

    if (
      isAxiosError<RegenerateAccessTokenResponseData>(error) &&
      error.response?.status === 401 &&
      error.response?.data.message === "만료된 토큰이에요." &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;


      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const cookies = originalRequest.headers["Cookie"];

          const response = await axios.post(
            `${BASE_URL}/api/auth/refresh-token`,
            {
              headers: {
                Cookie: cookies
              },
              withCredentials: true
            }
          );

          const setCookies = response.headers["set-cookie"];
          if (setCookies) {
            originalRequest.headers["Cookie"] = setCookies.join("; ");
          }

          // 리프레시 성공 → 대기중인 요청들 실행
          tokenObservable.notifyAll();
          return customAxios(originalRequest);
        } catch (refreshError) {
          tokenObservable.removeAll(); // 에러 시 구독 제거
          if (
            isAxiosError<RegenerateAccessTokenResponseData>(refreshError) &&
            refreshError.response?.status === 401
          ) {
            if (typeof window !== "undefined") {
              window.location.replace("/session-expired");
            }
          }
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // accessToken 재발급 중이면 받은 요청 구독
      return new Promise((resolve) => {
        tokenObservable.setObserver(() => {
          resolve(customAxios(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  }
);

export default customAxios;
```

</details>

<br>

#### 🔴 Layout 컴포넌트 Invalid hook call 에러
> 문제 상황

- layout.tsx에서 'Invalid hook call' 오류가 발생하였습니다.


> 문제 원인

- layout.tsx가 async 함수로 선언되어 SSR 처리로 서버에서 해당 훅이 실행되면서 'Invalid hook call' 오류가 발생하였습니다.
- ReactQueryProvider에서 설정을 위한 useState(() => new QueryClient()) 사용하여 서버에서 해당 훅이 실행되면서 'Invalid hook call' 오류가 발생하였습니다.

> 해결 방법

- layout.tsx가 SSR 처리되지 않도록 async를 제거하여 동기 함수로 변경하여 해결하였습니다.

> 해결 코드

<details>
<summary>코드 보기</summary>

```javascript
//...
export default function RootLayout({
  children,
  signin
}: Readonly<{
  children: React.ReactNode;
  signin: React.ReactNode;
}>) {
  return (
  //...
  );
}
```

</details>

<br/>

#### 🕳 로그아웃 시 빈 유저 정보가 페이지에 노출되는 문제
> 문제 상황

- 기존 로그아웃은 클라이언트 유저 정보 데이터를 삭제한 후 페이지를 전환하는 방식이었습니다.
- 하지만 유저 정보가 표시되는 페이지에서 로그아웃 시 빈 유저 정보가 일시적으로 노출되는 문제가 있었습니다.

> 문제 원인

- 데이터 삭제와 페이지 전환 사이에 딜레이가 발생하여 빈 유저 정보가 일시적으로 노출되었습니다.

> 해결 방법

- 로그아웃 성공 시 /logout 전용 페이지로 리디렉션하고, 해당 페이지에서 클라이언트 데이터 삭제 로직을 처리하도록 개선합니다.

> 해결 코드

<details>
<summary>코드 보기</summary>

<br/>

**useSignoutMutate.ts**

```javascript
//...
export default function useSignoutMutate() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const globalLoadingActions = useGlobalLoadingStore((state) => state.actions);

  const { mutate: signoutMutate } = useMutation<
    AxiosResponse<SignoutResposeData>,
    AxiosError,
    void
  >({
    mutationFn: () => signout(user?.uid || ""),
    onMutate: () => {
      globalLoadingActions.startLoading();
    },
    onSuccess: (response) => {
      if (
        response.data.message === "카카오 계정은 별도의 로그아웃이 필요해요."
      ) {
        router.replace(
          `https://kauth.kakao.com/oauth/logout?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&logout_redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}/logout`
        );
      } else {
        router.replace("/logout");
      }
    }
    //...
  });
//...
}
```

**logout.tsx**

```javascript
//...
export default function Logout() {
 //...
  useEffect(() => {
    if (!user) return navigate({ type: "replace", url: "/" });

    queryClient.clear();
    authActions.resetAuth();
    chatActions.resetChatState();
    notificationActions.resetUnreadCount();
    navigate({ type: "replace", url: "/" });
  }, [
    authActions,
    chatActions,
    navigate,
    notificationActions,
    queryClient,
    user
  ]);

  return (
    <div className="fixed inset-0 bg-white z-[99]">
      <Loading />
    </div>
  );
}
```

</details>

<br/>

### 👀 구현 기능 미리보기 ( 제목 클릭 시 해당 기능 상세설명으로 이동됩니다. )

| [🔗 로그인](https://github.com/NamJongtae/ITtem/wiki/%EA%B5%AC%ED%98%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EB%A1%9C%EA%B7%B8%EC%9D%B8) | [🔗 소셜 로그인](https://github.com/NamJongtae/ITtem/wiki/%EA%B5%AC%ED%98%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EC%86%8C%EC%85%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8) | [🔗 회원가입](https://github.com/NamJongtae/ITtem/wiki/%EA%B5%AC%ED%98%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85) |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ![로그인](https://github.com/NamJongtae/ITtem/assets/113427991/78a943e8-6f8d-4410-b17f-2e12647216c2)                                                          | ![소셜 로그인](https://github.com/NamJongtae/ITtem/assets/113427991/510277a1-d382-4321-bbf1-92aee174005b)                                                                             | ![회원가입](https://github.com/NamJongtae/ITtem/assets/113427991/02a1501a-1ab6-4aa1-a54c-15aa4c46b7bf)                                                                   |

| [🔗 비밀번호 찾기](https://github.com/NamJongtae/ITtem/wiki/%EA%B5%AC%ED%98%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8-%EC%B0%BE%EA%B8%B0) | [🔗 상품 조회](https://github.com/NamJongtae/ITtem/wiki/%EA%B5%AC%ED%98%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EC%83%81%ED%92%88-%EC%A1%B0%ED%9A%8C) | [🔗 상품 검색](https://github.com/NamJongtae/ITtem/wiki/%EA%B5%AC%ED%98%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EC%83%81%ED%92%88-%EA%B2%80%EC%83%89) |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![비밀번호 찾기](https://github.com/NamJongtae/ITtem/assets/113427991/85348b11-9cba-4500-826a-6d9cf86c5bda)                                                                                      | ![상품 조회](https://github.com/NamJongtae/ITtem/assets/113427991/d9fc36ba-849d-4a88-83b6-095d73b752f5)                                                                    | ![상품 검색](https://github.com/NamJongtae/ITtem/assets/113427991/4d542184-2eb0-42ed-b10c-2cca78b786f4)                                                                    |

| [🔗 상품 업로드](https://github.com/NamJongtae/ITtem/wiki/%EA%B5%AC%ED%98%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EC%83%81%ED%92%88-%EC%97%85%EB%A1%9C%EB%93%9C) | [🔗 상품 수정](https://github.com/NamJongtae/ITtem/wiki/%EA%B5%AC%ED%98%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EC%83%81%ED%92%88-%EC%88%98%EC%A0%95) | [🔗 상품 상세](https://github.com/NamJongtae/ITtem/wiki/%EA%B5%AC%ED%98%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EC%83%81%ED%92%88-%EC%83%81%EC%84%B8) |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![상품 업로드](https://github.com/NamJongtae/ITtem/assets/113427991/997cb9cf-dadf-4263-baa2-f7e239f58893)                                                                             | ![상품 수정](https://github.com/NamJongtae/ITtem/assets/113427991/76e46d07-62c9-4102-a8a2-d0238eecf68c)                                                                    | ![상품 상세](https://github.com/NamJongtae/ITtem/assets/113427991/00123741-4675-4ad6-a910-d9e383e1f8a1)                                                                    |

| [🔗 상품 찜/신고](https://github.com/NamJongtae/ITtem/wiki/%EA%B5%AC%ED%98%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EC%83%81%ED%92%88-%EC%B0%9C%EC%8B%A0%EA%B3%A0) | [🔗 상품 삭제](https://github.com/NamJongtae/ITtem/wiki/%EA%B5%AC%ED%98%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EC%83%81%ED%92%88-%EC%82%AD%EC%A0%9C) | [🔗 상품 관리](https://github.com/NamJongtae/ITtem/wiki/%EA%B5%AC%ED%98%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EC%83%81%ED%92%88-%EA%B4%80%EB%A6%AC) |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![상품 신고/찜](https://github.com/NamJongtae/ITtem/assets/113427991/7a139fe0-28a4-426c-b3d4-692d89a169c2)                                                                             | ![상품 삭제](https://github.com/NamJongtae/ITtem/assets/113427991/6a09ea99-e026-4e43-b673-85c777466fc9)                                                                    | ![상품 관리](https://github.com/NamJongtae/ITtem/assets/113427991/8d7ec3a3-575c-4c80-ae75-0d0c1bce054e)                                                                    |

| [🔗 리뷰 작성](https://github.com/NamJongtae/ITtem/wiki/%EA%B5%AC%ED%98%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EB%A6%AC%EB%B7%B0-%EC%9E%91%EC%84%B1) | [🔗 프로필 페이지](https://github.com/NamJongtae/ITtem/wiki/%EA%B5%AC%ED%98%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%ED%94%84%EB%A1%9C%ED%95%84-%ED%8E%98%EC%9D%B4%EC%A7%80) | [🔗 프로필 수정](https://github.com/NamJongtae/ITtem/wiki/%EA%B5%AC%ED%98%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%ED%94%84%EB%A1%9C%ED%95%84-%EC%88%98%EC%A0%95) |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![리뷰 작성](https://github.com/NamJongtae/ITtem/assets/113427991/f36c7183-7cd8-4c12-8ac6-9fdbc258b697)                                                                    | ![프로필 페이지](https://github.com/NamJongtae/ITtem/assets/113427991/99f348be-3f95-40a1-bd6a-38992d5970e7)                                                                                      | ![ 프로필 수정](https://github.com/NamJongtae/ITtem/assets/113427991/76e46d07-62c9-4102-a8a2-d0238eecf68c)                                                                            |

| [🔗 비밀번호 변경 ](https://github.com/NamJongtae/ITtem/wiki/%EA%B5%AC%ED%98%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8-%EB%B3%80%EA%B2%BD) | [🔗 실시간 채팅 목록](https://github.com/NamJongtae/ITtem/wiki/%EA%B5%AC%ED%98%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EC%8B%A4%EC%8B%9C%EA%B0%84-%EC%B1%84%ED%8C%85-%EB%AA%A9%EB%A1%9D) | [🔗 실시간 채팅](https://github.com/NamJongtae/ITtem/wiki/%EA%B5%AC%ED%98%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EC%8B%A4%EC%8B%9C%EA%B0%84-%EC%B1%84%ED%8C%85) |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![비밀번호 변경](https://github.com/NamJongtae/ITtem/assets/113427991/6b08d762-d7c4-4174-afdf-b10d4a951298)                                                                                       | ![실시간 채팅 목록](https://github.com/NamJongtae/ITtem/assets/113427991/fa04a143-fb1b-49a3-8751-7a9376c9294e)                                                                                                | ![실시간 채팅](https://github.com/NamJongtae/ITtem/assets/113427991/663ae48f-058a-4e4b-aafe-a1bbd47fa9cf)                                                                             |

<div align="center">

| [🔗 상품 실시간 알림/메세지](https://github.com/NamJongtae/ITtem/wiki/%EA%B5%AC%ED%98%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EC%83%81%ED%92%88-%EC%8B%A4%EC%8B%9C%EA%B0%84-%EC%95%8C%EB%A6%BC%EB%A9%94%EC%84%B8%EC%A7%80) | [🔗 로그아웃](https://github.com/NamJongtae/ITtem/wiki/%EA%B5%AC%ED%98%84-%EA%B8%B0%EB%8A%A5-%EC%83%81%EC%84%B8-%EC%84%A4%EB%AA%85#%EB%A1%9C%EA%B7%B8%EC%95%84%EC%9B%83) |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ![상품 실시간 알림/메세지](https://github.com/NamJongtae/ITtem/assets/113427991/af33565e-a0c3-4e20-8192-b380857873a7)                                                                                                                           | ![로그아웃](https://github.com/NamJongtae/ITtem/assets/113427991/9368904e-2cd7-4772-8549-e8c0e151a3be)                                                                   |

<p align="right"><a href="#top">TOP 🔼</a></p>

</div>
