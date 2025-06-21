# Page Navigation Component - Fillout Assignment

This is a take-home assessment project for the front-end developer role at **Fillout**. The goal is to replicate a page navigation component as seen in Fillout's form builder, with support for:

- Active, Hover, Focused, and Default UI states
- Drag-and-drop reordering
- Context menu with actions (Rename, Duplicate, Delete, Set as First Page)
- Inserting pages dynamically

## 🌐 Live Demo

👉 [Deployed Link (Vercel)](https://fillout-page.vercel.app/)

## 📁 GitHub Repository

👉 [GitHub Link](https://github.com/NoraRen0523/Fillout_page/tree/main/fillout-page-navigator)

---

## 🔧 Features

- 🟡 Fully interactive navigation bar
- ✅ Reorder pages via drag and drop (powered by `@dnd-kit`)
- ➕ Add a new page between any two existing pages
- 📋 Context menu with page actions
- 🎨 Visual styling that reflects:
  - `Active`: Yellow alert icon + action menu
  - `Focused`: Yellow icon, no menu
  - `Default`: Light gray icons and background
  - `Hover`: Darker background tone

## 🛠 Tech Stack

- **React + TypeScript**
- **Tailwind CSS** for styling
- **@dnd-kit** for drag-and-drop
- **Lucide-react** for icons

## 🧪 How to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/NoraRen0523/Fillout_page/tree/main/fillout-page-navigator

# 2. Install dependencies
cd fillout-page-navigator
npm install

# 3. Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📌 Notes

- No backend is required
- All state is maintained in memory
- You can rename, duplicate, delete, or set any page as the first

---

## 📬 Contact
If you have any questions, feel free to reach out to:
- 📧 rx1996523@gmail.com

Thanks for reviewing my submission!
