'use client'

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Form from "@components/Form"

const CreatePrompt = () => {
    const router = useRouter()
    const { data: session} = useSession()

    const [submutting, setSubmutting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    })

    const createPrompt = async (e) => {
        e.preventDefault()
        setSubmutting(true)

        try {
            const response = await fetch('/api/prompt/new',
            {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                })
            })

            if (response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        }finally 
        {
            setSubmutting(false)
        }
    }

  return (
    <Form 
        type="Create"
        post={post}
        setPost={setPost}
        submutting={submutting}
        handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt