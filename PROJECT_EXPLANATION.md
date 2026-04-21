# Tennis Map 專案說明

## 專案概述

這是一個**網球場地圖應用程式**，讓使用者可以在地圖上查找、瀏覽和評論網球場。專案採用 **Node.js + Express** 作為後端框架，使用 **Sequelize ORM** 與 **PostgreSQL** 資料庫互動，前端使用 **Leaflet** 地圖庫來顯示地圖。

---

## 主要模組架構

### 1. **應用程式入口 (`app.js`)**
這是整個應用的起點，負責：
- 初始化 Express 伺服器
- 設定中介軟體（CORS、Session、Passport 認證等）
- 連接路由系統
- 提供靜態檔案服務（前端 HTML/CSS/JS）

**關鍵設定：**
- 端口：3000
- CORS 允許來源：`http://localhost:5173`（前端開發伺服器）
- 靜態檔案目錄：`public/`

---

### 2. **路由系統 (`routes/`)**

#### 主路由 (`routes/index.js`)
定義所有 API 端點，包括：

**網球場相關：**
- `GET /api/courts` - 取得所有網球場
- `GET /api/courts/:courtId` - 取得單一網球場詳細資訊（含評論、收藏者）
- `GET /api/courts/map` - 根據地圖範圍取得網球場（用於地圖縮放）
- `GET /api/courts/nearby` - 根據使用者位置取得附近的網球場
- `GET /api/courts/search` - 根據城市、州或郵遞區號搜尋網球場

**評論相關：**
- `GET /api/comments/:courtId` - 取得特定網球場的評論

**導航相關：**
- `GET /api/navigation/:courtId` - 取得前往網球場的路線指引

**使用者認證：**
- `POST /api/signUp` - 使用者註冊
- `POST /api/signIn` - 使用者登入（使用 Passport Local Strategy）
- `POST /api/signOut` - 使用者登出

**管理員：**
- `/api/admin/*` - 管理員專用路由（需認證且為管理員身份）

---

### 3. **控制器層 (`controllers/`)**

控制器負責處理 HTTP 請求，並呼叫對應的服務層：

- **`court-controller.js`** - 處理網球場相關請求
- **`user-controller.js`** - 處理使用者認證相關請求
- **`comment-controller.js`** - 處理評論相關請求
- **`navigation-controller.js`** - 處理導航相關請求

**模式：**
```javascript
// 控制器接收請求 → 呼叫服務 → 處理回應
controller.method = (req, res, next) => {
  service.method(req, (err, data) => 
    err ? next(err) : res.json({ status: 'success', data })
  )
}
```

---

### 4. **服務層 (`services/`)**

服務層包含業務邏輯和資料庫操作：

- **`court-services.js`** - 網球場查詢邏輯（搜尋、過濾、地理查詢）
- **`user-services.js`** - 使用者管理邏輯（註冊、登入、登出、JWT 生成）
- **`comment-services.js`** - 評論管理邏輯
- **`navigation-services.js`** - 導航服務邏輯

**特點：**
- 使用 Sequelize ORM 與資料庫互動
- 使用 `ST_DistanceSpheroid` 進行地理距離計算（PostgreSQL PostGIS）
- 使用回呼函數模式處理錯誤

---

### 5. **資料模型層 (`models/`)**

定義資料庫結構和關聯關係：

#### 核心模型：

1. **User（使用者）**
   - 欄位：userId, name, username, email, password, role, avatar, introduction
   - 關聯：
     - `hasMany` Comment（使用者可以有多個評論）
     - `belongsToMany` TennisCourt through Favorite（使用者可以收藏多個網球場）

2. **TennisCourt（網球場）**
   - 欄位：courtId, courtName, address相關欄位, latitude, longitude, location (PostGIS POINT), typeId, phone
   - 關聯：
     - `belongsTo` Type（網球場屬於某種類型）
     - `hasMany` Comment（網球場可以有多個評論）
     - `belongsToMany` User through Favorite（可以被多個使用者收藏）

3. **Comment（評論）**
   - 欄位：commentId, comment, userId, courtId
   - 關聯：
     - `belongsTo` User（評論屬於某個使用者）
     - `belongsTo` TennisCourt（評論屬於某個網球場）

4. **Favorite（收藏）**
   - 欄位：favoriteId, userId, courtId
   - 作為 User 和 TennisCourt 之間的關聯表（多對多關係）

5. **Type（類型）**
   - 欄位：typeId, type
   - 關聯：`hasMany` TennisCourt（類型可以有多個網球場）

---

### 6. **認證與授權 (`config/passport.js` + `middlewares/auth.js`)**

#### Passport 策略：

1. **Local Strategy（本地登入）**
   - 使用 email 和 password 驗證
   - 使用 bcrypt 比對密碼雜湊

2. **JWT Strategy（JWT Token 認證）**
   - 從 Authorization header 提取 Bearer token
   - 驗證 token 是否在黑名單中（Redis）
   - 解碼 token 並載入使用者資訊

#### 中介軟體：

