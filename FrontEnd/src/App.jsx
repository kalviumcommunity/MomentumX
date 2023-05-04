import Dashboard from "./Dashboard";
import Initial from "./Initial";
import "./App.css";

var newUser = true;

function App() {
    return <>{newUser ? <Initial /> : <Dashboard />}</>;
}

export default App;
