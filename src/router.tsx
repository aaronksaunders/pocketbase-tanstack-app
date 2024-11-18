import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import pb from "./api/client";

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    auth: pb.authStore,
    user: pb.authStore.model,
  },
  defaultPendingComponent: () => null,
  defaultPendingMs: 1000,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
