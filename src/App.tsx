import { Layout } from './components/Layout';
import { Introduction } from './components/sections/Introduction';
import { Background } from './components/sections/Background';
import { WhatWeDo } from './components/sections/WhatWeDo';
import { OrgStructure } from './components/sections/OrgStructure';
import { ProjectHistory } from './components/sections/ProjectHistory';
import { EngageWithUs } from './components/sections/EngageWithUs';
import { Admin } from './components/sections/Admin';

function App() {
  return (
    <Layout>
      <Introduction />
      <Background />
      <WhatWeDo />
      <OrgStructure />
      <ProjectHistory />
      <EngageWithUs />
      <Admin />
    </Layout>
  );
}

export default App;
