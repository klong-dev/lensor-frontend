export const resizeImage = (file: File, maxWidth: number = 800, maxHeight: number = 600): Promise<string> => {
     return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = (e) => {
               const img = document.createElement('img')
               img.onload = () => {
                    const canvas = document.createElement('canvas')
                    let width = img.width
                    let height = img.height

                    if (width > height) {
                         if (width > maxWidth) {
                              height = (height * maxWidth) / width
                              width = maxWidth
                         }
                    } else {
                         if (height > maxHeight) {
                              width = (width * maxHeight) / height
                              height = maxHeight
                         }
                    }

                    canvas.width = width
                    canvas.height = height

                    const ctx = canvas.getContext('2d')
                    ctx?.drawImage(img, 0, 0, width, height)

                    const resizedBase64 = canvas.toDataURL('image/jpeg', 0.7)
                    resolve(resizedBase64)
               }
               img.onerror = reject
               img.src = e.target?.result as string
          }
          reader.onerror = reject
          reader.readAsDataURL(file)
     })
}