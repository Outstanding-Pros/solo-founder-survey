# 프로젝트 구조

## 📁 디렉토리 구조

```
solo-founder-survey/
│
├── app/                        # Next.js App Router
│   ├── api/submit/route.ts    # 설문 제출 API
│   ├── layout.tsx             # 루트 레이아웃
│   ├── page.tsx               # 메인 페이지
│   └── globals.css            # 전역 스타일
│
├── components/                 # React 컴포넌트
│   ├── survey/                # 설문조사 섹션
│   │   ├── SurveyForm.tsx     # 메인 폼
│   │   ├── BasicInfoSection.tsx
│   │   ├── ItemSelectionSection.tsx
│   │   ├── ItemValidationSection.tsx
│   │   ├── MVPSection.tsx
│   │   ├── MarketingSection.tsx
│   │   ├── FutureServiceSection.tsx
│   │   └── CommentsSection.tsx
│   │
│   └── ui/                    # 재사용 UI 컴포넌트
│       ├── RadioGroup.tsx
│       ├── TextInput.tsx
│       ├── TextArea.tsx
│       ├── Alert.tsx
│       └── SubmitButton.tsx
│
├── lib/                        # 비즈니스 로직
│   ├── googleSheets.ts        # Google Sheets API
│   └── constants.ts           # 상수 정의
│
├── types/                      # TypeScript 타입
│   └── survey.ts              # 설문 타입 정의
│
└── 설정 파일
    ├── .env.local             # 환경 변수 (비공개)
    ├── .env.example           # 환경 변수 예시
    ├── package.json           # 의존성
    ├── tsconfig.json          # TypeScript 설정
    ├── next.config.js         # Next.js 설정
    ├── tailwind.config.js     # Tailwind 설정
    └── postcss.config.js      # PostCSS 설정
```

## 🎯 핵심 개념

### 1. 컴포넌트 구조
- **app/**: 라우팅과 페이지
- **components/survey/**: 설문 섹션별 컴포넌트
- **components/ui/**: 재사용 가능한 UI 요소

### 2. 데이터 흐름
```
사용자 입력
    ↓
SurveyForm (React Hook Form)
    ↓
/api/submit (Next.js API)
    ↓
lib/googleSheets.ts
    ↓
Google Sheets
```

### 3. 타입 시스템
- `types/survey.ts`에서 모든 타입 중앙 관리
- `SurveyFormData`: 설문 데이터 구조
- `DifficultyLevel`: 1-5 점수

### 4. 스타일링
- **Tailwind CSS**: 유틸리티 클래스 기반
- **globals.css**: Tailwind 설정 + 전역 스타일
- **인라인 스타일**: 컴포넌트별 Tailwind 클래스

## 📝 주요 파일 설명

| 파일 | 역할 | 필수 여부 |
|------|------|-----------|
| `next.config.js` | Next.js 설정 | ✅ 필수 |
| `tailwind.config.js` | Tailwind 설정 | ✅ 필수 |
| `postcss.config.js` | PostCSS 설정 (Tailwind 빌드) | ✅ 필수 |
| `tsconfig.json` | TypeScript 설정 | ✅ 필수 |
| `package.json` | 의존성 관리 | ✅ 필수 |
| `.env.local` | 환경 변수 | ✅ 필수 |
| `.env.example` | 환경 변수 예시 | 📖 문서용 |
| `next-env.d.ts` | Next.js 타입 (자동생성) | 🤖 자동 |

## 🔄 새 섹션 추가하기

1. **컴포넌트 생성**: `components/survey/NewSection.tsx`
2. **타입 추가**: `types/survey.ts`에 필드 추가
3. **폼에 통합**: `components/survey/SurveyForm.tsx`에 import
4. **Google Sheets**: `lib/googleSheets.ts`에 필드 추가

## 🎨 새 UI 컴포넌트 추가하기

1. **컴포넌트 생성**: `components/ui/NewComponent.tsx`
2. **타입 정의**: Props 인터페이스 작성
3. **재사용**: 필요한 곳에서 import
