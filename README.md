# ShopSphere

A modern, React-based e-commerce storefront built during ITI’s Python Full Stack Development (2025) — Lab 3. ShopSphere lets users browse products, view details, manage a shopping cart, and switch seamlessly between English, Arabic (RTL), and French.

---

## 🚀 Features

* **Product Catalog**
  Fetches and displays products from the [DummyJSON API](https://dummyjson.com).
* **Product Details & Cart**
  View detailed product pages, choose quantities, and add items to cart.
* **Cart Badge**
  Navbar icon shows real-time total item count.
* **Internationalization**
  English, Arabic (RTL), and French support via **react-i18next**.
* **Responsive Design**
  Mobile-first layout powered by **React Bootstrap**.

---

## 🛠 Tech Stack

* **Frontend**: React + Vite
* **Styling & Layout**: React Bootstrap
* **State Management**: Redux Toolkit
* **Routing**: react-router-dom
* **i18n**: react-i18next
* **API**: DummyJSON ([https://dummyjson.com](https://dummyjson.com))
* **Deployment**: Vercel

---

## ⚙️ Prerequisites

* **Node.js** v16 or higher
* **npm** v8 or higher

---

## 🔧 Installation & Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/ahmed-yousef-dev/ShopSphere.git
   cd ShopSphere
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

---

## 🚢 Deployment on Vercel

1. Push your fork to GitHub.
2. Sign up or log in to [Vercel](https://vercel.com).
3. **Import Project**

   * Framework Preset: **Vite**
   * Install Command: `npm install`
   * Build Command: `npm run build`
   * Output Directory: `dist`
4. Click **Deploy** and grab your live URL!

---

## 📁 Project Structure

```
ShopSphere/
├─ public/                # Static assets
├─ src/
│  ├─ components/         # React components (Navbar, ProductsList, etc.)
│  ├─ features/           # Redux slices (cart, products)
│  ├─ hooks/              # Custom React hooks
│  ├─ locales/            # Translation files (en, ar, fr)
│  ├─ pages/              # Route-based pages
│  ├─ store/              # Redux Toolkit store configuration
│  ├─ App.jsx             # Root component + router
│  └─ i18n.js             # i18next setup
├─ .env                   # VITE_API_BASE_URL=https://dummyjson.com
├─ package.json
└─ vite.config.js
```

---

## 🔍 Notes

* **Environment Variable**
  `VITE_API_BASE_URL` is preconfigured for DummyJSON in `.env`.
* **Cart State**
  Managed with Redux Toolkit: add/remove items, adjust quantities, and persist badge count.
* **RTL Support**
  Arabic layout flips via CSS when locale is set to `ar`.

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

> **Enjoy exploring ShopSphere!**
> Feel free to open issues or submit pull requests.
