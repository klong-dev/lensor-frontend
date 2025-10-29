export interface ImagePair {
  before: string
  after: string
}

export interface PresetFile {
  url: string
  fileName: string
  fileSize?: number
  format: string
}

export interface MarketplaceItem {
  id: number
  title: string
  description: string
  price: number
  salePrice?: number
  imagePairs: ImagePair[]
  author: {
    name: string
    avatar: string
  }
  presetFile: PresetFile
  rating?: number
  software?: string
}

export interface MarketplaceGridProps {
  items: MarketplaceItem[]
  searchQuery: string
}

export interface MarketplaceItemCardProps {
  item: MarketplaceItem
}

export interface FilterSidebarProps {
  searchInput: string
  onSearchChange: (value: string) => void
  searchQuery: string
  resultsCount: number
  filters: {
    software: string
    price: string
    rating: string
  }
  onFilterChange: (filters: { software: string; price: string; rating: string }) => void
  resetFilter: boolean
  onResetFilter: () => void
}

export interface SearchBarProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onSubmit'> {
  onSearch?: (query: string) => void
  onSubmit?: (query: string) => void
  showSearchIcon?: boolean
}
