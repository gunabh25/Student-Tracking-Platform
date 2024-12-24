'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { MapPin, AlertCircle } from 'lucide-react'

export default function LocationAccessPopup() {
  const [isOpen, setIsOpen] = useState(true)
  const [locationEnabled, setLocationEnabled] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    checkLocationPermission()
  }, [])

  const checkLocationPermission = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => setLocationEnabled(true),
        (err) => {
          console.error('Error getting location:', err)
          setLocationEnabled(false)
          if (err.code === 1) {
            setError('Location access denied. Please enable location services to continue.')
          } else {
            setError('Unable to access location. Please try again.')
          }
        }
      )
    } else {
      setError('Geolocation is not supported by your browser.')
    }
  }

  const handleRequestAccess = () => {
    setError(null)
    checkLocationPermission()
  }

  const handleDone = () => {
    setIsOpen(false)
    // You can add any additional logic here, e.g., storing a flag in localStorage
    // to prevent showing this popup on subsequent visits
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location Access Required
          </AlertDialogTitle>
          <AlertDialogDescription>
            To use the dashboard, we need access to your location. This helps us provide accurate and personalized information.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error && (
          <div className="flex items-center gap-2 text-destructive mt-2">
            <AlertCircle className="h-4 w-4" />
            <p className="text-sm">{error}</p>
          </div>
        )}
        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleRequestAccess}>
            Request Access
          </Button>
          <AlertDialogAction asChild>
            <Button onClick={handleDone} disabled={!locationEnabled}>
              Done
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

