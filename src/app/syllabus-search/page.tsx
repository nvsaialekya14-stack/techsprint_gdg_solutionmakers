
'use client'

import { useState } from 'react'
import type { SyllabusImageBookRecommendationOutput } from '@/ai/flows/syllabus-image-book-recommendation'
import { getBookRecommendations } from '@/app/actions'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Loader2, UploadCloud, AlertTriangle } from 'lucide-react'
import BookRecommendations from '@/components/book-recommendations'

export default function SyllabusRecommendationPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 🔹 IMPORTANT: state does NOT allow undefined
  const [recommendations, setRecommendations] =
    useState<SyllabusImageBookRecommendationOutput | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)
    setError(null)
    setRecommendations(null)

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(selectedFile)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!file) {
      setError('Please select a syllabus image to upload.')
      return
    }

    setLoading(true)
    setError(null)
    setRecommendations(null)

    try {
      const reader = new FileReader()

      reader.onload = async () => {
        try {
          const base64Data = reader.result as string
          const result = await getBookRecommendations({
            syllabusImageDataUri: base64Data,
          })

          if (result.error) {
            setError(result.error)
          } else {
            // ✅ FIX: never pass undefined to state
            setRecommendations(result.data ?? null)
          }
        } catch (err) {
          setError(
            err instanceof Error
              ? err.message
              : 'An unexpected error occurred.'
          )
        } finally {
          setLoading(false)
        }
      }

      reader.onerror = () => {
        setError('Failed to read the file.')
        setLoading(false)
      }

      reader.readAsDataURL(file)
    } catch (err) {
      setError(
