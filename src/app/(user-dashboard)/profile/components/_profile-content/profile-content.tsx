'use client'

import { Tabs } from '@mantine/core'
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
               <Tabs variant="outline" defaultValue={listTabs[0].value}>
                    <Tabs.List>
                         {listTabs.map((item, index) =>
                              <Tabs.Tab value={item.value} key={index}>
                                   {item.label}
                              </Tabs.Tab>
                         )}
                    </Tabs.List>

                    <Tabs.Panel value="post">
                         <PostSection />
                    </Tabs.Panel>

                    <Tabs.Panel value="follower">
                         SECTION 2
                    </Tabs.Panel>

                    <Tabs.Panel value="following">
                         SECTION 3
                    </Tabs.Panel>
               </Tabs>
          </div>
     )
}
