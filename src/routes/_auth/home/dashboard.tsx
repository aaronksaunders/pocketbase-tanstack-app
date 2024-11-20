import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import pb from "../../../api/client";

type PageSearch = {
  page: number;
  perPage: number;
};

export const Route = createFileRoute("/_auth/home/dashboard")({
  component: RouteComponent,
  // beforeLoad: ({ context, search }) => {

  validateSearch: (search): PageSearch => ({
    page: Number(search?.page ?? 1),
    perPage: Number(search?.perPage ?? 10),
  }),
  loaderDeps: ({ search }) => ({
    page: search.page ?? 1,
    perPage: search.perPage ?? 10,
  }),
  loader: async ({ deps }) => {
    const { page, perPage } = deps;
    console.log("page", page, "perPage", perPage);

    try {
      const contacts = await pb.collection("contacts").getList(page, perPage, {
        sort: "-created",
      });

      return {
        contacts: contacts.items,
        total: contacts.totalItems,
        page,
        perPage,
      };
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error;
    }
  },
});

function RouteComponent() {
  const { contacts, total, page, perPage } = Route.useLoaderData();
  const navigate = useNavigate();
  const search = Route.useSearch();

  const handlePageChange = (newPage: number) => {
    navigate({
      to: "/home/dashboard",
      search: {
        ...search,
        page: newPage,
      },
    });
  };

  return (
    <div style={{ padding: "20px", paddingTop: "0px" }}>
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Contacts ({total})
      </h2>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f5f5f5" }}>
              <th style={tableHeaderStyle}>Name</th>
              <th style={tableHeaderStyle}>Email</th>
              <th style={tableHeaderStyle}>Created</th>
              <th style={tableHeaderStyle}>Updated</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr
                key={contact.id}
                // style={{
                //   "&:hover": {
                //     backgroundColor: "#f9f9f9",
                //   },
                // }}
              >
                <td style={tableCellStyle}>{contact.email.split("@")[0]}</td>
                <td style={tableCellStyle}>{contact.email}</td>
                <td style={tableCellStyle}>
                  {new Date(contact.created).toLocaleDateString()}
                </td>
                <td style={tableCellStyle}>
                  {new Date(contact.updated).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        <button
          onClick={() => handlePageChange(Number(page) - 1)}
          disabled={page <= 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => handlePageChange(Number(page) + 1)}
          disabled={page * perPage >= total}
        >
          Next
        </button>
      </div>
    </div>
  );
}

const tableHeaderStyle = {
  border: "1px solid #ddd",
  padding: "12px",
  textAlign: "left" as const,
  backgroundColor: "#f5f5f5",
};

const tableCellStyle = {
  border: "1px solid #ddd",
  padding: "12px",
  textAlign: "left" as const,
};
