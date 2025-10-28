interface MarketplaceItem {
    id: number
    title: string
    description: string
    price: number
    salePrice?: number
    image: string
    author: {
        name: string
        avatar: string
    }
    rating?: number
}

interface MarketplaceGridProps {
    items: MarketplaceItem[];
    searchQuery: string;
}

interface MarketplaceItemCardProps {
    item: MarketplaceItem;
}

interface FilterSidebarProps {
    searchInput: string;
    onSearchChange: (value: string) => void;
    searchQuery: string;
    resultsCount: number;
    filters: {
        software: string;
        price: string;
        rating: string;
    };
    onFilterChange: (filters: { software: string; price: string; rating: string }) => void;
    resetFilter: boolean;
    onResetFilter: () => void;
}

interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onSubmit'> {
    onSearch?: (query: string) => void,
    onSubmit?: (query: string) => void,
    showSearchIcon?: boolean
}

export type { MarketplaceGridProps, MarketplaceItem, MarketplaceItemCardProps, FilterSidebarProps, SearchBarProps }