import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "./pages/Home";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import EventDetailPage,
 { action as deleteEventAction,
   loader as eventDetailLoader
 } from "./pages/EventDetail";

import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import ErrorPage from "./pages/Error";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";

import RootLayout from "./pages/Root";
import EventRootLayout from "./pages/EventsRoot";
import { action as manipulateEventAction } from "./components/EventForm";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventRootLayout />,
        children: [
          { 
            index: true,
            element: <EventsPage />,
            loader: eventsLoader
          },
          { 
            path: ':eventId',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction
              },
              { path: 'edit',
                element: <EditEventPage />,
                action: manipulateEventAction
              }
            ]
          },
          { 
            path: 'new',
            element: <NewEventPage />,
            action: manipulateEventAction
          }
        ]
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ]
  }
])

function App() {
  return <RouterProvider router={router}> </RouterProvider>
}

export default App;
