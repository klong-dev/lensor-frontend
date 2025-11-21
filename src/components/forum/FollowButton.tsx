'use client';

import { Button } from '@/components/ui/button';
import { useFollowUser } from '@/lib/hooks/useFollow';
import { UserPlus, UserMinus, Loader2 } from 'lucide-react';
import { LoginRequiredDialog } from '@/components/ui/login-required-dialog';
import { useState } from 'react';
import { useUserStore } from '@/stores/user-store';

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
     const user = useUserStore(state => state.user);
     const [showLoginDialog, setShowLoginDialog] = useState(false);
     const { isFollowing, loading, checking, toggleFollow } = useFollowUser(userId);

     if (checking) {
          return (
               <Button variant={variant} size={size} disabled className={className}>
                    <Loader2 className="h-4 w-4 animate-spin" />
               </Button>
          );
     }

     const handleClick = () => {
          if (!user) {
               setShowLoginDialog(true);
               return;
          }
          toggleFollow();
     };

     return (
          <>
               <Button
                    variant={isFollowing ? 'outline' : variant}
                    size={size}
                    onClick={handleClick}
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

               <LoginRequiredDialog
                    open={showLoginDialog}
                    onOpenChange={setShowLoginDialog}
                    title="Login Required"
                    description="You need to be logged in to follow users. Please login to continue."
               />
          </>
     );
}
