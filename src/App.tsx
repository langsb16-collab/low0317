import { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FilePlus, 
  Upload, 
  FileText, 
  Gavel, 
  Coins, 
  Search, 
  Users, 
  MessageSquare, 
  Bot, 
  Globe, 
  Menu, 
  X, 
  Mic, 
  Camera, 
  Send,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  Phone,
  Video,
  Languages,
  MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from './hooks/useTranslation';
import { Locale } from './locales';

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
      active 
        ? 'bg-samsung-blue text-white shadow-lg' 
        : 'text-slate-600 hover:bg-slate-100'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium text-sm">{label}</span>
  </button>
);

const ChatWindow = ({ isOpen, onClose }: any) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    { id: 1, text: "안녕하세요! 실시간 법률 상담 채팅입니다.", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-24 left-6 w-80 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-slate-200"
    >
      <div className="bg-samsung-blue p-4 text-white flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="font-bold">{t('chat')}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Phone size={16} className="cursor-pointer hover:text-slate-200" />
          <Video size={16} className="cursor-pointer hover:text-slate-200" />
          <X size={20} onClick={onClose} className="cursor-pointer hover:text-slate-200" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              msg.sender === 'user' ? 'bg-samsung-blue text-white' : 'bg-slate-100 text-slate-800'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-slate-100 flex items-center space-x-2">
        <button className="p-2 text-slate-400 hover:text-samsung-blue">
          <Mic size={20} />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className="flex-1 bg-slate-50 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-samsung-blue"
        />
        <button className="p-2 bg-samsung-blue text-white rounded-full hover:bg-samsung-blue-hover">
          <Send size={16} />
        </button>
      </div>
    </motion.div>
  );
};

