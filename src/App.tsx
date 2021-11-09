import { Button, ButtonCounter } from './Components/Button'
import { Home } from './Pages/Home';
import { NewRoom } from './Pages/NewRoom';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { AuthContextProvider } from './contexts/AuthContext'
import { Room } from './Pages/Room';
import { AdminRoom } from './Pages/AdminRoom';

function App() {

  return (
    <>
      {/* <h1>Hello World</h1>
      <Button />
      <Button text='Clique aqui 1'/>
      <Button>Clique aqui no children</Button>
      <ButtonCounter /> */}
      <BrowserRouter>
        <AuthContextProvider>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/rooms/new' component={NewRoom} />
            <Route path='/rooms/:id' component={Room} />
            <Route path='/admin/rooms/:id' component={AdminRoom} />
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>

    </>
  );
}

export default App;
