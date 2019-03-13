# 프론트앤드 개발자 면접 문제

클래스101은 비디오 컨텐츠와 실물 키트를 함께 판매합니다. 두 종류의 물건을 묶어 우리는 **productItem(상품)**이 라고 부릅니다. 아래 정의된 스펙과 데이터로 장바구니 기능과 결제 금액을 계산하여 보여주세요. 

React를 이용하여 Single Page Application로 개발합니다. 사용하고 싶은 라이브러리가 있다면 사용하시고, 그 라이브러리를 선택한 이유를 설명해주세요. 

일반적인 커머스 쇼핑몰에서 장바구니와 상품 목록 페이지를 구현한다고 상상하세요. 스펙에 정의되지 않은 부분은 일반적인 쇼핑몰 사이트처럼 작동하면 됩니다. 

작업 중 스펙에 관련된 모호한 부분이 생긴다면 즉시 이야기 해주세요. 

작업이 완료되면 Github 개인 계정에 소스를 push 하시고, 면접 전날 repo URL을 공유해주세요(git commit history를 볼 수 있어야 합니다). 면접 당일엔 노트북으로 해당 소스코드를 보면서 기술 관련 이야기를 나눈 후, 화이트보드에 손코딩을 진행합니다. 

# Specs

1. productItem 목록 페이지(/products)를 만들어주세요. 가격과 사진, 상품 제목을 표시해주세요. 노출 순서(score)에 따라 정렬하여 5개씩만 보여줍니다. 각 상품에는 장바구니 담기/빼기 버튼이 있습니다. (담겨 있다면 빼기/없다면 담기) 
2. 장바구니에 담긴 상품을 모두 보여주는 장바구니 페이지(/wishlist)를 만들어주세요. 장바구니에는 최대 3개의 상품이 담길 수 있습니다.
3. 장바구니에 담긴 상품은 결제를 위해 쿠폰을 적용할 수 있습니다. coupon은 `type`으로 정액 할인/비율 할인 여부를 결정합니다.
4. 장바구니 페이지엔 결제할 상품을 고를 수 있게 상품마다 체크박스(`<input type="checkbox" />`)를 만들고, 상품별로 구매할 갯수(`<input type="number" />` )도 설정할 수 있게 해주세요. 하단에 쿠폰을 선택할 수 있는 셀렉터(`<select />`)를 추가해주세요. 
5. 쿠폰을 적용한 경우 **쿠폰 사용 불가능 상품(availableCoupon == false)**을 제외하고, 상품 가격들에 일괄적으로 쿠폰에 적힌 금액과 비율을 차감해주세요. 선택된 상품의 금액을 더하고, 쿠폰 할인가를 전부 뺀 가격을 장바구니 페이지 제일 하단에 보여주세요. 소수점 가격이 생긴다면 전부 버림 처리하세요.

# Data

```javascript
// productItems.js
const productItems = [
  {
    id: 'pHr0phFtcWhsgZhSVe9F',
    title: '글씨 쓰는 김이영과 함께 아이패드에 그려낸 캘리그라피',
    coverImage: 'https://cdn.class101.net/images/864f377f-93d9-4520-94de-19ca142c432f',
    price: 120000,
    score: 100,
    availableCoupon: false,
  },
  {
    id: 'B9vUv0E0ibc0X55kVVLr',
    title: '포근한 니트로 만드는 나만의 글씨, 봉봉메이드 니트레터링 클래스',
    coverImage: 'https://cdn.class101.net/images/3a25ecd9-d1ab-4d21-8cc1-522ea711e729',
    price: 560000,
    score: 200,
  },
  {
    id: '81x83ysiEHsHCBoeVh2O',
    title: '글씨가 주는 소소한 행복, Lettering Together!',
    coverImage: 'https://cdn.class101.net/images/ec0f0c15-aeec-43a3-a0c9-b649b0999f0a',
    price: 320000,
    score: 300,

  },
  {
    id: 'ZXV8mCcvbpXKm5J5snUq',
    title: '붓펜으로 그려낸 보통날, 보통의 글씨',
    coverImage: 'https://cdn.class101.net/images/a363a069-5aaf-40cb-822e-a2cab585c37e',
    price: 240000,
    score: 350,

  },
  {
    "id": "tpP45lSwqf1X1yEEFqL4",
    "title": "수놓는 발바닥과 함께 하는 꽁냥꽁냥 고양이 자수",
    "coverImage": "https://cdn.class101.net/images/e6b7bde6-b23d-447f-9cdf-3879caf7eb13",
    price: 90000,
    score: 120,
    availableCoupon: false,
  },
  {
    "id": "nc9XiAWAN4uhNr6pDqlG",
    "title": "소복소복 바늘 끝에서 피어오르는 자수",
    "coverImage": "https://cdn.class101.net/images/38f79b22-4728-4c16-bee9-966fff07df3f",
    price: 230000,
    score: 640,
  },
  {
    "id": "ndHkNPUpGPiF4nmqX0PL",
    "title": "한 땀 한 땀 꽃을 수 놓다 - 보태니컬 입체 프랑스 자수",
    "coverImage": "https://cdn.class101.net/images/132a560b-ba7f-4564-b5f5-709b934f5ddd",
    price: 320000,
    score: 200,
  },
  {
    "id": "TQw8gmqYK2KrKcP1ibWb",
    "title": "내가 그리고, 네가 간직할 인공의 아이패드 드로잉",
    "coverImage": "https://cdn.class101.net/images/f926a844-cfeb-4983-a39a-fb55a0b3fd0b",
    price: 320000,
    score: 190,
    availableCoupon: false,
  },
  {
    "id": "pHr0phFtcWhsgZhSVe9F",
    "title": "글씨 쓰는 김이영과 함께 아이패드에 그려낸 캘리그라피",
    "coverImage": "https://cdn.class101.net/images/864f377f-93d9-4520-94de-19ca142c432f",
    price: 123000,
    score: 453,
  },
  {
    "id": "4tVyp15jKUO6sfUvLnBc",
    "title": "또 다른 나를 그리다, 동글의 아이패드 캐릭터 드로잉",
    "coverImage": "https://cdn.class101.net/images/0a6a86b9-f1ed-4b90-9d53-cbbb0413989d",
    price: 345000,
    score: 300,
    availableCoupon: false,
  },
  {
    "id": "CNCwXwHP7FUip83z5VEH",
    "title": "평범한 일상에 색을 더하는 시간, 자토의 아이패드 드로잉",
    "coverImage": "https://cdn.class101.net/images/9e7be50d-72f1-4c93-80d6-c6b95b42bd40",
    price: 50000,
    score: 300,
  },
  {
    "id": "vgrdHO9bLqNxDYt4Q7vZ",
    "title": "리노와 아이패드로 시작하는 디지털캘리그라피",
    "coverImage": "https://cdn.class101.net/images/1ea53728-c3f7-4fe9-a485-88c9a130b3b4",
    price: 564000,
    score: 150,
  },
  {
    "id": "gGFsFvhrKlvZpjLRfmNY",
    "title": "디지털로 만들어내는 아날로그 감성, 해란의 아이패드 드로잉",
    "coverImage": "https://cdn.class101.net/images/cbadec97-d306-4669-bbcf-eef5d1a9d261",
    price: 230000,
    score: 220,
  }
];


// coupons.js
const coupons = [
  {
    type: 'rate',
    title: '10% 할인 쿠폰',
    discountRate: 10,
  },
  {
    type: 'amount',
    title: '10,000원 할인 쿠폰',
    discountAmount: 10000,
  }
];

```