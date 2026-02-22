import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import Layout from './components/Layout';
import Home from './pages/Home';
import Modules from './pages/Modules';
import CareerPath from './pages/CareerPath';
import StreamSelector from './pages/StreamSelector';
import StreamResult from './pages/StreamResult';
import IndiaVsAbroad from './pages/IndiaVsAbroad';
import Chatbot from './pages/Chatbot';
import FutureMap from './pages/FutureMap';
import DegreeFinder from './pages/DegreeFinder';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const modulesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/modules',
  component: Modules,
});

const careerPathRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/career-path',
  component: CareerPath,
});

const streamSelectorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/stream-selector',
  component: StreamSelector,
});

const streamResultRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/stream-result',
  component: StreamResult,
});

const indiaVsAbroadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/india-vs-abroad',
  component: IndiaVsAbroad,
});

const chatbotRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chatbot',
  component: Chatbot,
});

const futureMapRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/futuremap',
  component: FutureMap,
});

const degreeFinderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/degree-finder',
  component: DegreeFinder,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: Contact,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: Profile,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminDashboard,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  modulesRoute,
  careerPathRoute,
  streamSelectorRoute,
  streamResultRoute,
  indiaVsAbroadRoute,
  chatbotRoute,
  futureMapRoute,
  degreeFinderRoute,
  aboutRoute,
  contactRoute,
  loginRoute,
  profileRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}
