
'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { Camera, AlertTriangle } from 'lucide-react'
import Balancer from 'react-wrap-balancer'

export default function ScanSearchPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('Camera API not supported in this browser.')
        setHasCameraPermission(false)
        toast({
          variant: 'destructive',
          title: 'Camera Not Supported',
          description: 'Your browser does not support camera access.',
        })
        return
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        setHasCameraPermission(true)
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (error) {
        console.error('Error accessing camera:', error)
        setHasCameraPermission(false)
        if (error instanceof DOMException && error.name === 'NotAllowedError') {
            toast({
              variant: 'destructive',
              title: 'Camera Access Denied',
              description: 'Please enable camera permissions in your browser settings to use this feature.',
            })
        }
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
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-primary">
            <Balancer>Scan & Search</Balancer>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          <Balancer>Use your camera to scan a book's barcode and instantly find it in our library.</Balancer>
        </p>
      </section>

      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardContent className="p-6">
          <div className="relative aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center">
            {hasCameraPermission ? (
              <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
            ) : (
               <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center text-center p-4">
                <AlertTriangle className="h-10 w-10 text-destructive mb-2" />
                <h3 className="font-bold">Camera Access Required</h3>
                <p className="text-sm text-muted-foreground">Please allow camera access in your browser to use the scanner.</p>
              </div>
            )}
            {isScanning && hasCameraPermission && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-3/4 h-1/2 border-4 border-primary rounded-lg animate-pulse" />
              </div>
            )}
            
          </div>
          <Button onClick={handleScanClick} className="w-full mt-4" disabled={hasCameraPermission !== true}>
            <Camera className="mr-2" />
            {isScanning ? 'Stop Scanning' : 'Start Scanning'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
