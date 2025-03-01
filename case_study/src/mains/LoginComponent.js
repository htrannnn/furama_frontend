import { React } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function LoginComponent() {
	const handleValidate = Yup.object({
		name: Yup.string().required("Empty"),
		password: Yup.string().required("Empty"),
	});

	return (
		<div className="mb-5" style={{ marginTop: "70px" }}>
			<div id="loginBG"></div>

			<div id="loginCard" className="shadow-lg">
				<div className="d-flex flex-column justify-content-center align-items-center">
					<img src="/images/Logo.png" alt="logo" />
					<h5 className="mt-3">Login to start managing the Resort</h5>
				</div>

				<div className="mt-4 d-flex flex-column align-items-center">
					<Formik validationSchema={handleValidate}>
						<Form>
							<div className="mb-3">
								<Field type="text" name="name" id="name" className="form-control" placeholder="Username" />
								<ErrorMessage name="name" component="div" className="text-danger" />
							</div>
							<div className="mb-4">
								<Field type="password" name="password" id="password" className="form-control" placeholder="Password" />
								<ErrorMessage name="password" component="div" className="text-danger" />
							</div>
							<div className="d-grid">
								<button type="submit" className="btn btn rounded-3" id="btnLogin">
									Đăng nhập
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
