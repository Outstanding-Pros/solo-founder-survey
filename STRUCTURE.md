# 프로젝트 구조

## 디렉토리 구조

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
│   ├── survey/
│   │   └── SwiperSurveyForm.tsx   # 메인 설문 폼 (한 질문씩 슬라이드)
│   │
│   └── ui/                    # 네온 UI 컴포넌트
│       ├── SingleQuestion.tsx     # 질문 래퍼 (번호, 제목, 색상)
│       ├── AutoAdvanceRadio.tsx   # 선택 후 자동 다음 질문
│       ├── NeonTextInput.tsx      # 네온 텍스트 입력
│       └── NeonTextArea.tsx       # 네온 텍스트에어리어
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

## 디자인 컨셉

### 색상 테마
- **배경**: 검은색 (#000000)
- **네온 컬러**:
  - 시안 (Cyan): #00ffff - 아이템 선정 (Q1~Q3)
  - 핑크 (Pink): #ff00ff - 아이템 검증 (Q4~Q6)
  - 그린 (Green): #39ff14 - MVP 개발 (Q7), 마무리 (Q12)
  - 옐로우 (Yellow): #ffff00 - 마케팅 & 마무리 (Q8~Q11)

### 폰트
- **Space Grotesk** - Google Fonts
- 모던하고 기하학적인 스타일
- 네온 효과와 잘 어울리는 디자인

### 네온 효과
- `neon-text`: 텍스트 글로우 효과
- `neon-border`: 테두리 글로우 효과
- 호버 시 강화된 글로우

## 데이터 흐름

```
사용자 입력 (Swiper 슬라이드, 한 질문씩)
    ↓
SwiperSurveyForm (React Hook Form)
    ↓
라디오 선택 → 300ms 후 자동 다음 질문
    ↓
/api/submit (Next.js API)
    ↓
lib/googleSheets.ts
    ↓
Google Sheets (15개 컬럼)
```

## 설문 구조 (11개 질문)

| # | 질문 | 색상 |
|---|------|------|
| 1 | 아이템 선정 | Cyan |
| 2 | FMF 검증 | Cyan |
| 3 | AI 피드백 | Cyan |
| 4 | 아이템 검증 | Pink |
| 5 | 인터뷰이 섭외 | Pink |
| 6 | 채널 찾기 | Pink |
| 7 | MVP 개발 | Green |
| 8 | 마케팅 | Yellow |
| 9 | 향후 서비스 관심도 | Yellow |
| 10 | 인터뷰 참여 의사 | Yellow |
| 11 | 인터뷰 연락처 (조건부) | Yellow |
| 12 | 추가 의견 + 제출 | Green |

## 척도

```
1: 매우 자신있음
2: 약간 자신있음
3: 보통
4: 약간 어려움
5: 매우 어려움
```

## 기술 스택

- **Next.js 15** - App Router, API Routes
- **React 19** - UI 프레임워크
- **TypeScript** - 타입 안전성
- **Swiper.js** - 터치 슬라이더
- **React Hook Form** - 폼 상태 관리
- **Tailwind CSS** - 네온 색상 확장
- **Google Sheets API** - 데이터 저장
- **Space Grotesk** - 구글 폰트
