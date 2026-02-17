# 1인 창업가 설문조사

> 1인 창업 과정의 어려움을 조사하는 설문 플랫폼

## 🚀 빠른 시작

### 1. 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 Google Sheets API 정보를 입력하세요:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your-sheet-id
```

> 💡 `.env.example` 파일을 참고하세요

### 3. 실행

```bash
npm run dev
```

브라우저에서 http://localhost:3000 을 열어 확인하세요.

## 📋 Google Sheets 설정

<details>
<summary>상세 가이드 보기</summary>

### 1단계: Google Cloud Console

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 프로젝트 생성
3. "Google Sheets API" 활성화
4. 서비스 계정 생성 및 JSON 키 다운로드

### 2단계: Google Sheets

1. [Google Sheets](https://sheets.google.com/)에서 새 시트 생성
2. 첫 번째 행에 헤더 추가:
   ```
   제출시간 | 이름 | 이메일 | 아이템선정 | FMF | AI부정 | 아이템검증 | 인터뷰이섭외 | 채널찾기 | MVP개발 | 마케팅 | 향후서비스관심 | 추가의견
   ```
3. 시트 ID 복사 (URL의 `/d/` 다음 부분)
4. 서비스 계정 이메일을 편집자로 공유

</details>

## 🛠 기술 스택

- **Next.js 15** - React 프레임워크
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 스타일링
- **React Hook Form** - 폼 관리
- **Google Sheets API** - 데이터 저장

## 📁 프로젝트 구조

```
solo-founder-survey/
├── app/                    # 라우팅 & 페이지
├── components/
│   ├── survey/            # 설문 섹션
│   └── ui/                # UI 컴포넌트
├── lib/                   # 비즈니스 로직
├── types/                 # 타입 정의
└── 설정 파일
```

> 📖 자세한 구조는 [STRUCTURE.md](./STRUCTURE.md) 참고

## 🎯 주요 기능

- ✅ 1인 창업 4단계 설문 (아이템 선정, 검증, MVP, 마케팅)
- ✅ 실시간 폼 검증
- ✅ Google Sheets 자동 저장
- ✅ 반응형 디자인
- ✅ 타입 안정성

## 🚢 배포 (Vercel)

1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com)에서 import
3. 환경 변수 3개 설정
4. 배포 완료

## 📝 설문 내용

1. **아이템 선정** - FMF 검증, AI 활용
2. **아이템 검증** - 인터뷰이 섭외, 채널 찾기
3. **MVP 개발** - 개발 과정
4. **마케팅** - 홍보 전략
5. **향후 서비스** - 서비스 이용 의향

## 📄 라이선스

MIT
