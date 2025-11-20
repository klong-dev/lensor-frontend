'use client'

import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { Check } from "lucide-react";

export default function Editable({ value, onSave }: { value: string; onSave: (newValue: string) => void }) {
     const [isEditing, setIsEditing] = useState(false)
     const [editValue, setEditValue] = useState(value)

     const handleSave = () => {
          setIsEditing(false)
          if (editValue !== value) {
               onSave(editValue)
          }
     }

     const handleCancel = () => {
          setEditValue(value)
          setIsEditing(false)
     }

     const handleKeyDown = (e: React.KeyboardEvent) => {
          if (e.key === 'Enter') {
               handleSave()
          } else if (e.key === 'Escape') {
               handleCancel()
          }
     }

     if (isEditing) {
          return (
               <div className="flex items-center gap-2">
                    <Input
                         value={editValue}
                         onChange={(e) => setEditValue(e.target.value)}
                         onKeyDown={handleKeyDown}
                         onBlur={handleCancel}
                         autoFocus
                         className="h-8"
                    />
                    <Button
                         size="sm"
                         onMouseDown={(e) => {
                              e.preventDefault() // Prevent blur
                              handleSave()
                         }}
                         disabled={editValue === value}
                         className="h-8"
                    >
                         <Check className="h-4 w-4 mr-1" />
                         Save
                    </Button>
               </div>
          )
     }

     return (
          <div
               onClick={() => setIsEditing(true)}
               className="cursor-text hover:bg-accent px-2 py-1 rounded"
               title="Click to edit"
          >
               {value}
          </div>
     )
}