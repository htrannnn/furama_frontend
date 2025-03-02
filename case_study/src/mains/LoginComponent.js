import { React, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BiLogInCircle } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../services/accountsServices";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../redux/accountAction";
import { Link } from "react-router-dom";

function LoginComponent() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [admin, setAdmin] = useState({
		username: "",
		password: "",
	});

	const account = useSelector((state) => state?.account?.account);

	useEffect(() => {
		if (account) {
			navigate("/admin");
		}
	}, [account, navigate]);

	const handleSubmit = async (value) => {
		const { username, password } = value;
		const result = await checkLogin({ username, password });

		if (result) {
			window.localStorage.setItem("admin", JSON.stringify(result));
			dispatch(login(result));
			toast.success("Login successfully!", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
				transition: Bounce,
			});
		} else {
			toast.error("Login failed!");
		}
	};

	const handleValidate = Yup.object({
		username: Yup.string().required("Empty"),
		password: Yup.string().required("Empty"),
	});

	return (
		<div className="d-flex justify-content-center align-items-center vh-100 position-relative">
			<div id="loginBG"></div>

			<div id="loginCard" className="shadow-lg d-flex flex-column justify-content-center align-items-center">
				<Link to="/">
					<img src="/images/Logo.png" alt="logo" className="img-fluid" style={{ maxWidth: "250px" }} />
				</Link>
				<h5 className="mt-3 text-center">Login to start managing the Resort</h5>

				<div className="mt-4 d-flex flex-column align-items-center">
					<Formik initialValues={admin} onSubmit={handleSubmit} validationSchema={handleValidate}>
						<Form className="w-100 px-4">
							<div className="mb-3 d-flex align-items-center">
								<FaUserAlt className="me-2" />
								<Field type="text" name="username" id="name" className="form-control" placeholder="Username" />
								<ErrorMessage name="username" component="div" className="text-danger" />
							</div>
							<div className="mb-4 d-flex align-items-center">
								<RiLockPasswordFill className="me-2" />
								<Field type="password" name="password" id="password" className="form-control" placeholder="Password" />
								<ErrorMessage name="password" component="div" className="text-danger" />
							</div>
							<div className="d-grid">
								<button type="submit" className="btn btn rounded-3" id="btnLogin">
									Đăng nhập <BiLogInCircle />
								</button>
							</div>
						</Form>
					</Formik>
				</div>
			</div>
		</div>
	);
}

export default LoginComponent;
