
'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useToast } from '@/hooks/use-toast'
import { Camera, AlertTriangle } from 'lucide-react'

export default function ScanSearchPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasCameraPermission, setHasCameraPermission] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        setHasCameraPermission(true)
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (error) {
        console.error('Error accessing camera:', error)
        setHasCameraPermission(false)
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        })
      }
    }
    getCameraPermission()
  }, [toast])

  const handleScanClick = () => {
    if (!hasCameraPermission) {
      toast({
        variant: 'destructive',
        title: 'Camera Not Available',
        description: 'Cannot start scanning without camera access.',
      })
      return
    }
    setIsScanning(!isScanning)
  }

  return (
    <div className="container mx-auto max-w-5xl">
      <section className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-primary">Scan & Search</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Scan a book's barcode to instantly find it in our library.
        </p>
      </section>

      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardContent className="p-6">
          <div className="relative aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center">
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
            {isScanning && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-1/2 border-4 border-primary rounded-lg animate-pulse" />
              </div>
            )}
            {!hasCameraPermission && (
              <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center text-center p-4">
                <AlertTriangle className="h-10 w-10 text-destructive mb-2" />
                <h3 className="font-bold">Camera Access Required</h3>
                <p className="text-sm text-muted-foreground">Please allow camera access in your browser to use the scanner.</p>
              </div>
            )}
          </div>
          <Button onClick={handleScanClick} className="w-full mt-4" disabled={!hasCameraPermission}>
            <Camera className="mr-2" />
            {isScanning ? 'Stop Scanning' : 'Start Scanning'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
