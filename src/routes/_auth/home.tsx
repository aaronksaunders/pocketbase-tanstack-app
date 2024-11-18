import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
  Link,
} from "@tanstack/react-router";
import pb from "../../api/client";
import { logout } from "../../api/auth";
import { router } from "../../router";
import { useEffect } from "react";

// Define the loader data type
interface LoaderData {
  user: typeof pb.authStore.model;
  avatarUrl: string | null;
}

export const Route = createFileRoute("/_auth/home")({
  component: HomeRouteComponent,
  loader: async (): Promise<LoaderData> => {
    console.log("loader", Route.fullPath);
    if (!pb.authStore.isValid) {
      throw redirect({
        to: "/login",
        search: { redirect: "/home/dashboard" },
        replace: true,
      });
    }

    const user = pb.authStore.model;
    const avatarUrl = user?.avatar
      ? pb.files.getUrl(user, user.avatar, {
          thumb: "100x100",
        })
      : null;

    if (window.location.pathname === "/home") {
      throw redirect({
        to: "/home/dashboard",
        replace: true,
        search: { page: 1, perPage: 10 },
      });
    }

    return {
      user,
      avatarUrl,
    };
  },
});

function HomeRouteComponent() {
  const navigate = useNavigate();
  const { user, avatarUrl } = Route.useLoaderData();

  useEffect(() => {
    // loadSeedData();
  }, []);

  const handleLogout = async () => {
    await logout();
    await router.invalidate();

    navigate({
      to: "/login",
      search: { redirect: "/home" },
      replace: true,
      startTransition: false,
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          minWidth: "200px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <p>{user?.name}</p>
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt={`${user?.name}'s avatar`}
              height={100}
              style={{ borderRadius: "50%" }}
            />
          )}
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link
            to="/home/dashboard"
            activeProps={{ style: { fontWeight: "bold" } }}
            search={{ page: 1, perPage: 10 }}
          >
            Dashboard
          </Link>
        </nav>

        <div style={{ marginTop: "20px" }}>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div
        style={{
          border: "1px solid black",
          padding: "20px",
          flex: 1,
          minHeight: "500px",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
