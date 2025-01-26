import { createRoot } from 'react-dom/client';

import { MainView } from './components/main-view/main-view';

// Bundle `./index.scss`
import './index.scss';

// Main component
const MyFlixApplication = () => {
    return <MainView />;
};

// Locates the root of your app
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render the app in the root DOM element
root.render(<MyFlixApplication />);