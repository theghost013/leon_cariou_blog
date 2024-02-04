import { readResource, updateResource } from "@/web/services/apiClient"
import { useQuery, useMutation } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { useCallback } from "react"
import { useSession } from "@/web/components/SessionContext"
import { object } from "yup"
import { titleValidator, bodyValidator } from "@/utils/validators"
import { Formik } from "formik"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import Button from "@/web/components/ui/Button"

const useDataReadResource = () => {
  const {
    query: { postId },
  } = useRouter()
  const { isLoading, data: { data: { result: [post] = [] } = {} } = {} } =
    useQuery({
      queryKey: ["post"],
      queryFn: () => readResource(`posts/${postId}`),
      enabled: Boolean(postId),
      initialData: { data: {} },
    })

  return { isLoading, post }
}
const validationSchema = object({
  title: titleValidator.required().label("Post title"),
  body: bodyValidator.required().label("Post body"),
})
const UpdatePostPage = () => {
  const { session } = useSession()
  const router = useRouter()
  const { isLoading, post } = useDataReadResource()
  const { mutateAsync: updatePost } = useMutation({
    mutationFn: (postUpdate) => updateResource(`posts/${post.id}`, postUpdate),
  })
  const handleSubmit = useCallback(
    async ({ title, body }) => {
      const {
        data: {
          result: [postUpdate],
        },
      } = await updatePost({
        title,
        body,
      })

      router.push(`/posts/${postUpdate.id}`)
    },
    [updatePost, router],
  )

  if (
    !session ||
    session.user.role === "user" ||
    post.userId !== session.user.id
  ) {
    return <p>You are not allowed to update posts</p>
  }

  if (isLoading) {
    return "Loading..."
  }

  if (!post && !isLoading) {
    return "Post not found"
  }

  return (
    <Formik
      initialValues={{ title: post.title, body: post.body }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField name="title" label="Title" placeholder="Enter a title" />
        <FormField name="body" label="Content" placeholder="Enter a content" />
        <Button type="submit">Edit Post</Button>
      </Form>
    </Formik>
  )
}

export default UpdatePostPage
