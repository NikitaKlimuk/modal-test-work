import { QueryClient, QueryClientProvider } from "react-query";
import MainPage from "./pages/mainPage";
import "./App.scss";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <MainPage />
      </div>
    </QueryClientProvider>
  );
}

export default App;
