import { useState, useEffect } from 'react';
import {
     followUser,
     unfollowUser,
     checkIfFollowing,
     getMyFollowing,
     getUserFollowers,
     getUserFollowing
} from '../apis/followApi';
import type { FollowStats, Follow } from '@/types/follow';
import { toast } from 'sonner';
import { useUserStore } from '@/stores/user-store';

export const useFollowUser = (userId: string) => {
     const [isFollowing, setIsFollowing] = useState(false);
     const [loading, setLoading] = useState(false);
     const [checking, setChecking] = useState(true);
     const user = useUserStore(state => state.user);

     useEffect(() => {
          if (user) {
               checkFollowStatus();
          } else {
               setChecking(false);
               setIsFollowing(false);
          }
     }, [userId, user]);

     const checkFollowStatus = async () => {
          try {
               setChecking(true);
               const response = await checkIfFollowing(userId);
               setIsFollowing(response.data.isFollowing);
          } catch (error) {
               console.error('Error checking follow status:', error);
          } finally {
               setChecking(false);
          }
     };

     const handleFollow = async () => {
          try {
               setLoading(true);
               await followUser(userId, {
                    notifyOnPost: true,
                    notifyOnComment: true,
                    notifyOnVote: false
               });
               setIsFollowing(true);
               toast.success('Followed successfully');
          } catch (error: any) {
               console.error('Error following user:', error);
               toast.error(error.response?.data?.message || 'Failed to follow user');
          } finally {
               setLoading(false);
          }
     };

     const handleUnfollow = async () => {
          try {
               setLoading(true);
               await unfollowUser(userId);
               setIsFollowing(false);
               toast.success('Unfollowed successfully');
          } catch (error: any) {
               console.error('Error unfollowing user:', error);
               toast.error(error.response?.data?.message || 'Failed to unfollow user');
          } finally {
               setLoading(false);
          }
     };

     const toggleFollow = () => {
          if (isFollowing) {
               handleUnfollow();
          } else {
               handleFollow();
          }
     };

     return {
          isFollowing,
          loading,
          checking,
          toggleFollow,
          handleFollow,
          handleUnfollow
     };
};

export const useFollowStats = (userId: string) => {
     const [stats, setStats] = useState<FollowStats | null>(null);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          fetchStats();
     }, [userId]);

     const fetchStats = async () => {
          try {
               setLoading(true);
               // Fetch both followers and following to calculate stats
               const [followersResponse, followingResponse] = await Promise.all([
                    getUserFollowers(userId),
                    getUserFollowing(userId)
               ]);

               setStats({
                    followersCount: followersResponse.data.length,
                    followingCount: followingResponse.data.length
               });
          } catch (error) {
               console.error('Error fetching follow stats:', error);
               setStats({ followersCount: 0, followingCount: 0 });
          } finally {
               setLoading(false);
          }
     };

     return { stats, loading, refetch: fetchStats };
};

export const useMyFollowing = () => {
     const [following, setFollowing] = useState<Follow[]>([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          fetchFollowing();
     }, []);

     const fetchFollowing = async () => {
          try {
               setLoading(true);
               const response = await getMyFollowing();
               // Ensure we always set an array
               setFollowing(Array.isArray(response.data) ? response.data : []);
          } catch (error) {
               console.error('Error fetching following:', error);
               setFollowing([]); // Set empty array on error
          } finally {
               setLoading(false);
          }
     };

     return { following, loading, refetch: fetchFollowing };
};

export const useUserFollowers = (userId: string) => {
     const [followers, setFollowers] = useState<Follow[]>([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          if (userId) {
               fetchFollowers();
          }
     }, [userId]);

     const fetchFollowers = async () => {
          try {
               setLoading(true);
               const response = await getUserFollowers(userId);
               // Ensure we always set an array
               setFollowers(Array.isArray(response.data) ? response.data : []);
          } catch (error) {
               console.error('Error fetching followers:', error);
               setFollowers([]); // Set empty array on error
          } finally {
               setLoading(false);
          }
     };

     return { followers, loading, refetch: fetchFollowers };
};

export const useUserFollowing = (userId: string) => {
     const [following, setFollowing] = useState<Follow[]>([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          if (userId) {
               fetchFollowing();
          }
     }, [userId]);

     const fetchFollowing = async () => {
          try {
               setLoading(true);
               const response = await getUserFollowing(userId);
               // Ensure we always set an array
               setFollowing(Array.isArray(response.data) ? response.data : []);
          } catch (error) {
               console.error('Error fetching following:', error);
               setFollowing([]); // Set empty array on error
          } finally {
               setLoading(false);
          }
     };

     return { following, loading, refetch: fetchFollowing };
};
