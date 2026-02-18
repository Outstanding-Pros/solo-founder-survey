import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 | Co-Founder",
  description: "Outstanding Pros 개인정보처리방침",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-14 bg-black text-gray-200">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-neon-cyan neon-text mb-2">
          개인정보처리방침
        </h1>
        <p className="text-sm text-gray-500 mb-12">
          공고일자: 2026년 2월 18일 | 시행일자: 2026년 2월 18일
        </p>

        <p className="mb-10 text-gray-300 leading-relaxed">
          Outstanding Pros(이하 &ldquo;회사&rdquo;)는 「개인정보 보호법」 제30조에 따라
          정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게
          처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을
          수립·공개합니다.
        </p>

        {/* 제1조 */}
        <Section number={1} title="개인정보 수집에 대한 동의">
          <p>
            회사는 이용자가 회사의 개인정보처리방침 또는 이용약관의 내용에
            대해 「동의」 버튼을 클릭하거나, 설문 참여·이메일 제출 등의 행위를
            통해 개인정보 수집에 대해 동의한 것으로 봅니다.
          </p>
        </Section>

        {/* 제2조 */}
        <Section number={2} title="개인정보의 수집·이용·제공에 대한 동의철회">
          <p>
            이용자는 개인정보의 수집·이용·제공에 대한 동의를 언제든지 철회할 수
            있습니다. 동의철회는 아래 개인정보 보호책임자에게 이메일로 연락하여
            요청할 수 있으며, 회사는 지체 없이 개인정보의 파기 등 필요한 조치를
            하겠습니다.
          </p>
        </Section>

        {/* 제3조 */}
        <Section number={3} title="개인정보의 처리 목적">
          <p className="mb-3">
            회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는
            개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이
            변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를
            받는 등 필요한 조치를 이행할 예정입니다.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>서비스 제공 및 운영:</strong> 설문조사 서비스 제공, 설문
              결과 분석, 맞춤형 콘텐츠 제공, 서비스 개선
            </li>
            <li>
              <strong>회원 관리:</strong> 회원제 서비스 이용에 따른 본인확인,
              서비스 부정이용 방지, 각종 고지·통지 사항 전달
            </li>
            <li>
              <strong>마케팅 및 광고 활용:</strong> 신규 서비스 개발 및 맞춤
              서비스 제공, 이벤트·광고성 정보 제공 및 참여 기회 제공, 서비스
              이용 통계 수집
            </li>
          </ul>
        </Section>

        {/* 제4조 */}
        <Section number={4} title="개인정보의 처리 및 보유 기간">
          <p className="mb-3">
            회사는 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터
            개인정보를 수집 시에 동의받은 개인정보 보유·이용 기간 내에서
            개인정보를 처리·보유합니다.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>서비스 이용 기록:</strong> 서비스 제공 목적 달성 시까지
              (단, 관련 법령에 따라 보존할 필요가 있는 경우 해당 법령에서 정한
              기간 동안 보존)
            </li>
            <li>
              <strong>전자상거래 등에서의 소비자 보호에 관한 법률:</strong>{" "}
              계약 또는 청약철회 등에 관한 기록 5년, 대금결제 및 재화 등의
              공급에 관한 기록 5년, 소비자의 불만 또는 분쟁처리에 관한 기록 3년
            </li>
            <li>
              <strong>통신비밀보호법:</strong> 웹사이트 방문기록 3개월
            </li>
          </ul>
        </Section>

        {/* 제5조 */}
        <Section number={5} title="처리하는 개인정보의 항목">
          <p className="mb-3">회사는 다음의 개인정보 항목을 처리하고 있습니다.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>설문 참여 시:</strong> 이름, 이메일 주소, 설문 응답 내용
            </li>
            <li>
              <strong>이메일 등록 시:</strong> 이메일 주소, 관심 솔루션 선택
              정보
            </li>
            <li>
              <strong>인터뷰 참여 희망 시:</strong> 이름, 이메일 주소, 연락처
            </li>
            <li>
              <strong>서비스 이용 과정에서 자동 수집:</strong> IP 주소, 쿠키,
              서비스 이용 기록, 방문 기록
            </li>
          </ul>
        </Section>

        {/* 제6조 */}
        <Section number={6} title="개인정보의 제3자 제공">
          <p>
            회사는 정보주체의 개인정보를 제3조(개인정보의 처리 목적)에서 명시한
            범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등
            「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를
            제3자에게 제공합니다. 현재 회사는 이용자의 개인정보를 제3자에게
            제공하고 있지 않습니다.
          </p>
        </Section>

        {/* 제7조 */}
        <Section number={7} title="개인정보처리의 위탁">
          <p className="mb-3">
            회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보
            처리업무를 위탁하고 있습니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-700">
              <thead>
                <tr className="bg-gray-900">
                  <th className="border border-gray-700 px-4 py-2 text-left">
                    위탁받는 자 (수탁자)
                  </th>
                  <th className="border border-gray-700 px-4 py-2 text-left">
                    위탁하는 업무의 내용
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-700 px-4 py-2">
                    Google LLC
                  </td>
                  <td className="border border-gray-700 px-4 py-2">
                    설문 데이터 저장 및 관리 (Google Sheets), 웹사이트 분석
                    (Google Analytics)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3">
            회사는 위탁계약 체결 시 「개인정보 보호법」 제26조에 따라
            위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치,
            재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한
            사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게
            처리하는지를 감독하고 있습니다.
          </p>
        </Section>

        {/* 제8조 */}
        <Section number={8} title="개인정보의 파기절차 및 방법">
          <p className="mb-3">
            회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가
            불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>파기절차:</strong> 불필요한 개인정보 및 개인정보파일은
              개인정보 보호책임자의 책임 하에 내부 방침 절차에 따라 파기합니다.
            </li>
            <li>
              <strong>파기방법:</strong> 전자적 파일 형태의 정보는 기록을 재생할
              수 없는 기술적 방법을 사용합니다. 종이에 출력된 개인정보는 분쇄기로
              분쇄하거나 소각을 통하여 파기합니다.
            </li>
          </ul>
        </Section>

        {/* 제9조 */}
        <Section number={9} title="정보주체의 권리·의무 및 행사방법">
          <p className="mb-3">
            정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지
            요구 등의 권리를 행사할 수 있습니다.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              개인정보 열람, 정정·삭제, 처리정지 요청은 아래 개인정보
              보호책임자에게 이메일로 연락하시면 지체 없이 조치하겠습니다.
            </li>
            <li>
              권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을
              통하여서도 할 수 있습니다. 이 경우 「개인정보 처리 방법에 관한
              고시」 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
            </li>
            <li>
              개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항,
              제37조 제2항에 의하여 정보주체의 권리가 제한될 수 있습니다.
            </li>
          </ul>
        </Section>

        {/* 제10조 */}
        <Section number={10} title="개인정보의 안전성 확보조치">
          <p className="mb-3">
            회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고
            있습니다.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>관리적 조치:</strong> 내부관리계획 수립·시행, 개인정보
              취급 직원의 최소화 및 교육
            </li>
            <li>
              <strong>기술적 조치:</strong> 개인정보처리시스템 등의 접근권한
              관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램
              설치
            </li>
            <li>
              <strong>물리적 조치:</strong> 개인정보가 포함된 서류, 보조저장매체
              등을 잠금장치가 있는 안전한 장소에 보관
            </li>
          </ul>
        </Section>

        {/* 제11조 */}
        <Section number={11} title="쿠키의 설치·운영 및 거부">
          <p className="mb-3">
            회사는 이용자에게 개별적인 맞춤 서비스를 제공하기 위해 이용 정보를
            저장하고 수시로 불러오는 &lsquo;쿠키(cookie)&rsquo;를 사용합니다.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>쿠키의 사용 목적:</strong> 이용자의 방문 및 이용형태,
              관심 분야 등을 파악하여 이용자에게 최적화된 정보 제공
            </li>
            <li>
              <strong>쿠키의 설치·운영 및 거부:</strong> 웹브라우저 상단의
              &lsquo;설정 &gt; 개인정보 보호&rsquo; 메뉴에서 쿠키 허용 여부를
              설정할 수 있습니다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에
              어려움이 발생할 수 있습니다.
            </li>
          </ul>
        </Section>

        {/* 제12조 */}
        <Section number={12} title="행태정보의 수집·이용">
          <p className="mb-3">
            회사는 서비스 이용 과정에서 정보주체에게 최적화된 맞춤형 서비스 및
            혜택, 온라인 광고 등을 제공하기 위하여 행태정보를 수집·이용하고
            있습니다.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>수집하는 행태정보:</strong> 웹사이트 방문 기록, 페이지
              체류 시간, 클릭 이벤트 등
            </li>
            <li>
              <strong>수집 방법:</strong> Google Analytics, Google Tag Manager를
              통한 자동 수집
            </li>
            <li>
              <strong>거부 방법:</strong> 웹브라우저의 쿠키 설정 변경 또는 Google
              Analytics Opt-out 브라우저 플러그인 설치
            </li>
          </ul>
        </Section>

        {/* 제13조 */}
        <Section number={13} title="개인정보 보호책임자">
          <p className="mb-3">
            회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보
            처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와
            같이 개인정보 보호책임자를 지정하고 있습니다.
          </p>
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 space-y-1">
            <p>
              <strong>개인정보 보호책임자</strong>
            </p>
            <p>회사명: Outstanding Pros</p>
            <p>
              이메일:{" "}
              <a
                href="mailto:tmddnjs1411@gmail.com"
                className="text-neon-cyan hover:underline"
              >
                tmddnjs1411@gmail.com
              </a>
            </p>
          </div>
        </Section>

        {/* 제14조 */}
        <Section number={14} title="개인정보 열람청구 접수·처리 부서">
          <p className="mb-3">
            정보주체는 「개인정보 보호법」 제35조에 따른 개인정보의 열람 청구를
            아래의 부서에 할 수 있습니다. 회사는 정보주체의 개인정보 열람청구가
            신속하게 처리되도록 노력하겠습니다.
          </p>
          <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 space-y-1">
            <p>
              <strong>개인정보 열람청구 접수·처리 부서</strong>
            </p>
            <p>
              이메일:{" "}
              <a
                href="mailto:tmddnjs1411@gmail.com"
                className="text-neon-cyan hover:underline"
              >
                tmddnjs1411@gmail.com
              </a>
            </p>
          </div>
        </Section>

        {/* 제15조 */}
        <Section number={15} title="정보주체의 권익 침해에 대한 구제방법">
          <p className="mb-3">
            정보주체는 개인정보 침해로 인한 구제를 받기 위하여 개인정보
            분쟁조정위원회, 한국인터넷진흥원 개인정보 침해신고센터 등에 분쟁해결이나
            상담 등을 신청할 수 있습니다.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              개인정보 분쟁조정위원회: (국번없이) 1833-6972 (
              <span className="text-gray-400">www.kopico.go.kr</span>)
            </li>
            <li>
              개인정보 침해신고센터: (국번없이) 118 (
              <span className="text-gray-400">privacy.kisa.or.kr</span>)
            </li>
            <li>
              대검찰청: (국번없이) 1301 (
              <span className="text-gray-400">www.spo.go.kr</span>)
            </li>
            <li>
              경찰청: (국번없이) 182 (
              <span className="text-gray-400">ecrm.cyber.go.kr</span>)
            </li>
          </ul>
        </Section>

        {/* 제16조 */}
        <Section number={16} title="개인정보 처리방침 변경">
          <p>
            이 개인정보처리방침은 2026년 2월 18일부터 적용됩니다. 이전의
            개인정보처리방침은 아래에서 확인하실 수 있습니다. 개인정보처리방침이
            변경되는 경우 변경 사항을 웹사이트를 통해 공지할 것입니다.
          </p>
          <ul className="list-disc pl-5 mt-3 space-y-1">
            <li>공고일자: 2026년 2월 18일</li>
            <li>시행일자: 2026년 2월 18일</li>
          </ul>
        </Section>
      </div>
    </main>
  );
}

function Section({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-white mb-4">
        제{number}조 ({title})
      </h2>
      <div className="text-gray-300 leading-relaxed space-y-3">{children}</div>
    </section>
  );
}
