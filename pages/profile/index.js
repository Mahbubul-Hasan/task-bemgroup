import { useLoginMutation } from "@/app/features/auth/authApi";
import { userSelector } from "@/app/features/auth/authSlice";
import { useUpdateProfileMutation } from "@/app/features/profile/profileAPI";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";

const Profile = () => {
    const user = useSelector(userSelector);
    const [updateProfile] = useUpdateProfileMutation();

    const handleLogout = () => {
        dispatch(logOut());
        deleteCookie("token");
        push("/");
    };

    return (
        <>
            <h3>Profile</h3>
            <br />
            <br />
            <Formik
                initialValues={{ first_name: user?.first_name, last_name: user?.last_name }}
                validationSchema={Yup.object({
                    first_name: Yup.string().required("Required"),
                    last_name: Yup.string().required("Required"),
                })}
                onSubmit={(values) => {
                    updateProfile(values)
                        .unwrap.then(() => {
                            alert("Info updated!!!");
                        })
                        .catch((error) => {
                            console.log("🚀 ~ error:", error);
                            alert(error?.detail);
                        });
                }}
            >
                <Form>
                    <label htmlFor="first_name">First Name</label>
                    <br />
                    <Field name="first_name" type="email" />
                    <ErrorMessage name="first_name" />
                    <br />
                    <br />

                    <label htmlFor="last_name">Last Name</label>
                    <br />
                    <Field name="last_name" type="last_name" />
                    <ErrorMessage name="last_name" />

                    <br />
                    <br />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
            <br />
            <br />
            <button type="submit" onClick={handleLogout}>
                Logout
            </button>
        </>
    );
};

export default Profile;
