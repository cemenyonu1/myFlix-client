import { createRoot } from "react-dom/client";
import Container from "react-bootstrap/Container";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { MainView } from "./components/main-view/main-view";


// Main component
const MyFlixApplication = () => {
    return (
        <Container>
            <BrowserRouter>
                <MainView />
            </BrowserRouter>
        </Container>
    );
};

// Locates the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render the app in the root DOM element
root.render(<MyFlixApplication />);