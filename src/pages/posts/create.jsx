import { titleValidator, bodyValidator } from "@/utils/validators"
import Button from "@/web/components/ui/Button"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import { createResource } from "@/web/services/apiClient"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"
import { useRouter } from "next/router"
import { useCallback } from "react"
import { object } from "yup"
import { useSession } from "@/web/components/SessionContext"

const validationSchema = object({
  title: titleValidator.required().label("Post title"),
  body: bodyValidator.required().label("Post body"),
})
const initialValues = {
  title: "",
  body: "",
}
const CreatePage = () => {
  const { session } = useSession()
  const router = useRouter()
  const { mutateAsync: savePost } = useMutation({
    mutationFn: (post) => createResource("posts", post),
  })
  const handleSubmit = useCallback(
    async ({ title, body }) => {
      const {
        data: {
          result: [post],
        },
      } = await savePost({
        title,
        body,
      })

      router.push(`/posts/${post.id}`)
    },
    [savePost, router],
  )

  if (!session || session.user.role === "user") {
    return <p>You are not allowed to create posts</p>
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField name="title" label="Title" placeholder="Enter a title" />
        <FormField name="body" label="Content" placeholder="Enter a content" />
        <Button type="submit">Create Post</Button>
      </Form>
    </Formik>
  )
}

export default CreatePage
