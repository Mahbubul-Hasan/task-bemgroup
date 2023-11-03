import { useLoginMutation } from "@/app/features/auth/authApi";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import * as Yup from "yup";

const LoginPage = () => {
    const [login] = useLoginMutation();

    const { push } = useRouter();

    return (
        <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={Yup.object({
                username: Yup.string().email("Invalid email address").required("Required"),
                password: Yup.string().required("Required").min(6, "Must be at least 6 characters long"),
            })}
            onSubmit={(values) => {
                login(values)
                    .unwrap.then((data) => {
                        push("/");
                    })
                    .catch((error) => {
                        console.log("🚀 ~ error:", error);
                        alert(error?.username[0]);
                    });
            }}
        >
            <Form>
                <label htmlFor="username">Email Address</label>
                <br />
                <Field name="username" type="email" />
                <ErrorMessage name="username" />
                <br />
                <br />

                <label htmlFor="password">Password</label>
                <br />
                <Field name="password" type="password" />
                <ErrorMessage name="password" />

                <br />
                <br />
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    );
};

export default LoginPage;
