import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { Text, Container } from "@radix-ui/themes";
import { routes } from "./routes.config";

// Fallback components
import Home from "../pages/Home";

function LoadingFallback() {
  return (
    <Container style={{ padding: "2rem", textAlign: "center", background: "transparent" }}>
      <Text style={{ color: "white" }}>Loading...</Text>
    </Container>
  );
}

export default function AppRouter() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* New feature-based routes */}
        <Route path={routes.marketplace.path} element={<routes.marketplace.component />} />
        <Route path={routes.listingDetail.path} element={<routes.listingDetail.component />} />
        <Route path={routes.myNfts.path} element={<routes.myNfts.component />} />
        <Route path={routes.favorites.path} element={<routes.favorites.component />} />
        <Route path={routes.ranking.path} element={<routes.ranking.component />} />
        <Route path={routes.itemRegistration.path} element={<routes.itemRegistration.component />} />
        
        {/* Legacy routes - to be migrated */}
        <Route path="/home-legacy" element={<Home />} />
      </Routes>
    </Suspense>
  );
}
