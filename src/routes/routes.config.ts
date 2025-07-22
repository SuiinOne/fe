import { lazy } from 'react';

// Lazy load feature pages
const MarketplacePage = lazy(() => import('../features/marketplace/pages/MarketplacePage').then(m => ({ default: m.MarketplacePage })));
const ListingDetailPage = lazy(() => import('../features/marketplace/pages/ListingDetailPage').then(m => ({ default: m.ListingDetailPage })));
const MyNFTsPage = lazy(() => import('../features/my-nfts/pages/MyNFTsPage').then(m => ({ default: m.MyNFTsPage })));
const FavoritesPage = lazy(() => import('../features/favorites/pages/FavoritesPage').then(m => ({ default: m.FavoritesPage })));
const RankingPage = lazy(() => import('../features/ranking/pages/RankingPage').then(m => ({ default: m.RankingPage })));
const ItemRegistrationPage = lazy(() => import('../features/item-registration/pages/ItemRegistrationPage').then(m => ({ default: m.ItemRegistrationPage })));
const ThemeTestPage = lazy(() => import('../pages/ThemeTestPage').then(m => ({ default: m.ThemeTestPage })));

export const routes = {
  marketplace: {
    path: '/',
    component: MarketplacePage,
    title: 'Marketplace',
  },
  listingDetail: {
    path: '/listing/:id',
    component: ListingDetailPage,
    title: 'Listing Details',
  },
  myNfts: {
    path: '/my-nfts',
    component: MyNFTsPage,
    title: 'My NFTs',
    protected: true,
  },
  favorites: {
    path: '/favorites',
    component: FavoritesPage,
    title: '좋아요 모아보기',
    protected: true,
  },
  ranking: {
    path: '/ranking',
    component: RankingPage,
    title: '랭킹',
  },
  itemRegistration: {
    path: '/register-type',
    component: ItemRegistrationPage,
    title: '아이템 타입 등록',
    protected: true,
  },
  themeTest: {
    path: '/theme-test',
    component: ThemeTestPage,
    title: '테마 테스트',
  },
} as const;