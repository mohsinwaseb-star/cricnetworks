import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LiveScoresTicker from './components/LiveScoresTicker';
import Footer from './components/Footer';
import Home from './pages/Home';
import LiveScores from './pages/LiveScores';
import MatchDetail from './pages/MatchDetail';
import Series from './pages/Series';
import Teams from './pages/Teams';
import Rankings from './pages/Rankings';
import Stats from './pages/Stats';
import News from './pages/News';
import Videos from './pages/Videos';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <LiveScoresTicker />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scores" element={<LiveScores />} />
            <Route path="/match/:id" element={<MatchDetail />} />
            <Route path="/series" element={<Series />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/rankings" element={<Rankings />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<News />} />
            <Route path="/videos" element={<Videos />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
