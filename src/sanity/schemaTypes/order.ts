// order // schema
export default {
  name: "order",
  type: "document",
  title: "Order",
  fields: [
    {
      name: "firstName",
      title: "First Name",
      type: "string",
    },
    {
      name: "lastName",
      title: "Last Name",
      type: "string",
    },
    {
      name: "address",
      title: "Address",
      type: "string",
    },
    {
      name: "city",
      title: "City",
      type: "string",
    },

    {
      name: "phone",
      title: "Phone",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "cartItems",
      title: "Cart Items",
      type: "array",
      of: [{ type: "reference", to: { type: "product" } }],
    },
    {
      name: "total",
      title: "Total",
      type: "number",
    },
    {
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "In Progress", value: "pending" },
          { title: "Confirmed", value: "success" },
          { title: "On the Way", value: "dispatch" },
        ],
        layout: "radio",
      },
      initialValue: "pending",
    },
    {
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
    },
  ],
};
