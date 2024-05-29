
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ProgramPage from './pages/ProgramPage';
import EventPage from "./pages/EventPage";
import AnimatorPage from "./pages/AnimatorPage";
import PodcastPage from "./pages/PodCastPage";

function App() {
  return (
    <div className="App">
     
      <Router>
        <Routes>
          <Route path="/programs" element={<ProgramPage/>} />
          <Route path="/events" element={<EventPage/>} />
          <Route path="/podcasts" element={<PodcastPage/>} />
          <Route path="/animators" element={<AnimatorPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