const FAQRobot = ({ isOpen, onClose }: any) => {
  const { t } = useTranslation();
  const faqs = [
    { q: "이 플랫폼은 무엇인가요?", a: "AI 기반 전자소송 및 채권추심 플랫폼입니다." },
    { q: "회원가입이 필요한가요?", a: "아니요, 로그인 없이 모든 기능을 무료로 사용 가능합니다." },
    { q: "어떤 사건을 처리할 수 있나요?", a: "민사, 형사, 채권추심, 양육비 청구 등 다양한 법률 사건을 지원합니다." },
    { q: "증거 업로드가 가능한가요?", a: "텍스트, 사진, 음성 녹취 등 모든 형태의 증거를 업로드하여 분석할 수 있습니다." },
  ];

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      className="fixed bottom-24 right-6 w-80 max-h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-slate-200"
    >
      <div className="bg-robot-orange p-4 text-white flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Bot size={20} />
          <span className="font-bold">AI FAQ Robot</span>
        </div>
        <X size={20} onClick={onClose} className="cursor-pointer hover:text-slate-200" />
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">
        {faqs.map((faq, i) => (
          <details key={i} className="group bg-slate-50 rounded-xl overflow-hidden border border-slate-100">
            <summary className="p-4 text-sm font-medium cursor-pointer list-none flex justify-between items-center hover:bg-slate-100">
              {faq.q}
              <ChevronRight size={16} className="group-open:rotate-90 transition-transform" />
            </summary>
            <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const { t, locale, setLocale } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: t('dashboard') },
    { id: 'case', icon: FilePlus, label: t('caseRegistration') },
    { id: 'analysis', icon: Search, label: t('aiAnalysis') },
    { id: 'lawsuit', icon: Gavel, label: t('eLawsuit') },
    { id: 'debt', icon: Coins, label: t('debtCollection') },
    { id: 'childSupport', icon: Users, label: '양육비 청구' },
    { id: 'evidence', icon: ShieldCheck, label: '증거 관리' },
    { id: 'market', icon: TrendingUp, label: t('debtMarket') },
    { id: 'assets', icon: ShieldCheck, label: t('assetTracking') },
    { id: 'lawyer', icon: Users, label: t('lawyerConsult') },
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult({
        type: '민사 (대여금 반환 청구)',
        probability: 85,
        steps: ['내용증명 발송', '지급명령 신청', '통장 가압류'],
        summary: '차용증 및 이체 내역이 명확하여 승소 가능성이 매우 높습니다.'
      });
      setIsAnalyzing(false);
      setActiveTab('analysis');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className={`hidden md:flex flex-col w-64 bg-white border-r border-slate-200 p-6 transition-all ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full w-0 p-0'}`}>
        <div className="flex items-center space-x-3 mb-10">
          <div className="w-10 h-10 bg-samsung-blue rounded-xl flex items-center justify-center text-white shadow-lg">
            <Gavel size={24} />
          </div>
          <h1 className="text-xl font-black text-samsung-blue tracking-tighter">AI LEGAL</h1>
        </div>
        
        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
            />
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <div className="bg-slate-50 p-4 rounded-2xl">
            <p className="text-xs font-bold text-samsung-blue mb-1 uppercase tracking-widest">{t('guestMode')}</p>
            <p className="text-[10px] text-slate-500 leading-tight">모든 기능을 로그인 없이 즉시 이용할 수 있습니다.</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Header */}
        <header className="h-16 bg-white border-bottom border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2 text-slate-600">
              <Menu size={24} />
            </button>
            <h2 className="text-sm font-bold text-slate-800 hidden md:block">{t('headline')}</h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-slate-100 rounded-full px-3 py-1.5 space-x-2">
              <Globe size={16} className="text-slate-500" />
              <select 
                value={locale} 
                onChange={(e) => setLocale(e.target.value as Locale)}
                className="bg-transparent border-none text-xs font-bold focus:ring-0 cursor-pointer"
              >
                <option value="ko">한국어</option>
                <option value="en">English</option>
                <option value="zh">中文</option>
                <option value="ja">日本語</option>
                <option value="ru">Русский</option>
                <option value="hi">हिन्दी</option>
                <option value="pt">Português</option>
                <option value="id">Indonesia</option>
                <option value="ar">العربية</option>
                <option value="af">Afrikaans</option>
              </select>
            </div>
            <button className="p-2 text-slate-400 hover:text-samsung-blue">
              <MoreVertical size={20} />
            </button>
          </div>
        </header>

        {/* Scrollable View */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 scrollbar-hide">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-5xl mx-auto space-y-8"
              >
                <section className="bg-samsung-blue rounded-[32px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                  <div className="relative z-10 max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                      AI가 당신의 법률 문제를 <br />즉시 해결해 드립니다.
                    </h2>
                    <p className="text-lg opacity-80 mb-8 font-medium">
                      텍스트, 음성, 사진만 업로드하세요. <br />
                      사건 분석부터 전자소송 제출까지 한 번에 가능합니다.
                    </p>
                    <button 
                      onClick={() => setActiveTab('case')}
                      className="bg-white text-samsung-blue px-8 py-4 rounded-full font-bold flex items-center space-x-2 hover:bg-slate-100 transition-all shadow-lg"
                    >
                      <span>{t('caseRegistration')}</span>
                      <ArrowRight size={20} />
                    </button>
                  </div>
                  <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                  <div className="absolute right-10 top-10 opacity-20">
                    <Gavel size={200} />
                  </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer" onClick={() => setActiveTab('analysis')}>
                    <div className="w-12 h-12 bg-blue-50 text-samsung-blue rounded-2xl flex items-center justify-center mb-4">
                      <Search size={24} />
                    </div>
                    <h3 className="font-bold text-lg mb-2">AI 사건 분석</h3>
                    <p className="text-sm text-slate-500">업로드된 증거를 바탕으로 승소 확률과 법적 근거를 분석합니다.</p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer" onClick={() => setActiveTab('lawsuit')}>
                    <div className="w-12 h-12 bg-orange-50 text-robot-orange rounded-2xl flex items-center justify-center mb-4">
                      <FileText size={24} />
                    </div>
                    <h3 className="font-bold text-lg mb-2">문서 자동 생성</h3>
                    <p className="text-sm text-slate-500">소장, 지급명령 신청서 등 복잡한 서류를 AI가 즉시 작성합니다.</p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer" onClick={() => setActiveTab('market')}>
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-4">
                      <TrendingUp size={24} />
                    </div>
                    <h3 className="font-bold text-lg mb-2">채권 회수 마켓</h3>
                    <p className="text-sm text-slate-500">회수가 어려운 채권을 평가하여 마켓에서 거래할 수 있습니다.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'case' && (
              <motion.div
                key="case"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-3xl mx-auto"
              >
                <div className="bg-white rounded-[32px] p-8 shadow-xl border border-slate-100">
                  <h2 className="text-2xl font-black mb-6 text-samsung-blue">{t('caseRegistration')}</h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <button className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 hover:border-samsung-blue hover:bg-blue-50 transition-all group">
                        <FileText size={32} className="text-slate-400 group-hover:text-samsung-blue mb-2" />
                        <span className="text-xs font-bold text-slate-600">텍스트 입력</span>
                      </button>
                      <button className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 hover:border-samsung-blue hover:bg-blue-50 transition-all group">
                        <Camera size={32} className="text-slate-400 group-hover:text-samsung-blue mb-2" />
                        <span className="text-xs font-bold text-slate-600">사진/문서</span>
                      </button>
                      <button className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 hover:border-samsung-blue hover:bg-blue-50 transition-all group">
                        <Mic size={32} className="text-slate-400 group-hover:text-samsung-blue mb-2" />
                        <span className="text-xs font-bold text-slate-600">음성 녹취</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">사건 내용 요약</label>
                      <textarea 
                        className="w-full h-40 bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-samsung-blue"
                        placeholder="사건의 경위를 자유롭게 입력하세요..."
                      />
                    </div>

                    <button 
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="w-full bg-samsung-blue text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-samsung-blue-hover transition-all flex items-center justify-center space-x-3"
                    >
                      {isAnalyzing ? (
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Search size={20} />
                          <span>{t('analyze')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'analysis' && (
              <motion.div
                key="analysis"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="max-w-4xl mx-auto space-y-6"
              >
                <div className="bg-white rounded-[32px] p-8 shadow-xl border border-slate-100">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h2 className="text-3xl font-black text-samsung-blue mb-2">{t('aiAnalysis')}</h2>
                      <p className="text-slate-500 font-medium">분석 완료: 2026.03.17 12:00</p>
                    </div>
                    <div className="bg-blue-50 text-samsung-blue px-4 py-2 rounded-full font-bold text-sm">
                      {analysisResult?.type || '분석 대기 중'}
                    </div>
                  </div>

                  {!analysisResult ? (
                    <div className="text-center py-20">
                      <Search size={48} className="mx-auto text-slate-200 mb-4" />
                      <p className="text-slate-400">사건을 먼저 등록하고 분석을 시작하세요.</p>
                      <button onClick={() => setActiveTab('case')} className="mt-4 text-samsung-blue font-bold">사건 등록하러 가기</button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="bg-slate-50 p-6 rounded-2xl">
                          <h3 className="font-bold text-slate-700 mb-4 flex items-center space-x-2">
                            <TrendingUp size={18} className="text-samsung-blue" />
                            <span>{t('probability')}</span>
                          </h3>
                          <div className="flex items-end space-x-2">
                            <span className="text-5xl font-black text-samsung-blue">{analysisResult.probability}%</span>
                            <span className="text-sm text-slate-400 mb-2 font-bold">승소 예상</span>
                          </div>
                          <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${analysisResult.probability}%` }}
                              className="h-full bg-samsung-blue"
                            />
                          </div>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl">
                          <h3 className="font-bold text-slate-700 mb-4 flex items-center space-x-2">
                            <FileText size={18} className="text-samsung-blue" />
                            <span>사건 요약</span>
                          </h3>
                          <p className="text-sm text-slate-600 leading-relaxed">
                            {analysisResult.summary}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h3 className="font-bold text-slate-700 flex items-center space-x-2">
                          <ChevronRight size={18} className="text-samsung-blue" />
                          <span>{t('recommendedStep')}</span>
                        </h3>
                        <div className="space-y-3">
                          {analysisResult.steps.map((step: string, i: number) => (
                            <div key={i} className="flex items-center space-x-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                              <div className="w-8 h-8 bg-samsung-blue text-white rounded-full flex items-center justify-center text-xs font-bold">
                                {i + 1}
                              </div>
                              <span className="font-bold text-slate-700">{step}</span>
                              <button className="ml-auto text-xs font-bold text-samsung-blue hover:underline">
                                실행하기
                              </button>
                            </div>
                          ))}
                        </div>
                        
                        <div className="pt-4">
                          <button onClick={() => setActiveTab('lawsuit')} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-black transition-all">
                            <FileText size={20} />
                            <span>{t('generateDoc')}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'lawsuit' && (
              <motion.div key="lawsuit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white rounded-[32px] p-8 shadow-xl border border-slate-100">
                  <h2 className="text-2xl font-black text-samsung-blue mb-6">{t('eLawsuit')}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {['소장 생성', '지급명령 신청', '가압류 신청', '채권압류 신청', '형사 고소장', '양육비 청구서'].map((doc) => (
                      <div key={doc} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-samsung-blue transition-all cursor-pointer group">
                        <div className="flex justify-between items-center mb-4">
                          <FileText size={24} className="text-samsung-blue" />
                          <ArrowRight size={16} className="text-slate-300 group-hover:text-samsung-blue transition-all" />
                        </div>
                        <h3 className="font-bold text-slate-800">{doc}</h3>
                        <p className="text-xs text-slate-500 mt-2">AI가 법률 규정에 맞춰 문서를 자동 생성합니다.</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'debt' && (
              <motion.div key="debt" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white rounded-[32px] p-8 shadow-xl border border-slate-100">
                  <h2 className="text-2xl font-black text-samsung-blue mb-6">{t('debtCollection')}</h2>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                      <h3 className="font-bold text-samsung-blue mb-2">미수금 회수 전략</h3>
                      <p className="text-sm text-slate-600">채무자의 재산 상태와 채권 규모를 분석하여 최적의 회수 절차를 제안합니다.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="p-4 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50">채무자 정보 등록</button>
                      <button className="p-4 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:bg-slate-50">내용증명 자동 발송</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'childSupport' && (
              <motion.div key="childSupport" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white rounded-[32px] p-8 shadow-xl border border-slate-100">
                  <h2 className="text-2xl font-black text-samsung-blue mb-6">양육비 청구</h2>
                  <div className="bg-slate-50 p-8 rounded-2xl text-center">
                    <Users size={48} className="mx-auto text-samsung-blue mb-4" />
                    <h3 className="text-xl font-bold mb-2">미지급 양육비 해결</h3>
                    <p className="text-slate-500 mb-6">과거 양육비 청구부터 직접지급명령까지 AI가 도와드립니다.</p>
                    <button className="bg-samsung-blue text-white px-8 py-3 rounded-full font-bold">청구서 작성 시작</button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'evidence' && (
              <motion.div key="evidence" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white rounded-[32px] p-8 shadow-xl border border-slate-100">
                  <h2 className="text-2xl font-black text-samsung-blue mb-6">증거 관리 시스템</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['사진 증거', '음성 녹취', '문자 기록', '계약서'].map((type) => (
                      <div key={type} className="aspect-square bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-100 hover:bg-slate-100 cursor-pointer">
                        <Upload size={24} className="text-slate-400 mb-2" />
                        <span className="text-xs font-bold text-slate-600">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'market' && (
              <motion.div key="market" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white rounded-[32px] p-8 shadow-xl border border-slate-100">
                  <h2 className="text-2xl font-black text-samsung-blue mb-6">{t('debtMarket')}</h2>
                  <div className="bg-green-50 p-6 rounded-2xl border border-green-100 mb-6">
                    <p className="text-sm text-green-800 font-medium">회수가 어려운 채권을 전문 추심업체나 투자자에게 판매할 수 있습니다.</p>
                  </div>
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-slate-800">물품대금 미수금 채권</h4>
                          <p className="text-xs text-slate-500">채권액: 15,000,000원 | AI 평가가: 4,500,000원</p>
                        </div>
                        <button className="bg-samsung-blue text-white px-4 py-2 rounded-lg text-xs font-bold">채권 등록</button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'assets' && (
              <motion.div key="assets" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white rounded-[32px] p-8 shadow-xl border border-slate-100">
                  <h2 className="text-2xl font-black text-samsung-blue mb-6">{t('assetTracking')}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['사업자 정보', '부동산 소유 현황', '차량 등록 정보', '법인 등기부'].map((asset) => (
                      <div key={asset} className="p-4 bg-slate-50 rounded-xl flex items-center justify-between">
                        <span className="font-bold text-slate-700">{asset}</span>
                        <button className="text-xs bg-white border border-slate-200 px-3 py-1 rounded-md font-bold text-samsung-blue">조회하기</button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'lawyer' && (
              <motion.div key="lawyer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white rounded-[32px] p-8 shadow-xl border border-slate-100">
                  <h2 className="text-2xl font-black text-samsung-blue mb-6">{t('lawyerConsult')}</h2>
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center space-x-4 p-4 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer">
                        <div className="w-12 h-12 bg-slate-200 rounded-full" />
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-800">김변호사 (민사 전문)</h4>
                          <p className="text-xs text-slate-500">성공 사례 500건+ | 실시간 상담 가능</p>
                        </div>
                        <button className="bg-samsung-blue text-white px-4 py-2 rounded-xl text-xs font-bold">예약하기</button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Components */}
        <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        <FAQRobot isOpen={isFAQOpen} onClose={() => setIsFAQOpen(false)} />

        {/* Floating Buttons */}
        <div className="fixed bottom-6 left-6 z-40">
          <button 
            onClick={() => setIsChatOpen(!isChatOpen)}
            className="w-14 h-14 bg-samsung-blue text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
          >
            <MessageSquare size={28} />
          </button>
        </div>

        <div className="fixed bottom-6 right-6 z-40">
          <button 
            onClick={() => setIsFAQOpen(!isFAQOpen)}
            className="w-14 h-14 bg-robot-orange text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
          >
            <Bot size={28} />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden h-16 bg-white border-t border-slate-200 flex items-center justify-around px-2 sticky bottom-0 z-30">
          <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center ${activeTab === 'dashboard' ? 'text-samsung-blue' : 'text-slate-400'}`}>
            <LayoutDashboard size={20} />
            <span className="text-[10px] font-bold mt-1">홈</span>
          </button>
          <button onClick={() => setActiveTab('case')} className={`flex flex-col items-center ${activeTab === 'case' ? 'text-samsung-blue' : 'text-slate-400'}`}>
            <FilePlus size={20} />
            <span className="text-[10px] font-bold mt-1">등록</span>
          </button>
          <button onClick={() => setActiveTab('lawsuit')} className={`flex flex-col items-center ${activeTab === 'lawsuit' ? 'text-samsung-blue' : 'text-slate-400'}`}>
            <Gavel size={20} />
            <span className="text-[10px] font-bold mt-1">소송</span>
          </button>
          <button onClick={() => setActiveTab('debt')} className={`flex flex-col items-center ${activeTab === 'debt' ? 'text-samsung-blue' : 'text-slate-400'}`}>
            <Coins size={20} />
            <span className="text-[10px] font-bold mt-1">추심</span>
          </button>
        </nav>
      </main>
    </div>
  );
}
