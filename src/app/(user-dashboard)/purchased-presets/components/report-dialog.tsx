import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type ReportDialogProps = {
    open: boolean
    message: string
    onOpenChange: (open: boolean) => void
    onMessageChange: (message: string) => void
    onSubmit: () => void
}

export default function ReportDialog({
    open,
    message,
    onOpenChange,
    onMessageChange,
    onSubmit
}: ReportDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Report Issue</DialogTitle>
                    <DialogDescription>
                        Describe the issue you&apos;re experiencing with this preset.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="report-message">Issue Description</Label>
                        <Textarea
                            id="report-message"
                            placeholder="Describe the problem in detail..."
                            value={message}
                            onChange={(e) => onMessageChange(e.target.value)}
                            rows={5}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={onSubmit}>
                        Submit Report
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
