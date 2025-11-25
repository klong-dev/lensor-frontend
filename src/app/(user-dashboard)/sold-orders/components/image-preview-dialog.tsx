import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface ImagePreviewDialogProps {
     open: boolean
     onOpenChange: (open: boolean) => void
     imageUrl: string
}

export function ImagePreviewDialog({ open, onOpenChange, imageUrl }: ImagePreviewDialogProps) {
     return (
          <Dialog open={open} onOpenChange={onOpenChange}>
               <DialogContent className="sm:max-w-[800px] max-h-[90vh]">
                    <DialogHeader>
                         <DialogTitle>Payment Proof</DialogTitle>
                         <DialogDescription>Bank transfer screenshot</DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center items-center p-4 bg-muted/30 rounded-lg overflow-hidden">
                         <img
                              src={imageUrl}
                              alt="Payment Proof"
                              className="max-w-full max-h-[70vh] object-contain rounded-md"
                              onError={(e) => {
                                   e.currentTarget.src = '/placeholder-image.png'
                              }}
                         />
                    </div>
                    <DialogFooter>
                         <Button onClick={() => onOpenChange(false)}>Close</Button>
                         <Button variant="outline" onClick={() => window.open(imageUrl, '_blank')}>
                              Open in New Tab
                         </Button>
                    </DialogFooter>
               </DialogContent>
          </Dialog>
     )
}
