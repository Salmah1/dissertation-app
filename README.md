# AI in Social Care

An interactive web application designed to help non-expert users explore how AI works in social care settings.

---

## Features

### AI Quiz

Short, engaging quiz to teach key AI concepts in simple terms.

### AI Guess Game

Users answer questions, and the Gemini API attempts to guess traits (e.g. age, hobby, personality).

### AI Image Generation

Uses the Gemini API to visualise user input about AI in social care, showing users how generative AI works.

---

## Tech Stack

### Frontend

- React
- JavaScript
- HTML5
- CSS3

### Backend

- Node.js
- Express.js
- JSON

### AI integration

- Google Gemini API (@google/genai)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://git.cardiff.ac.uk/c23048618/dissertation-app.git
cd dissertation-app
```

### 2. Set up environment variables

```md
Create a .env file inside the server folder:
```

```bash
GEMINI_API_KEY=api_key
```

### 3. Install and run

```md
Frontend:
```

```bash
npm install
npm start
```

```md
Backend:
```

```bash
cd server
npm install
node index.js
```

```md
### Author

Salmah Abdullahi
```
