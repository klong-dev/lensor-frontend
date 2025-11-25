import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CheckCircle2 } from 'lucide-react'

interface SuccessDialogProps {
     open: boolean
     onOpenChange: (open: boolean) => void
}

export function SuccessDialog({ open, onOpenChange }: SuccessDialogProps) {
     return (
          <Dialog open={open} onOpenChange={onOpenChange}>
               <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                         <div className="flex justify-center mb-4">
                              <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
                                   <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
                              </div>
                         </div>
                         <DialogTitle className="text-center text-2xl">Withdrawal Request Submitted</DialogTitle>
                         <DialogDescription className="text-center">
                              Your withdrawal request has been successfully submitted and is now pending admin review.
                         </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                         <div className="p-4 bg-muted rounded-md space-y-2">
                              <p className="text-sm text-muted-foreground text-center">
                                   <strong className="text-foreground">Processing Time:</strong>
                              </p>
                              <p className="text-sm text-center">
                                   Your request will be reviewed and processed within <strong className="text-foreground">24 business hours</strong>.
                              </p>
                         </div>

                         <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-md">
                              <p className="text-sm text-blue-700 dark:text-blue-300 text-center">
                                   You will receive a notification once your withdrawal has been approved and processed.
                              </p>
                         </div>
                    </div>

                    <DialogFooter className="sm:justify-center">
                         <Button onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
                              Got it, thanks!
                         </Button>
                    </DialogFooter>
               </DialogContent>
          </Dialog>
     )
}