- **`authenticated`** - 檢查使用者是否已登入（JWT）
- **`authenticatedAdmin`** - 檢查使用者是否為管理員

---

### 7. **中介軟體 (`middlewares/`)**

- **`auth.js`** - 認證檢查中介軟體
- **`checkBlacklist.js`** - 檢查 JWT token 是否在黑名單中
- **`error-handler.js`** - 統一錯誤處理

---

### 8. **前端 (`public/`)**

#### HTML (`index.html`)
- 使用 Bootstrap 5 作為 UI 框架
- 使用 Leaflet 顯示地圖

#### JavaScript (`js/main.js`)
- 初始化 Leaflet 地圖
- 處理地圖互動（點擊、定位等）
- 顯示標記、圓形、多邊形等元素

#### CSS (`css/style.css`)
- 自訂樣式

---

### 9. **資料庫遷移與種子 (`migrations/` + `seeders/`)**

- **migrations/** - 資料庫結構定義（使用 Sequelize CLI）
- **seeders/** - 初始資料（測試資料、類型資料、網球場資料等）

---

### 10. **資料處理腳本 (`scripts/`)**

包含資料匯入和處理腳本：
- `api/googleMapsApi.js` - 從 Google Maps API 取得網球場資料
- `api/hereApi.js` - 從 HERE API 取得網球場資料
- `integrateTennisCourtsData.js` - 整合多個來源的資料
- 其他資料清理腳本

---

## 資料流程圖

```
前端請求 (HTTP)
    ↓
app.js (Express 伺服器)
    ↓
routes/index.js (路由定義)
    ↓
middlewares/auth.js (認證檢查)
    ↓
controllers/*-controller.js (控制器)
    ↓
services/*-services.js (業務邏輯)
    ↓
models/*.js (Sequelize ORM)
    ↓
PostgreSQL 資料庫
```

---

## 認證流程

### 註冊流程：
1. 使用者提交註冊表單 → `POST /api/signUp`
2. `user-controller.signUp` → `user-services.signUp`
3. 檢查 email 是否已存在
4. 使用 bcrypt 雜湊密碼
5. 建立 User 記錄
6. 回傳成功訊息

### 登入流程：
1. 使用者提交登入表單 → `POST /api/signIn`
2. `passport.authenticate('local')` 驗證 email/password
3. `user-controller.signIn` → `user-services.signIn`
4. 生成 JWT token（包含使用者資訊和 jti）
5. 回傳 token 和使用者資料

### 後續請求流程：
1. 前端在 Authorization header 帶上 `Bearer <token>`
2. `authenticated` 中介軟體使用 Passport JWT Strategy 驗證
3. 檢查 token 是否在黑名單中（Redis）
4. 從 token 中提取使用者資訊並附加到 `req.user`
5. 繼續處理請求

### 登出流程：
1. 使用者請求登出 → `POST /api/signOut`
2. 從 header 提取 token
3. 解碼 token 取得 jti
4. 將 jti 存入 Redis 黑名單（過期時間 4000 秒）
5. 回傳成功訊息

---

## 資料庫關聯圖

```
User ←───┐
    │    │
    │    │ Favorite (多對多關係)
    │    │
    │    └──→ TennisCourt ←─── Type
    │                            │
    └───→ Comment ───────────────┘
```

---

## 技術棧

### 後端：
- **Node.js** + **Express** - Web 框架
- **Sequelize** - ORM
- **PostgreSQL** - 資料庫（使用 PostGIS 擴充功能進行地理查詢）
- **Redis** - Token 黑名單快取
- **Passport.js** - 認證策略（Local + JWT）
- **JWT** - Token 認證
- **bcryptjs** - 密碼雜湊

### 前端：
- **Leaflet** - 地圖庫
- **Bootstrap 5** - UI 框架
- **Vanilla JavaScript** - 前端邏輯

---

## 主要功能

1. ✅ **使用者認證**：註冊、登入、登出（JWT）
2. ✅ **網球場查詢**：所有網球場、單一詳細資訊、地圖範圍查詢、附近查詢、搜尋
3. ✅ **評論系統**：查看網球場評論
4. ✅ **收藏功能**：使用者可以收藏網球場（透過 Favorite 關聯表）
5. ✅ **導航功能**：取得前往網球場的路線
6. ✅ **管理員功能**：管理員專用路由（目前為空實作）

---

## 專案特點

1. **分層架構**：清晰的分離（路由 → 控制器 → 服務 → 模型）
2. **認證安全**：使用 JWT + Redis 黑名單機制
3. **地理查詢**：使用 PostgreSQL PostGIS 進行精確的地理距離計算
4. **關聯資料**：使用 Sequelize 處理複雜的資料關聯
5. **錯誤處理**：統一錯誤處理中介軟體

---

## 總結

這是一個結構清晰的網球場地圖應用程式，採用標準的 MVC 架構模式，使用現代化的 Node.js 技術棧。主要模組之間通過清晰的介面互動，每個層級都有明確的職責分工。
