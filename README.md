# 💘 TDC MatchMaker
![TDC Matchmaker Banner](https://capsule-render.vercel.app/api?type=rect&color=0:EC4899,100:8B5CF6&height=150&section=header&text=TDC%20MatchMaker%20%E2%9D%A4%EF%B8%8F&fontSize=44&fontColor=ffffff)

A production-ready **internal matchmaking tool MVP** built for the TDC team to manage customers, view verified profiles, assign matches, and record notes — powered by an **AI-assisted matching engine**.

---

## 🧭 Goals
- Provide a simple dashboard for **customer management & journey tracking**
- Enable **gender-specific, scalable matching logic**
- Integrate **AI scoring + natural language insights**
- Deploy quickly on **Vercel/Netlify**

---

## ✨ Core Features
- 🔑 **Login System** (username/password)
- 📋 **Dashboard – Customer List** → Name, Age, City, Marital Status, Status Tag
- 👤 **Customer Detail View** → full biodata + notes
- 📂 **Dummy Profiles Pool** → 100+ opposite-gender profiles
- 🧮 **Matching Logic**
  - **Male Customers:** younger, earns less, shorter, aligned on “Want Kids”
  - **Female Customers:** profession compatibility, values, relocation/pets openness, education, income
- 🤖 **AI Integration (mandatory)**
  - Match score + natural-language rationale
  - Auto-generated personalized intros for outreach
- 📧 **Send Match Action** → triggers mock email/modal with candidate details

---

## 🏗️ Architecture

```mermaid
flowchart LR
    subgraph Frontend [Next.js React App]
      UI[Login / Dashboard / Customer / Matches / Notes]
    end

    subgraph Backend [Next.js API Routes / Express]
      Auth(Auth API)
      Customers(Customers API)
      Matches(Matchmaking API)
      Notes(Notes API)
      AI([OpenAI Service])
    end

    subgraph Data [Storage Layer]
      DB[(Profiles + Customers JSON/DB)]
      Cache[(LocalStorage - Session)]
    end

    UI <--> Auth
    UI <--> Customers
    UI <--> Matches
    UI <--> Notes
    Matches --> AI
    Customers <--> DB
    Matches <--> DB
    Notes <--> DB

```

---

## 🧱 Tech Stack
- **Frontend:** Next.js (React + TypeScript + Tailwind)
- **Backend:** Node.js / Express / Next.js API Routes
- **AI:** OpenAI API (GPT for scoring + intros)
- **Data:** Static JSON / Firebase / mock DB

---

## 🔑 Demo Credentials
- **Matchmaker:** `demo` / `demo123`

---

## 📊 Matching Logic

**Male Customers**
- Younger partner → +20
- Lower income → +20
- Shorter height → +15
- Kids preference aligned → +25
- Bonus → shared city/country/values

**Female Customers**
- Profession compatibility → +18
- Values overlap → +22
- Relocation/pets openness → +20
- Education compatibility → +10
- Income alignment → +15
- Height preference → +10
- Kids preference aligned → +15

**AI Enhancements**
- Normalize scores (0–100)
- Provide rationale (e.g., *“High Potential Match due to shared profession and relocation flexibility”*)

---

## 🛠️ Development

```bash
# Clone repo
git clone https://github.com/your-username/tdc-matchmaker.git
cd tdc-matchmaker

# Install dependencies
npm install

# Start development server
npm run dev
```

---

