import { withAuthenticator } from '@aws-amplify/ui-react';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Мое веб-приложение</h1>
      </header>
      <main>
        {/* Основной контент приложения */}
      </main>
    </div>
  );
}

export default withAuthenticator(App);