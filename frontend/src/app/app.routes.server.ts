import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'login',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'register',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'tasks',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'tasks/new',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'tasks/:id',
    renderMode: RenderMode.Prerender
  }
];
