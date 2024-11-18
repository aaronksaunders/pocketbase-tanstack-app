import * as React from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import pb from "../api/client";

export const Route = createFileRoute("/")({
  // component: RouteComponent,
  beforeLoad: ({ context }) => {
    const { auth, user } = context as {
      auth: typeof pb.authStore;
      user: typeof pb.authStore.model;
    };

    console.log("beforeLoad", context);
    // Check if user is authenticated with PocketBase
    if (!auth.isValid) {
      throw redirect({
        to: "/login",
        search: {
          redirect: window.location.pathname,
        },
        statusCode: 301,
      });
    }

    return {
      user: user,
    };
  },
  loader: async () => {
    throw redirect({
      to: "/home/dashboard",
      statusCode: 200,
      search: { page: 1, perPage: 10 },
    });
  },
});
