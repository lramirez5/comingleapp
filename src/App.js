import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AdminPanelComponent } from './components/AdminPanel';
import { HomepageComponent } from './components/Homepage';
import { AdminGalleryComponent } from './components/AdminGallery';
import { GalleryComponent } from './components/Gallery'
import { ContactComponent } from './components/Contact';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomepageComponent />
        </Route>
        <Route path="/gallery">
          <GalleryComponent />
        </Route>
        <Route path="/admin/gallery" exact>
          <AdminGalleryComponent />
        </Route>
        <Route path="/contact">
          <ContactComponent />
        </Route>
        <Route path="/admin" exact>
          {/*<AdminPanelComponent />*/}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;