'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { MessageSquare } from 'lucide-react'

export function SpecialInstructions() {
    const [note, setNote] = useState('')

    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="h-5 w-5" />
                    <h3 className="font-semibold">Special Instructions</h3>
                </div>

                <div className="space-y-2">
                    <label htmlFor="order-note" className="text-sm font-medium text-muted-foreground">
                        Add a note to your order (optional)
                    </label>
                    <textarea
                        id="order-note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Any special requests, gift messages, or packaging instructions..."
                        className="w-full min-h-[120px] px-3 py-2 text-sm border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        maxLength={500}
                    />
                    <p className="text-xs text-muted-foreground">
                        Examples: &quot;Please gift wrap this item&quot;, &quot;This is a gift for my mother&quot;, &quot;Handle with extra care&quot;
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
