'use client';

import { Button } from '@/components/ui/button';
import { useFollowUser } from '@/lib/hooks/useFollow';
import { UserPlus, UserMinus, Loader2 } from 'lucide-react';

interface FollowButtonProps {
     userId: string;
     variant?: 'default' | 'outline' | 'ghost' | 'secondary';
     size?: 'default' | 'sm' | 'lg' | 'icon';
     showIcon?: boolean;
     className?: string;
}

export function FollowButton({
     userId,
     variant = 'default',
     size = 'default',
     showIcon = true,
     className
}: FollowButtonProps) {
     const { isFollowing, loading, checking, toggleFollow } = useFollowUser(userId);

     if (checking) {
          return (
               <Button variant={variant} size={size} disabled className={className}>
                    <Loader2 className="h-4 w-4 animate-spin" />
               </Button>
          );
     }

     return (
          <Button
               variant={isFollowing ? 'outline' : variant}
               size={size}
               onClick={toggleFollow}
               disabled={loading}
               className={className}
          >
               {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
               ) : (
                    <>
                         {showIcon && (isFollowing ? <UserMinus className="h-4 w-4 mr-2" /> : <UserPlus className="h-4 w-4 mr-2" />)}
                         {isFollowing ? 'Unfollow' : 'Follow'}
                    </>
               )}
          </Button>
     );
}
