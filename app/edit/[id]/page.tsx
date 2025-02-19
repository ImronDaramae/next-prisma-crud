'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Edit = ({ params }: { params: { id: string } }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')  
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState([])
  const router = useRouter()
  const { id } = params

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories')
      setCategories(response.data)
    } catch (error) {
      console.error('Failed to fetch categories', error)
    }
  }

  const fetchPost = async (id: Number) => {
    try {
      const res = await axios.get(`/api/posts/${id}`)
      setTitle(res.data.title)
      setContent(res.data.content)
      setCategoryId(res.data.categoryId || '')
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const numCategoryId = parseInt(categoryId)
      await axios.put(`/api/posts/${id}`, {
        title,
        content,
        categoryId: numCategoryId,
      })
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (id) {
      fetchPost(parseInt(id))
      fetchCategories()
    }
  }, [id])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Edit Post {id}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            name="content"
            id="content"
            required
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="category"
            className="mr-4 text-sm font-medium text-gray-700"
          >
            Category 
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="text-black"
          >
            <option value="">Select a category</option>
            {categories.map((category: any) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  )
}

export default Edit