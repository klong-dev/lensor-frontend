import { Button } from '@/components/ui/button'
import { BarChart3, Headphones, History } from 'lucide-react'

interface PageHeaderProps {
     onOpenTicket: () => void
     onOpenHistory: () => void
}

export function PageHeader({ onOpenTicket, onOpenHistory }: PageHeaderProps) {
     return (
          <div className="flex items-center justify-between">
               <div>
                    <h1 className="text-3xl font-bold">Sold Orders Management</h1>
                    <p className="text-muted-foreground mt-1">Manage your sold orders and withdraw earnings</p>
               </div>
               <div className="flex items-center gap-2">
                    <Button onClick={onOpenTicket} variant="outline">
                         <Headphones className="mr-2 h-4 w-4" />
                         Support
                    </Button>
                    <Button onClick={() => (window.location.href = '/statistics')} variant="outline">
                         <BarChart3 className="mr-2 h-4 w-4" />
                         Revenue Statistics
                    </Button>
                    <Button onClick={onOpenHistory} variant="outline">
                         <History className="mr-2 h-4 w-4" />
                         Withdrawal History
                    </Button>
               </div>
          </div>
     )
}
