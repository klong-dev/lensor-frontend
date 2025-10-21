import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";
import Image from "next/image";

export default function CarouselPreview({ files, handleClearImage }: { files: string[] | undefined, handleClearImage: () => void }) {
     return (
          <Carousel className="w-full mx-auto max-w-[360px]">
               <CarouselContent>
                    {files?.map((file, index) => (
                         <CarouselItem key={index}>
                              <Card className="w-full">
                                   <CardContent className="flex aspect-[3/2] items-center justify-center p-0 relative overflow-hidden">
                                        <Image
                                             alt={`Preview ${index + 1}`}
                                             className="w-full h-full object-contain will-change-transform"
                                             src={file}
                                             fill
                                             loading={index === 0 ? "eager" : "lazy"}
                                             style={{ transform: 'translateZ(0)' }}
                                        />
                                   </CardContent>
                              </Card>
                         </CarouselItem>
                    ))}
               </CarouselContent>
               <CarouselPrevious />
               <CarouselNext />
               <Tooltip>
                    <TooltipTrigger asChild>
                         <Button
                              onClick={handleClearImage}
                              variant='ghost'
                              className="rounded-full absolute top-1.5 right-2 text-muted-foreground hover:text-red-600 hover:animate-ping"
                         >
                              <Trash2 />
                         </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                         Clear all images
                    </TooltipContent>
               </Tooltip>
          </Carousel>
     )
}
