import { readResource, updateResource } from "@/web/services/apiClient"
import { useSession } from "@/web/components/SessionContext"
import Button from "@/web/components/ui/Button"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"
import { Formik } from "formik"
import { titleValidator, bodyValidator } from "@/utils/validators"
import { object } from "yup"
import { useMutation } from "@tanstack/react-query"
import { useCallback } from "react"
import { useRouter } from "next/router"

export const getServerSideProps = ({ query: { postId } }) => {
  const post = readResource(`posts/${postId}`)

  if (!post) {
    return {
      notFound: true,
    }
  }

  return { props: { post } }
}
const validationSchema = object({
  title: titleValidator.required().label("Post title"),
  body: bodyValidator.required().label("Post body"),
})
const UpdatePostPage = ({ post }) => {
  const { session } = useSession()
  const router = useRouter()
  const { mutateAsync: updatePost } = useMutation({
    mutationFn: (postUpdated) => updateResource("posts", postUpdated),
  })
  const handleSubmit = useCallback(
    async ({ title, body }) => {
      const {
        data: {
          result: [postUpdated],
        },
      } = await updatePost({
        id: post.id,
        title,
        body,
      })

      // eslint-disable-next-line no-console
      console.log(postUpdated)

      router.push(`/posts/${postUpdated.id}`)
    },
    [updatePost, router, post.id],
  )

  if (!session || post.userId !== session.user.id) {
    return <p>You are not allowed to update posts</p>
  }

  return (
    <Formik
      initialValues={{
        title: post.title,
        body: post.body,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField name="title" label="Title" placeholder="Enter a title" />
        <FormField name="body" label="Content" placeholder="Enter a content" />
        <Button type="submit">Update</Button>
      </Form>
    </Formik>
  )
}

export default UpdatePostPage
