import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { OrderTable } from "./table";
import axios from "axios";
import { cleanup } from "./modal-slice";

const Schema = Yup.object({
  firstName: Yup.string()
    .max(20, "Must be 15 characters or less")
    .min(1, "Must be 2 characters or more")
    .required("Required"),
  lastName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  products: Yup.array()
    .of(
      Yup.object({
        order: Yup.number().min(1, "Must be greater than or equal to 1"),
      })
    )
    .min(1),
});

export const ModalForm = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => {
    return state.makeOrder.products;
  });
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        products: products,
      }}
      validationSchema={Schema}
      onSubmit={(values, args) => {
        const { setSubmitting } = args;
        // alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
        const body = {
          id: 0,
          createdAt: new Date(),
          products: values.products.map((el) => {
            return { id: el.id, amount: el.order, price: el.price };
          }),
        };
        axios
          .post("http://localhost:3010/order", body)
          .then((res) => {
            props.close();
            dispatch(cleanup());
          })
          .catch((error) => console.error(error));
      }}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit} noValidate>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexDirection: "initial",
              justifyContent: "space-around",
            }}
          >
            <TextField
              error={formik.touched.firstName && formik.errors.firstName}
              helperText={!!formik.errors.firstName}
              id="firstName"
              type="text"
              label="First name"
              margin="normal"
              {...formik.getFieldProps("firstName")}
            />

            <TextField
              error={formik.touched.lastName && formik.errors.lastName}
              helperText={formik.errors.lastName}
              id="lastName"
              type="text"
              label="Last name"
              margin="normal"
              {...formik.getFieldProps("lastName")}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              error={formik.touched.email && formik.errors.email}
              helperText={formik.errors.email}
              id="email"
              type="email"
              label=" Email"
              {...formik.getFieldProps("email")}
            />
          </Box>
          <OrderTable products={products} formik={formik} />
          <Box
            sx={{
              m: "2",
              display: "flex",
              flexDirection: "column",
              flexDirection: "inherit",
            }}
          >
            <Button type="submit" color="success">
              Submit
            </Button>
            <Button onClick={props.close} color="warning">
              Cancel
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
