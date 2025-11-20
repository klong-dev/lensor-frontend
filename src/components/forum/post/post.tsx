import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BASE_URL } from "@/constants"
import { ROUTES } from "@/constants/path"
import { postApi } from "@/lib/apis/postApi"
import { usePosts, useCheckSavedPost } from "@/lib/hooks/usePostHooks"
import { useUserStore } from "@/stores/user-store"
import { PostType } from '@/types/post'
import clsx from 'clsx'
import { Dot, Ellipsis, Heart, ImageIcon, MessageCircle, Share2, AlertTriangle, Eye, EyeOff, Info } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from 'react'
import { toast } from "sonner"
import { Button } from '../../ui/button'
import { Card } from "../../ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog"
import DialogComment from "./dialog-comment"
import { DialogShare } from "./dialog-share"
import DropdownMenuPost from "./dropdown-menu-post"
import { useTranslations } from "next-intl"
import { formatDistanceToNow } from 'date-fns'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { FollowButton } from '../FollowButton'

const getTimeAgo = (dateString: string) => {
     try {
          return formatDistanceToNow(new Date(dateString), { addSuffix: true })
     } catch {
          return dateString
     }
}

export default function Post({ dataPost, isDetailView = false }: { dataPost: PostType, isDetailView?: boolean }) {
     const t = useTranslations("Forum")
     const tButton = useTranslations('Button')
     const router = useRouter()
     const [expanded, setExpanded] = useState(false)
     const [isVoted, setIsVoted] = useState(dataPost?.isLiked || false)
     const [voteCount, setVoteCount] = useState(dataPost?.voteCount || 0)
     const [commentCount, setCommentCount] = useState(dataPost?.commentCount || 0)
     const [imageError, setImageError] = useState(false)
     const [isSaved, setIsSaved] = useState(false)
     const [showNSFWContent, setShowNSFWContent] = useState(false)
     const [showMetadata, setShowMetadata] = useState(false)
     const { mutate } = usePosts()
     const user = useUserStore(state => state.user)
     const { data: savedData, mutate: mutateSaved } = useCheckSavedPost(dataPost?.id)

     useEffect(() => {
          if (savedData?.data?.isSaved !== undefined) {
               setIsSaved(savedData.data.isSaved)
          }
     }, [savedData])

     if (!dataPost) return null

     const handleUpdateCommentCount = () => {
          setCommentCount(commentCount + 1)
     }

     const handleVotePost = async () => {
          const previousState = isVoted
          const previousCount = voteCount

          try {
               setIsVoted(!isVoted)
               setVoteCount(isVoted ? voteCount - 1 : voteCount + 1)

               if (isVoted) {
                    await postApi.unlikePost(dataPost.id)
               } else {
                    await postApi.likePost(dataPost.id)
               }
          } catch (error) {
               setIsVoted(previousState)
               setVoteCount(previousCount)
               toast.error('Failed to update like status')
          }
     }

     const handleDeletePost = async () => {
          try {
               const { data } = await postApi.delete(dataPost.id)
               console.log(data)
               toast.success(data.message)
               mutate()
          } catch (error) {
               toast.error('You cannot delete this post.')
          }
     }

     const handleSavePost = async () => {
          const previousState = isSaved

          try {
               setIsSaved(!isSaved)

               if (isSaved) {
                    await postApi.unsavePost(dataPost.id)
                    toast.success('Post unsaved')
               } else {
                    await postApi.savePost(dataPost.id)
                    toast.success('Post saved')
               }
               await mutateSaved()
          } catch (error) {
               setIsSaved(previousState)
               toast.error('Failed to update save status')
          }
     }

     const handleReportPost = () => {
          console.log('Report')
     }

     const handleViewDetail = () => {
          router.push(ROUTES.FORUM + '/' + dataPost.id)
     }

     return (
          <div className='p-5 hover:backdrop-brightness-95 dark:hover:backdrop-brightness-0 rounded-2xl duration-300 my-3'>
               <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                         {dataPost?.user?.id ? (
                              <Link href={ROUTES.PROFILE(dataPost.user.id)} className="hover:opacity-80 duration-300">
                                   <Avatar>
                                        <AvatarImage src={dataPost?.user?.avatarUrl} />
                                        <AvatarFallback>{dataPost?.user?.name?.charAt(0) || 'U'}</AvatarFallback>
                                   </Avatar>
                              </Link>
                         ) : (
                              <Avatar>
                                   <AvatarImage src={dataPost?.user?.avatarUrl} />
                                   <AvatarFallback>U</AvatarFallback>
                              </Avatar>
                         )}
                         {dataPost?.user?.id ? (
                              <Link href={ROUTES.PROFILE(dataPost.user.id)} className='font-bold ml-2 text-[var(--c-text-title)] hover:opacity-80 duration-300'>
                                   {dataPost?.user?.name || 'Unknown User'}
                              </Link>
                         ) : (
                              <span className='font-bold ml-2 text-[var(--c-text-title)]'>
                                   {dataPost?.user?.name || 'Unknown User'}
                              </span>
                         )}
                         <Dot />
                         <span className='text-[var(--color-text-muted)]'>{getTimeAgo(dataPost?.createdAt)}</span>
                    </div>
                    <div className='flex items-center gap-3'>
                         {dataPost?.user?.id && dataPost.user.id !== user?.id && (
                              <FollowButton
                                   userId={dataPost.user.id}
                                   size="sm"
                                   variant="default"
                              />
                         )}
                         <DropdownMenuPost
                              handleDeletePost={handleDeletePost}
                              handleReportPost={handleReportPost}
                              handleSavePost={handleSavePost}
                              handleViewDetail={handleViewDetail}
                              isSaved={isSaved}
                              isOwner={dataPost?.user?.id === user?.id}
                         >
                              <Button variant='ghost'>
                                   <Ellipsis />
                              </Button>
                         </DropdownMenuPost>
                    </div>
               </div>

               <h1 className='font-bold mt-2 text-[var(--c-text-title)]'>{dataPost?.title}</h1>
               <p
                    className={clsx('text-base/5 text-justify my-1 duration-300 cursor-pointer', !expanded && 'line-clamp-3')}
                    onClick={() => setExpanded(!expanded)}
               >
                    {dataPost?.content}
               </p>

               <Card className='relative w-full aspect-[3/2] flex justify-center items-center mt-3 bg-muted/30 overflow-hidden'>
                    {dataPost?.imageUrl && !imageError ? (
                         <>
                              <Zoom>
                                   <Image
                                        src={`${BASE_URL}${dataPost?.imageUrl}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        alt={dataPost?.title || "Post image"}
                                        className={clsx(
                                             "object-contain transition-all duration-300",
                                             dataPost?.isNSFW && !showNSFWContent && "blur-2xl"
                                        )}
                                        unoptimized
                                        onError={(e) => {
                                             setImageError(true)
                                        }}
                                   />
                              </Zoom>
                              {dataPost?.isNSFW && !showNSFWContent && (
                                   <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-background/80 pointer-events-none">
                                        <div className="flex flex-col items-center gap-3 pointer-events-auto">
                                             <AlertTriangle className="h-12 w-12 text-red-500" />
                                             <h3 className="text-lg font-semibold">18+ Sensitive Content</h3>
                                             <Button
                                                  variant="destructive"
                                                  onClick={() => setShowNSFWContent(true)}
                                             >
                                                  <Eye className="mr-2 h-4 w-4" />
                                                  View Content
                                             </Button>
                                        </div>
                                   </div>
                              )}
                              {dataPost?.isNSFW && showNSFWContent && (
                                   <Button
                                        variant="secondary"
                                        size="sm"
                                        className="absolute top-4 right-4 z-10"
                                        onClick={() => setShowNSFWContent(false)}
                                   >
                                        <EyeOff className="mr-2 h-4 w-4" />
                                        Hide
                                   </Button>
                              )}
                              {dataPost?.imageMetadata && (
                                   <Button
                                        variant="secondary"
                                        size="sm"
                                        className="absolute bottom-4 right-4 z-10"
                                        onClick={() => setShowMetadata(true)}
                                   >
                                        <Info className="mr-2 h-4 w-4" />
                                        Image Info
                                   </Button>
                              )}
                         </>
                    ) : (
                         <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                              <ImageIcon size={48} />
                              <p className="text-sm">{t('imageErrorText')}</p>
                         </div>
                    )}
               </Card>

               <Dialog open={showMetadata} onOpenChange={setShowMetadata}>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                         <DialogHeader>
                              <DialogTitle>Image Metadata</DialogTitle>
                         </DialogHeader>
                         <div className="space-y-4 text-sm">
                              {dataPost?.imageMetadata && (
                                   <>
                                        {/* Camera Information */}
                                        {(dataPost.imageMetadata.cameraMake || dataPost.imageMetadata.cameraModel) && (
                                             <div className="space-y-2">
                                                  <h3 className="font-semibold text-base">Camera</h3>
                                                  {dataPost.imageMetadata.cameraMake && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">Make:</span>
                                                            <span>{dataPost.imageMetadata.cameraMake}</span>
                                                       </div>
                                                  )}
                                                  {dataPost.imageMetadata.cameraModel && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">Model:</span>
                                                            <span>{dataPost.imageMetadata.cameraModel}</span>
                                                       </div>
                                                  )}
                                                  {dataPost.imageMetadata.cameraSerialNumber && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">Serial:</span>
                                                            <span>{dataPost.imageMetadata.cameraSerialNumber}</span>
                                                       </div>
                                                  )}
                                             </div>
                                        )}

                                        {/* Lens Information */}
                                        {dataPost.imageMetadata.lensModel && (
                                             <div className="space-y-2">
                                                  <h3 className="font-semibold text-base">Lens</h3>
                                                  <div className="grid grid-cols-[120px_1fr] gap-2">
                                                       <span className="text-muted-foreground">Model:</span>
                                                       <span>{dataPost.imageMetadata.lensModel}</span>
                                                  </div>
                                                  {dataPost.imageMetadata.lensSerialNumber && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">Serial:</span>
                                                            <span>{dataPost.imageMetadata.lensSerialNumber}</span>
                                                       </div>
                                                  )}
                                             </div>
                                        )}

                                        {/* Exposure Settings */}
                                        {(dataPost.imageMetadata.aperture || dataPost.imageMetadata.shutterSpeed || dataPost.imageMetadata.iso || dataPost.imageMetadata.focalLength) && (
                                             <div className="space-y-2">
                                                  <h3 className="font-semibold text-base">Exposure</h3>
                                                  {dataPost.imageMetadata.aperture && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">Aperture:</span>
                                                            <span>{dataPost.imageMetadata.aperture}</span>
                                                       </div>
                                                  )}
                                                  {dataPost.imageMetadata.fStop && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">F-Stop:</span>
                                                            <span>{dataPost.imageMetadata.fStop}</span>
                                                       </div>
                                                  )}
                                                  {dataPost.imageMetadata.shutterSpeed && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">Shutter:</span>
                                                            <span>{dataPost.imageMetadata.shutterSpeed}</span>
                                                       </div>
                                                  )}
                                                  {dataPost.imageMetadata.exposureTime && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">Exposure Time:</span>
                                                            <span>{dataPost.imageMetadata.exposureTime}</span>
                                                       </div>
                                                  )}
                                                  {dataPost.imageMetadata.iso && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">ISO:</span>
                                                            <span>{dataPost.imageMetadata.iso}</span>
                                                       </div>
                                                  )}
                                                  {dataPost.imageMetadata.focalLength && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">Focal Length:</span>
                                                            <span>{dataPost.imageMetadata.focalLength}</span>
                                                       </div>
                                                  )}
                                                  {dataPost.imageMetadata.exposureMode && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">Exposure Mode:</span>
                                                            <span>{dataPost.imageMetadata.exposureMode}</span>
                                                       </div>
                                                  )}
                                                  {dataPost.imageMetadata.exposureProgram && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">Program:</span>
                                                            <span>{dataPost.imageMetadata.exposureProgram}</span>
                                                       </div>
                                                  )}
                                                  {dataPost.imageMetadata.meteringMode && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">Metering:</span>
                                                            <span>{dataPost.imageMetadata.meteringMode}</span>
                                                       </div>
                                                  )}
                                                  {dataPost.imageMetadata.flash && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">Flash:</span>
                                                            <span>{dataPost.imageMetadata.flash}</span>
                                                       </div>
                                                  )}
                                             </div>
                                        )}

                                        {/* Image Properties */}
                                        {(dataPost.imageMetadata.width || dataPost.imageMetadata.format || dataPost.imageMetadata.colorSpace) && (
                                             <div className="space-y-2">
                                                  <h3 className="font-semibold text-base">Image Properties</h3>
                                                  {dataPost.imageMetadata.dimensions && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">Dimensions:</span>
                                                            <span>{dataPost.imageMetadata.dimensions}</span>
                                                       </div>
                                                  )}
                                                  {(dataPost.imageMetadata.width && dataPost.imageMetadata.height) && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">Size:</span>
                                                            <span>{dataPost.imageMetadata.width} × {dataPost.imageMetadata.height}</span>
                                                       </div>
                                                  )}
                                                  {dataPost.imageMetadata.format && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">Format:</span>
                                                            <span>{dataPost.imageMetadata.format}</span>
                                                       </div>
                                                  )}
                                                  {dataPost.imageMetadata.fileSize && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">File Size:</span>
                                                            <span>{(dataPost.imageMetadata.fileSize / 1024 / 1024).toFixed(2)} MB</span>
                                                       </div>
                                                  )}
                                                  {dataPost.imageMetadata.colorSpace && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">Color Space:</span>
                                                            <span>{dataPost.imageMetadata.colorSpace}</span>
                                                       </div>
                                                  )}
                                                  {dataPost.imageMetadata.dpi && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">DPI:</span>
                                                            <span>{dataPost.imageMetadata.dpi}</span>
                                                       </div>
                                                  )}
                                             </div>
                                        )}

                                        {/* Additional Information */}
                                        {(dataPost.imageMetadata.whiteBalance || dataPost.imageMetadata.sceneCaptureType || dataPost.imageMetadata.software) && (
                                             <div className="space-y-2">
                                                  <h3 className="font-semibold text-base">Additional</h3>
                                                  {dataPost.imageMetadata.whiteBalance && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">White Balance:</span>
                                                            <span>{dataPost.imageMetadata.whiteBalance}</span>
                                                       </div>
                                                  )}
                                                  {dataPost.imageMetadata.sceneCaptureType && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">Scene Type:</span>
                                                            <span>{dataPost.imageMetadata.sceneCaptureType}</span>
                                                       </div>
                                                  )}
                                                  {dataPost.imageMetadata.software && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">Software:</span>
                                                            <span>{dataPost.imageMetadata.software}</span>
                                                       </div>
                                                  )}
                                                  {dataPost.imageMetadata.artist && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">Artist:</span>
                                                            <span>{dataPost.imageMetadata.artist}</span>
                                                       </div>
                                                  )}
                                                  {dataPost.imageMetadata.author && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">Author:</span>
                                                            <span>{dataPost.imageMetadata.author}</span>
                                                       </div>
                                                  )}
                                             </div>
                                        )}

                                        {/* Dates */}
                                        {(dataPost.imageMetadata.dateTime || dataPost.imageMetadata.dateTimeOriginal || dataPost.imageMetadata.dateTimeDigitized) && (
                                             <div className="space-y-2">
                                                  <h3 className="font-semibold text-base">Dates</h3>
                                                  {dataPost.imageMetadata.dateTimeOriginal && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">Taken:</span>
                                                            <span>{dataPost.imageMetadata.dateTimeOriginal}</span>
                                                       </div>
                                                  )}
                                                  {dataPost.imageMetadata.dateTimeDigitized && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">Digitized:</span>
                                                            <span>{dataPost.imageMetadata.dateTimeDigitized}</span>
                                                       </div>
                                                  )}
                                                  {dataPost.imageMetadata.dateTime && (
                                                       <div className="grid grid-cols-[120px_1fr] gap-2">
                                                            <span className="text-muted-foreground">Modified:</span>
                                                            <span>{dataPost.imageMetadata.dateTime}</span>
                                                       </div>
                                                  )}
                                             </div>
                                        )}
                                   </>
                              )}
                         </div>
                    </DialogContent>
               </Dialog>

               <div className='flex gap-3 mt-2'>
                    <Button variant='ghost' size='lg' onClick={handleVotePost}>
                         <Heart className={clsx(isVoted && 'fill-red-600 text-red-600')} />
                         <span className={clsx(isVoted && 'text-red-600')}>{voteCount}</span>
                    </Button>

                    <DialogComment postId={dataPost?.id} handleUpdateCommentCount={handleUpdateCommentCount}>
                         <Button variant='ghost' size='lg' >
                              <MessageCircle size={92} /> {commentCount}
                         </Button>
                    </DialogComment>

                    <DialogShare linkShare={`${process.env.NEXT_PUBLIC_FRONTEND_URL}${ROUTES.FORUM}/${dataPost?.id}`}>
                         <Button variant="ghost" size="sm">
                              <Share2 />
                         </Button>
                    </DialogShare>
               </div>
          </div>
     )
}
