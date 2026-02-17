# 프로젝트 구조

## 📁 디렉토리 구조

```
solo-founder-survey/
│
├── app/                        # Next.js App Router
│   ├── api/submit/route.ts    # 설문 제출 API
│   ├── layout.tsx             # 루트 레이아웃 (Space Grotesk 폰트)
│   ├── page.tsx               # 메인 페이지
│   └── globals.css            # 다크 테마 + 네온 스타일
│
├── components/                 # React 컴포넌트
│   ├── survey/                # 설문조사 관련
│   │   ├── SwiperSurveyForm.tsx   # 메인 Swiper 폼
│   │   ├── StepSlide.tsx          # 슬라이드 래퍼
│   │   └── slides/                # 4단계 슬라이드
│   │       ├── Step1Slide.tsx     # 01. 아이템 선정 (시안)
│   │       ├── Step2Slide.tsx     # 02. 아이템 검증 (핑크)
│   │       ├── Step3Slide.tsx     # 03. MVP 개발 (그린)
│   │       └── Step4Slide.tsx     # 04. 마케팅 (옐로우)
│   │
│   └── ui/                    # 네온 UI 컴포넌트
│       ├── NeonRadioGroup.tsx
│       ├── NeonTextInput.tsx
│       └── NeonTextArea.tsx
│
├── lib/                        # 비즈니스 로직
│   ├── googleSheets.ts        # Google Sheets API
│   └── constants.ts           # 상수 (자신있음→어려움 척도)
│
├── types/                      # TypeScript 타입
│   └── survey.ts              # 설문 타입 정의
│
└── 설정 파일
    ├── .env.local             # 환경 변수
    ├── package.json           # 의존성 (swiper 포함)
    └── 기타 설정 파일
```

## 🎨 디자인 컨셉

### 색상 테마
- **배경**: 검은색 (#000000)
- **네온 컬러**:
  - 시안 (Cyan): #00ffff - Step 1
  - 핑크 (Pink): #ff00ff - Step 2
  - 그린 (Green): #39ff14 - Step 3
  - 옐로우 (Yellow): #ffff00 - Step 4

### 폰트
- **Space Grotesk** - Google Fonts
- 모던하고 기하학적인 스타일
- 네온 효과와 잘 어울리는 디자인

### 네온 효과
- `neon-text`: 텍스트 글로우 효과
- `neon-border`: 테두리 글로우 효과
- 호버 시 강화된 글로우

## 🔄 데이터 흐름

```
사용자 입력 (Swiper 슬라이드)
    ↓
SwiperSurveyForm (React Hook Form)
    ↓
각 Step 슬라이드 컴포넌트
    ↓
/api/submit (Next.js API)
    ↓
lib/googleSheets.ts
    ↓
Google Sheets
```

## 🎯 주요 기능

### 4단계 스와이프 UI
1. **Step 1: 아이템 선정** (시안)
   - 전반적인 아이템 선정
   - FMF 검증
   - AI 피드백

2. **Step 2: 아이템 검증** (핑크)
   - 아이템 검증
   - 인터뷰이 섭외
   - 채널 찾기

3. **Step 3: MVP 개발** (그린)
   - MVP 개발 과정

4. **Step 4: 마케팅 & 마무리** (옐로우)
   - 마케팅
   - 향후 서비스 관심도
   - 개인정보 (선택)
   - 추가 의견

### 네비게이션
- 좌우 화살표 클릭
- 스와이프 제스처
- 마우스휠 (가로 스크롤)
- 하단 페이지네이션 점

## 📝 척도 변경사항

**이전**: 전혀 어렵지 않음 → 매우 어려움

**현재**: 매우 자신있음 → 매우 어려움

```
1: 매우 자신있음
2: 약간 자신있음
3: 보통
4: 약간 어려움
5: 매우 어려움
```

## 🛠 기술 스택

- **Swiper.js** - 터치 슬라이더
- **Space Grotesk** - 구글 폰트
- **Tailwind CSS** - 네온 색상 확장
- **CSS Custom Properties** - 네온 글로우 효과

## 🎨 커스터마이징

### 새 네온 색상 추가
1. `app/globals.css`에 CSS 변수 추가
2. `tailwind.config.js`에 색상 추가
3. 컴포넌트에서 `color` prop으로 사용

### 새 슬라이드 추가
1. `components/survey/slides/` 에 새 파일 생성
2. `SwiperSurveyForm.tsx`에 `<SwiperSlide>` 추가
3. `types/survey.ts`에 필드 추가
