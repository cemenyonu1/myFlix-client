import { createRoot } from 'react-dom/client';

// Bundle `./index.scss`
import "./index.scss";

// Main component
const MyFlixApplication = () => {
    return (
        <div className="my-flix">
            <div>Good morning</div>
        </div>
    );
};

// Locates the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render the app in the root DOM element
root.render(<MyFlixApplication />);