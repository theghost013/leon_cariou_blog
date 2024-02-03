import React, { useState, useCallback } from "react"
import { useMutation } from "@tanstack/react-query"
import { createResource } from "@/web/services/apiClient"
import { object } from "yup"
import { bodyValidator } from "@/utils/validators"
import { Formik } from "formik"
import Button from "@/web/components/ui/Button"
import Form from "@/web/components/ui/Form"
import FormField from "@/web/components/ui/FormField"

const validationSchema = object({
  body: bodyValidator.required().label("Comment body"),
})
const initialValues = {
  body: "",
}
const CreateComment = ({ postId }) => {
  const [submittingMessage, setSubmittingMessage] = useState("")
  const { mutateAsync: saveComment } = useMutation({
    mutationFn: (comment) => createResource(`posts/${postId}/comment`, comment),
  })
  const handleSubmit = useCallback(
    async ({ body }) => {
      const { data: comment } = await saveComment({ body })

      if (!comment) {
        setSubmittingMessage("Error creating comment")

        return
      }

      setSubmittingMessage("comment created successfully")
    },
    [saveComment],
  )

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormField
          name="body"
          label="Comment body"
          placeholder="Enter a comment body"
        />
        <Button type="submit">Submit</Button>
        <p>{submittingMessage}</p>
      </Form>
    </Formik>
  )
}

export default CreateComment
