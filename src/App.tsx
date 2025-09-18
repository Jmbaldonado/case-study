import SlideDetail from '@/components/SlideDetails';
import SlideList from '@/components/SlideList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SlideList />} />
        <Route path='/slide/:id' element={<SlideDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
