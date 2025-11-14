export type ImagePair = {
  before: string
  after: string
}

export type PresetFile = {
  url: string
  fileName: string
  fileSize?: number
  format: string
}

export type MarketplaceItem = {
  id: string
  title: string
  description: string
  price: number
  salePrice?: number
  image?: string
  imagePairs?: ImagePair[]
  thumbnail: string
  author: {
    name: string
    avatar: string
  }
  presetFile?: PresetFile
  rating?: number
  category: string
}

export type MarketplaceGridProps = {
  items: MarketplaceItem[]
  searchQuery: string
}

export type RelatedProductsType = {
  items: MarketplaceItem[]
}

export type MarketplaceDetail = {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  rating?: number
  reviewCount?: number
  downloads?: number
  author: {
    name: string
    avatar: string
    verified?: boolean
    totalProducts?: number
  }
  imagePairs?: ImagePair[]
  category: string
  tags?: string[]
  compatibility?: string[]
  fileFormat?: string
  fileSize?: string
  includesCount?: number
  features?: string[]
  specifications?: {
    adjustments?: string[]
    bestFor?: string[]
    difficulty?: string
  }
  createdAt?: string
  updatedAt?: string
  warranty?: {
    duration?: string
    coverage?: string
    terms?: string[]
  }
  reviews?: Review[]
}

export type Review = {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  createdAt: string
  helpful?: number
}

export type CreateReviewPayload = {
  rating: number
  comment: string
}

export type FilterSidebarProps = {
  filters: {
    category: string
    price: string
    rating: string
  }
  onFilterChange: (filters: { category: string; price: string; rating: string }) => void
  resetFilter: boolean
  onResetFilter: () => void
  categories: string[]
}

export type PurchasedPreset = {
  id: string
  title: string
  description: string
  thumbnail: string
  price: number
  category: string
  author: {
    name: string
    avatar?: string
  }
  rating?: number
  purchasedDate: string
}


export type CartItemType = {
  id: string
  image: string
  title: string
  author: string
  price: number
  originalPrice?: number
  quantity: number
}

export type ImagePairUploaderProps = {
  onChange?: (pairs: { before: File; after: File }[]) => void
}

export type PresetItem = {
  id: string
  beforeImage: File
  afterImage: File
  presetFile: File | PresetFile
  beforePreview: string
  afterPreview: string
  presetFileName: string
}

export type PresetUploadModalProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (items: PresetItem[]) => void
  existingItems?: PresetItem[]
}

export type ReviewFormProps = {
    productId: string
    onSuccess?: () => void
}