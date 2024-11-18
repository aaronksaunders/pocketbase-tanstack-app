import { createFileRoute, redirect } from "@tanstack/react-router";
import pb from "../api/client";

export const Route = createFileRoute("/_auth")({
  beforeLoad: ({ context }) => {
    if (!pb.authStore.isValid) {
      throw redirect({
        to: "/login",
        search: {
          redirect: window.location.pathname,
        },
      });
    }

    return {
      user: pb.authStore.model,
      auth: pb.authStore,
    };
  },
});
