import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { FilterProvider } from './context/FilterContext';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Pricing } from './pages/Pricing';
import { AiMessaging } from './pages/AiMessaging';
import { StudentMessaging } from './pages/StudentMessaging';
import { CustomerSentiment } from './pages/CustomerSentiment';
import { SurveyData } from './pages/SurveyData';
import { CreditDeepDive } from './pages/CreditDeepDive';
import { CoreValueProp } from './pages/CoreValueProp';
import { May2026Updates } from './pages/May2026Updates';
import { FeaturePlayground } from './pages/FeaturePlayground';

const LIGHT_ROUTES = ['/may-2026', '/student-messaging', '/customer-sentiment'];

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isLight = LIGHT_ROUTES.includes(location.pathname);

  useEffect(() => {
    document.body.style.backgroundColor = isLight ? '#f8f8f8' : '#1A1A1A';
    return () => { document.body.style.backgroundColor = '#1A1A1A'; };
  }, [isLight]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ marginLeft: 220, width: 'calc(100vw - 220px)', display: 'flex', flexDirection: 'column', minHeight: '100vh', background: isLight ? '#f8f8f8' : undefined }}>
        <TopBar />
        {/* 56px spacer compensates for the fixed TopBar which is removed from normal flow */}
        <div style={{ height: 56, flexShrink: 0 }} />
        <main style={{ flex: 1, padding: '28px 32px', background: isLight ? '#f8f8f8' : undefined }}>
          {children}
          {/* Global disclaimer */}
          <div style={{
            border: `1px solid ${isLight ? '#e0e0e0' : '#2a2a2a'}`,
            borderRadius: 4,
            padding: '8px 14px',
            marginTop: 40,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            background: isLight ? '#f0f0f0' : '#1A1A1A',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: isLight ? '#888' : '#555' }}>
              ⚠ Players shown are not exhaustive
            </div>
            <div style={{ fontSize: 11, color: isLight ? '#999' : '#444', lineHeight: 1.5 }}>
              • All content sourced through public / third party sources; themes are identified by AI
            </div>
            <div style={{ fontSize: 11, color: isLight ? '#999' : '#444', lineHeight: 1.5 }}>
              • Insights have been checked for ~90% accuracy, but AI can make mistakes; please use insights in an aggregated manner as much as possible
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <FilterProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/may-2026" replace />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/ai-messaging" element={<AiMessaging />} />
            <Route path="/student-messaging" element={<StudentMessaging />} />
            <Route path="/customer-sentiment" element={<CustomerSentiment />} />
            <Route path="/survey-data" element={<SurveyData />} />
            <Route path="/credit-deep-dive" element={<CreditDeepDive />} />
            <Route path="/core-value-prop" element={<CoreValueProp />} />
            <Route path="/may-2026" element={<May2026Updates />} />
            <Route path="/feature-playground" element={<FeaturePlayground />} />
          </Routes>
        </Layout>
      </FilterProvider>
    </BrowserRouter>
  );
}

export default App;
