/* eslint-disable max-lines-per-function */
import { useQuery, useMutation } from "@tanstack/react-query"
import { useSession } from "@/web/components/SessionContext"
import { readResource, updateResource } from "@/web/services/apiClient"
import Button from "@/web/components/ui/Button"
import { useCallback, useState } from "react"
import { Formik } from "formik"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import { nameValidator } from "@/utils/validators"
import { object } from "yup"

const useDataReadResource = () => {
  const {
    isLoading,
    data: {
      data: {
        result: [profile] = [],
        meta: { countPosts, countComments, countViews } = {},
      } = {},
    } = {},
    refetch,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => readResource("users/profile"),
  })

  return { isLoading, profile, refetch, countPosts, countComments, countViews }
}
const validationSchema = object({
  username: nameValidator.required().label("User username"),
})
const Profilepage = () => {
  const [editing, setEditing] = useState(false)
  const { session } = useSession()
  const { isLoading, profile, refetch, countComments, countPosts, countViews } =
    useDataReadResource()
  const { mutateAsync: updateProfile } = useMutation({
    mutationFn: (profileUpdate) =>
      updateResource(`users/profile`, profileUpdate),
  })
  const handleSubmit = useCallback(
    async ({ username }) => {
      await updateProfile({
        username,
      })
      setEditing(!editing)
      refetch()
    },
    [updateProfile, editing, refetch],
  )

  if (isLoading) {
    return "Loading..."
  }

  if (!session) {
    return <p>You are not connected</p>
  }

  return (
    <article>
      <h1 className="text-2xl">Profile</h1>

      <div className="flex flex-row gap-2">
        {!editing ? (
          <p>{profile.username}</p>
        ) : (
          <Formik
            initialValues={{ username: profile.username }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="flex flex-row">
              <FormField name="username" />
              <Button type="submit">Save</Button>
            </Form>
          </Formik>
        )}
        <Button onClick={() => setEditing(!editing)}>
          {editing ? "x" : "Edit"}
        </Button>
      </div>

      <p>{profile.email}</p>
      <p>{profile.role}</p>
      <p>Created at {profile.created_at}</p>
      <div className="flex felx-row gap-4">
        <p>post count : {countPosts}</p>
        <p>comment count : {countComments}</p>
        <p>view count : {countViews}</p>
      </div>
    </article>
  )
}

export default Profilepage
