import { emailValidator, nameValidator } from "@/utils/validators"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import ResponseError from "@/web/components/ui/ResponseError"
import SubmitButton from "@/web/components/ui/SubmitButton"
import { createResource } from "@/web/services/apiClient"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"
import { useRouter } from "next/router"
import { object, string } from "yup"

const initialValues = {
  username: "",
  email: "",
  password: "",
}
const validationSchema = object({
  username: nameValidator.required().label("Username"),
  email: emailValidator.required().label("E-mail"),
  password: string().required().label("Password"),
})
const RegisterPage = () => {
  const router = useRouter()
  const { mutateAsync, error } = useMutation({
    mutationFn: (data) => createResource("users", data),
  })
  const handleSubmit = async ({ username, email, password }) => {
    await mutateAsync({ username, email, password })

    router.push("/login")
  }

  return (
    <>
      <ResponseError error={error} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <FormField
            name="username"
            type="text"
            placeholder="Enter your username"
            label="Username"
          />
          <FormField
            name="email"
            type="email"
            placeholder="Enter your e-mail"
            label="E-mail"
          />
          <FormField
            name="password"
            type="password"
            placeholder="Enter your password"
            label="Password"
          />
          <SubmitButton>Create</SubmitButton>
        </Form>
      </Formik>
    </>
  )
}

export default RegisterPage
