'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PostSection from './post-section'

export default function ProfileContent() {
     const listTabs = [
          {
               label: 'Post',
               value: 'post'
          },
          {
               label: 'Followers',
               value: 'follower'
          },
          {
               label: 'Following',
               value: 'following'
          },
     ]
     return (
          <div className=''>
               <Tabs defaultValue="posts">
                    <TabsList>
                         {listTabs.map((tab, index) => (
                              <TabsTrigger value={tab.value}>{tab.label}</TabsTrigger>
                         ))}
                    </TabsList>
                    <TabsContent value="posts">
                         <PostSection />
                    </TabsContent>
                    <TabsContent value="follower">
                         Tab2
                    </TabsContent>
                    <TabsContent value="following">
                         Tab3
                    </TabsContent>
               </Tabs>
          </div>
     )
}
