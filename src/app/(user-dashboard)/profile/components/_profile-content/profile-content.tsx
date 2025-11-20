'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PostSection from './post-section'
import SavedPostsSection from './saved-posts-section'

interface ProfileContentProps {
     onPostsCountChange?: (count: number) => void
}

export default function ProfileContent({ onPostsCountChange }: ProfileContentProps) {
     const listTabs = [
          {
               label: 'Your posts',
               value: 'posts'
          },
          {
               label: 'Saved posts',
               value: 'saved'
          },
          {
               label: 'Loved posts',
               value: 'loved'
          },
     ]
     return (
          <div className=''>
               <Tabs defaultValue="posts">
                    <TabsList className='w-full'>
                         {listTabs.map((tab, index) => (
                              <TabsTrigger key={index} value={tab.value} className='flex-1'>
                                   {tab.label}
                              </TabsTrigger>
                         ))}
                    </TabsList>
                    <TabsContent value="posts">
                         <PostSection onPostsCountChange={onPostsCountChange} />
                    </TabsContent>
                    <TabsContent value="saved">
                         <SavedPostsSection />
                    </TabsContent>
                    <TabsContent value="loved">
                         <div className='text-center py-16 text-muted-foreground'>
                              Loved posts coming soon...
                         </div>
                    </TabsContent>
               </Tabs>
          </div>
     )
}
