import { sessionStore } from './state/session-store.js';
import { createUploadPanel } from './components/upload-panel.js';
import { createGenerationMontage } from './components/generation-montage.js';
import { createResultView } from './components/result-view.js';
import { createHaircutScene } from './components/haircut-scene.js';
import { createReconstructedScene } from './components/reconstructed-scene.js';

const app = document.querySelector('#app');

let currentTeardown = null;
let currentScreen = null;

function renderApp(state) {
  // 3D 场景自己管理内部更新；停留在 3D 页时不整页重渲染，否则每剪一刀都会重建场景
  if (state.screen === '3d' && currentScreen === '3d') return;

  const screenChanged = state.screen !== currentScreen;
  if (currentTeardown) {
    try {
      currentTeardown();
    } catch (e) {
      console.warn('Component teardown error:', e);
    }
    currentTeardown = null;
  }
  currentScreen = state.screen;

  app.innerHTML = `
    <main class="shell" data-screen="${state.screen}">
      <header>
        <div class="eyebrow">HAIRFIT / BEFORE THE CHAIR</div>
        <h1>在理发之前，做出理发后的样子。</h1>
        <p class="lede">先看见适不适合，再决定怎么剪。</p>
      </header>
      <section id="stage"></section>
    </main>
  `;

  const stage = document.querySelector('#stage');
  if (!stage) return;

  switch (state.screen) {
    case 'upload':
      currentTeardown = createUploadPanel(stage, sessionStore)?.teardown;
      break;
    case 'generating':
      currentTeardown = createGenerationMontage(stage, sessionStore)?.teardown;
      break;
    case 'result':
      currentTeardown=createResultView(stage, sessionStore)?.teardown;
      break;
    case '3d': {
      const component = state.reconstruction?.status==='ready'
        ? createReconstructedScene(stage, sessionStore)
        : createHaircutScene(stage, sessionStore);
      if (component?.teardown) {
        currentTeardown = component.teardown;
      }
      break;
    }
    default:
      createUploadPanel(stage, sessionStore);
  }
  if (screenChanged) window.scrollTo(0, 0);
}

// Subscribe to store updates
sessionStore.subscribe(renderApp);

// Expose for browser debugging & automated tests
window.__sessionStore = sessionStore;

// Initial render
renderApp(sessionStore.state);
