import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./layout/AppShell";
import { RequireAuth, RequireRole } from "./layout/RequireAuth";
import { SplashPage } from "./pages/SplashPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { RoleSelectPage } from "./pages/RoleSelectPage";
import { HomeDashboard } from "./pages/HomeDashboard";
import { ShipmentListPage } from "./pages/ShipmentListPage";
import { ShipmentDetailPage } from "./pages/ShipmentDetailPage";
import { FreshnessDetailPage } from "./pages/FreshnessDetailPage";
import { SmartAlertPage } from "./pages/SmartAlertPage";
import { ReroutePage } from "./pages/ReroutePage";
import { MarketplaceHomePage, MarketplaceRecommendPage } from "./pages/MarketplacePages";
import { NavigationPage } from "./pages/NavigationPage";
import { DeliverySuccessPage } from "./pages/DeliverySuccessPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { HistoryPage } from "./pages/HistoryPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { HeatmapPage } from "./pages/HeatmapPage";
import { ProfilePage } from "./pages/ProfilePage";
import { CreateShipmentPage } from "./pages/CreateShipmentPage";
import { DriverManagementPage } from "./pages/DriverManagementPage";

export default function App() {
  return (
    <div className="phone-frame">
      <div className="phone-shell">
        {/* This div maintains the flex height chain so screen-scroll works */}
        <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/splash" replace />} />
            <Route path="/splash" element={<SplashPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<RequireAuth />}>
              <Route path="/role" element={<RoleSelectPage />} />
              <Route element={<RequireRole />}>
                <Route path="/app" element={<AppShell />}>
                  <Route index element={<HomeDashboard />} />
                  <Route path="shipments" element={<ShipmentListPage />} />
                  <Route path="shipments/:id" element={<ShipmentDetailPage />} />
                  <Route path="shipments/:id/freshness" element={<FreshnessDetailPage />} />
                  <Route path="marketplace" element={<MarketplaceHomePage />} />
                  <Route path="marketplace/recommend/:id" element={<MarketplaceRecommendPage />} />
                  <Route path="notifications" element={<NotificationsPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="alert/:id" element={<SmartAlertPage />} />
                  <Route path="reroute/:id" element={<ReroutePage />} />
                  <Route path="navigation/:id" element={<NavigationPage />} />
                  <Route path="delivery-success/:id" element={<DeliverySuccessPage />} />
                  <Route path="history" element={<HistoryPage />} />
                  <Route path="analytics" element={<AnalyticsPage />} />
                  <Route path="heatmap" element={<HeatmapPage />} />
                  <Route path="create-shipment" element={<CreateShipmentPage />} />
                  <Route path="drivers" element={<DriverManagementPage />} />
                </Route>
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/splash" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

