import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Wallet } from 'lucide-react'

interface BulkActionBarProps {
     totalWithdrawable: number
     selectedCount: number
     onSelectAll: (checked: boolean) => void
     onWithdraw: () => void
}

export function BulkActionBar({ totalWithdrawable, selectedCount, onSelectAll, onWithdraw }: BulkActionBarProps) {
     const allSelected = selectedCount > 0 && selectedCount === totalWithdrawable

     return (
          <Card className="bg-muted/50 mb-3">
               <CardContent className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                         <Checkbox id="select-all" checked={allSelected} onCheckedChange={onSelectAll} />
                         <label htmlFor="select-all" className="text-sm font-medium cursor-pointer">
                              Select All ({totalWithdrawable})
                         </label>
                         {selectedCount > 0 && <span className="text-sm text-muted-foreground">{selectedCount} selected</span>}
                    </div>
                    {selectedCount > 0 && (
                         <Button onClick={onWithdraw}>
                              <Wallet className="mr-2 h-4 w-4" />
                              Withdraw ({selectedCount})
                         </Button>
                    )}
               </CardContent>
          </Card>
     )
}
