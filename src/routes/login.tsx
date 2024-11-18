import { createFileRoute, redirect } from "@tanstack/react-router";
import Login from "../components/Login";
import pb from "../api/client";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      redirect: (search?.redirect as string) ?? "/home",
    };
  },
  beforeLoad: ({ search }) => {
    // Prevent redirect loops by checking the path
    const redirectPath = search.redirect;
    if (pb.authStore.isValid && redirectPath !== "/login") {
      throw redirect({
        to: redirectPath,
        replace: true,
      });
    }

    return {
      isAuthenticated: pb.authStore.isValid,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  console.log("RouteComponent - search", search);
  return <Login redirect={search?.redirect} />;
}
