import { readResource, updateResource } from "@/web/services/apiClient"
import { useQuery, useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useCallback } from "react"
import { useSession } from "@/web/components/SessionContext"
import { object } from "yup"
import {
  titleValidator,
  roleValidator,
  isActiveValidator,
} from "@/utils/validators"
import { Formik } from "formik"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import Button from "@/web/components/ui/Button"
import Select from "@/web/components/ui/Select"

const useDataReadResource = () => {
  const {
    query: { userId },
  } = useRouter()
  const { isLoading, data: { data: { result: [user] = [] } = {} } = {} } =
    useQuery({
      queryKey: ["user"],
      queryFn: () => readResource(`users/${userId}`),
      enabled: Boolean(userId),
      initialData: { data: {} },
    })

  return { isLoading, user }
}
const initialValues = (user) => ({
  username: user.username,
  role: user.role,
  isActive: user.isActive,
})
const optionsRole = [
  { value: "user", label: "User" },
  { value: "author", label: "Author" },
  { value: "admin", label: "Admin" },
]
const optionsIsActive = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
]
const validationSchema = object({
  username: titleValidator.required().label("User username"),
  role: roleValidator.required().label("User role"),
  isActive: isActiveValidator.required().label("User is active"),
})
const UpdateUserPage = () => {
  const { session } = useSession()
  const router = useRouter()
  const { user } = useDataReadResource()
  const { mutateAsync: updateUser } = useMutation({
    mutationFn: (userUpdate) => updateResource(`users/${user.id}`, userUpdate),
  })
  const handleSubmit = useCallback(
    async ({ username, role, isActive }) => {
      const {
        data: {
          result: [userUpdate],
        },
      } = await updateUser({
        username,
        role,
        isActive,
      })

      // eslint-disable-next-line no-console
      console.log(userUpdate)

      router.push(`/admin/user/${userUpdate.id}`)
    },
    [router, updateUser],
  )

  if (!session || session.user.role === "user") {
    return <p>You are not allowed to update users</p>
  }

  return (
    <Formik
      initialValues={initialValues(user)}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField
          name="username"
          label="Username"
          placeholder="Enter a username"
        />
        <FormField as={Select} name="role" label="Role" options={optionsRole} />
        <FormField
          as={Select}
          name="isActive"
          label="Is Active"
          options={optionsIsActive}
        />
        <Button type="submit">Edit User</Button>
      </Form>
    </Formik>
  )
}

export default UpdateUserPage
