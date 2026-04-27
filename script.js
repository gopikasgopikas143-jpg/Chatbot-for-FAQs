// ================================
//  FAQ Chatbot — script.js
//  CodeAlpha Task 2
//  NLP: Tokenize → TF-IDF → Cosine Similarity
// ================================

// ================================================================
//  FAQ DATABASE  —  More keywords = better match accuracy
//  Each entry has: question, keywords[], answer
// ================================================================
const FAQ_DATA = [
  {
    question: "What is Artificial Intelligence?",
    keywords: ["artificial","intelligence","ai","machine","think","human","simulate","smart"],
    answer: "Artificial Intelligence (AI) is the ability of a computer program to perform tasks that normally require human intelligence — like understanding language, recognising images, making decisions, and learning from experience. Examples: Siri, ChatGPT, self-driving cars."
  },
  {
    question: "What is Machine Learning?",
    keywords: ["machine","learning","ml","algorithm","train","data","predict","model","pattern"],
    answer: "Machine Learning (ML) is a branch of AI where the computer learns from data automatically, without being told step-by-step rules. Example: A spam filter learns what spam looks like by seeing thousands of spam emails."
  },
  {
    question: "What is Deep Learning?",
    keywords: ["deep","learning","neural","network","layers","cnn","rnn","image","speech"],
    answer: "Deep Learning uses neural networks with many layers to learn very complex patterns. It powers face recognition, voice assistants, and translation apps. The more data and layers, the smarter it gets."
  },
  {
    question: "What is Natural Language Processing (NLP)?",
    keywords: ["nlp","natural","language","processing","text","speech","sentence","tokenize","understand"],
    answer: "NLP is how computers understand and generate human language. It includes tasks like tokenization (splitting text into words), sentiment analysis, translation, and chatbots. Libraries: NLTK, SpaCy, Hugging Face."
  },
  {
    question: "What is a Neural Network?",
    keywords: ["neural","network","neuron","node","layer","activation","input","output","weight","bias"],
    answer: "A neural network is a system of connected nodes (like brain neurons) arranged in layers. Data goes in through the input layer, passes through hidden layers, and a result comes out at the output layer. The network learns by adjusting the connections (weights)."
  },
  {
    question: "What is Cosine Similarity?",
    keywords: ["cosine","similarity","vector","dot","product","angle","match","compare","distance"],
    answer: "Cosine Similarity measures how similar two texts are by treating them as vectors and calculating the angle between them. A score of 1 = identical, 0 = completely different. This chatbot uses cosine similarity to find which FAQ best matches your question!"
  },
  {
    question: "What is Tokenization?",
    keywords: ["tokenize","tokenization","token","split","word","preprocess","clean","text","break"],
    answer: "Tokenization is breaking a sentence into individual words (tokens). Example: 'I love Python' → ['i', 'love', 'python']. It is the first step in NLP. We also remove stopwords (like 'is', 'the', 'a') because they don't carry meaning."
  },
  {
    question: "What is Python?",
    keywords: ["python","programming","language","code","script","library","pip","syntax"],
    answer: "Python is a beginner-friendly programming language used in AI, data science, web development, and automation. It is popular because the code reads almost like English. Key AI libraries: TensorFlow, PyTorch, scikit-learn, NumPy, Pandas."
  },
  {
    question: "What is TensorFlow?",
    keywords: ["tensorflow","google","framework","tensor","deep","learning","model","train","keras"],
    answer: "TensorFlow is a free, open-source machine learning framework made by Google. It is used to build and train deep learning models. It works with Python and has a beginner-friendly interface called Keras."
  },
  {
    question: "What is PyTorch?",
    keywords: ["pytorch","torch","facebook","meta","dynamic","graph","deep","learning","research"],
    answer: "PyTorch is another popular deep learning framework, made by Facebook (Meta). It is preferred in research because it is flexible and easy to debug. Both TensorFlow and PyTorch are widely used in industry."
  },
  {
    question: "What is Overfitting?",
    keywords: ["overfit","overfitting","generalise","memorize","noise","validation","regularization","dropout"],
    answer: "Overfitting is when a model memorises the training data too well and fails on new data. Fix it by: using more training data, adding Dropout layers, using Regularization (L1/L2), or doing early stopping during training."
  },
  {
    question: "What is a Dataset?",
    keywords: ["dataset","data","training","testing","validation","sample","row","column","csv","image"],
    answer: "A dataset is a collection of examples used to train and test a model. It is usually split into: Training set (80%) – model learns from this, Validation set (10%) – tune the model, Test set (10%) – final evaluation."
  },
  {
    question: "What is Object Detection?",
    keywords: ["object","detection","yolo","rcnn","bounding","box","detect","locate","video","webcam","opencv"],
    answer: "Object Detection finds and locates objects in images or video frames. It draws bounding boxes with labels around each object. Popular models: YOLO (fast, real-time), Faster R-CNN (accurate). Used with OpenCV for webcam input."
  },
  {
    question: "What is LSTM?",
    keywords: ["lstm","long","short","term","memory","recurrent","rnn","sequence","time","series","music","text"],
    answer: "LSTM (Long Short-Term Memory) is a type of Recurrent Neural Network (RNN) that can remember information over long sequences. It is used for music generation, text prediction, speech recognition, and stock price forecasting."
  },
  {
    question: "What is MIDI?",
    keywords: ["midi","music","note","instrument","audio","piano","sound","musical","digital","interface"],
    answer: "MIDI (Musical Instrument Digital Interface) is a standard for storing and playing music digitally. It doesn't store actual sound — it stores instructions like 'play note C4 for 0.5 seconds'. AI music generators output MIDI files that can be played or converted to audio."
  },
  {
    question: "What is GitHub?",
    keywords: ["github","git","repository","repo","version","control","commit","push","upload","code","branch"],
    answer: "GitHub is a website where you store and share your code. You create a Repository (repo) for each project, then upload your files. For CodeAlpha, create a separate repo for each task: e.g. CodeAlpha_Translation_Tool, CodeAlpha_FAQ_Chatbot, CodeAlpha_Music_Generation."
  },
  {
    question: "What is an API?",
    keywords: ["api","application","interface","request","response","endpoint","http","rest","fetch","url","key"],
    answer: "An API (Application Programming Interface) lets two apps talk to each other. You send a request (e.g. a text to translate) and get a response (e.g. the translated text). In Task 1, we use the MyMemory API — it's free and needs no key!"
  },
  {
    question: "How do I submit my CodeAlpha task?",
    keywords: ["submit","submission","form","codealpha","whatsapp","task","internship","complete","how","send"],
    answer: "Here's the full submission process:\n1️⃣ Upload code to GitHub (separate repo per task)\n2️⃣ Record a screen demo video (2–3 mins)\n3️⃣ Post on LinkedIn with GitHub link + #CodeAlpha #Internship tags\n4️⃣ Fill the Submission Form shared in your WhatsApp group\nComplete at least 2–3 tasks for the certificate!"
  },
  {
    question: "How many tasks are needed for the certificate?",
    keywords: ["certificate","tasks","minimum","complete","eligible","two","three","internship","criteria"],
    answer: "To receive the CodeAlpha Internship Completion Certificate, you must complete a minimum of 2 or 3 tasks from the given list. Submitting only 1 task is considered incomplete and no certificate will be issued."
  },
  {
    question: "What is Sentiment Analysis?",
    keywords: ["sentiment","analysis","opinion","positive","negative","neutral","emotion","review","feeling"],
    answer: "Sentiment Analysis is an NLP task that determines the emotional tone of a text — positive, negative, or neutral. Example: 'I love this product' → Positive. It is widely used for analysing customer reviews and social media posts."
  },
  {
    question: "What is scikit-learn?",
    keywords: ["sklearn","scikit","learn","classification","regression","clustering","model","python","library"],
    answer: "scikit-learn (sklearn) is a Python library for classical machine learning algorithms like Linear Regression, Decision Trees, SVM, K-Means Clustering, and more. It's great for beginners before moving to TensorFlow or PyTorch."
  },
  {
    question: "What is the difference between AI, ML, and Deep Learning?",
    keywords: ["difference","between","ai","ml","deep","learning","compare","versus","vs"],
    answer: "Think of them as nested circles:\n🔵 AI (biggest) — Any technique that makes computers smart\n🟢 ML (inside AI) — Computers learn from data\n🔴 Deep Learning (inside ML) — ML using multi-layer neural networks\nAll Deep Learning is ML, all ML is AI — but not the other way around."
  }
];

// Quick topic chips shown in sidebar
const SUGGESTIONS = [
  "What is AI?",
  "What is Machine Learning?",
  "How to submit my task?",
  "How many tasks for certificate?",
  "What is cosine similarity?",
  "What is NLP?",
  "What is GitHub?",
  "What is overfitting?"
];

// ================================================================
//  NLP ENGINE
// ================================================================

const STOPWORDS = new Set([
  "a","an","the","is","are","was","were","be","been","being","i","me",
  "my","we","our","you","your","it","its","this","that","and","or","but",
  "in","on","at","to","for","of","with","about","what","which","who","how",
  "when","where","why","do","does","did","can","could","would","should",
  "will","have","has","had","not","so","just","very","also","as","from",
  "by","if","then","than","into","tell","give","explain","please","hi","hello"
]);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(w => w.length > 1 && !STOPWORDS.has(w));
}

function buildVector(tokens) {
  const vec = {};
  for (const t of tokens) vec[t] = (vec[t] || 0) + 1;
  return vec;
}

function cosineSimilarity(a, b) {
  let dot = 0, magA = 0, magB = 0;
  for (const w in a) { magA += a[w] ** 2; if (b[w]) dot += a[w] * b[w]; }
  for (const w in b)   magB += b[w] ** 2;
  if (!magA || !magB) return 0;
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

// Keyword boost: if user words match keyword list, boost score
function keywordBoost(userTokens, faq) {
  const hit = userTokens.filter(t => faq.keywords.includes(t)).length;
  return hit * 0.12; // each keyword hit adds 0.12 to score
}

function findBestMatch(query) {
  const tokens = tokenize(query);
  const userVec = buildVector(tokens);
  let best = null, bestScore = -1;

  for (const faq of FAQ_DATA) {
    // Combine question + keywords + first 60 chars of answer for matching
    const corpus = faq.question + " " + faq.keywords.join(" ") + " " + faq.answer.slice(0, 80);
    const faqVec = buildVector(tokenize(corpus));
    let score = cosineSimilarity(userVec, faqVec);
    score += keywordBoost(tokens, faq); // boost with exact keywords

    if (score > bestScore) { bestScore = score; best = faq; }
  }
  return { faq: best, score: bestScore };
}

// ================================================================
//  CHAT UI
// ================================================================

const chatEl   = document.getElementById("chatMessages");
const typingEl = document.getElementById("typingIndicator");
const inputEl  = document.getElementById("userInput");
const sendBtn  = document.getElementById("sendBtn");

// Build sidebar chips
(function () {
  const wrap = document.getElementById("chips");
  SUGGESTIONS.forEach(s => {
    const b = document.createElement("button");
    b.className = "chip";
    b.textContent = s;
    b.onclick = () => { inputEl.value = s; sendMessage(); };
    wrap.appendChild(b);
  });
})();

function appendMsg(text, role, score, matchedQ) {
  const msg = document.createElement("div");
  msg.className = `message ${role === "user" ? "user-msg" : "bot-msg"}`;

  const av = document.createElement("div");
  av.className = `avatar ${role === "user" ? "user-av" : "bot-av"}`;
  av.textContent = role === "user" ? "YOU" : "◈";

  const bub = document.createElement("div");
  bub.className = "bubble";

  // Handle multiline answers (split by \n)
  text.split("\n").forEach((line, i) => {
    if (i > 0) bub.appendChild(document.createElement("br"));
    const span = document.createElement("span");
    span.textContent = line;
    bub.appendChild(span);
  });

  // Confidence badge for bot
  if (role === "bot" && score !== null) {
    const pct = Math.min(100, Math.round(score * 100));
    const tag = document.createElement("div");
    const level = pct >= 60 ? "high" : pct >= 30 ? "mid" : "low";
    tag.className = `match-label ${level}`;
    tag.textContent = level === "high"
      ? `✓ Strong match · ${pct}% confidence`
      : level === "mid"
      ? `~ Partial match · ${pct}% confidence`
      : `? Low confidence · ${pct}%`;
    bub.appendChild(tag);
  }

  msg.appendChild(av);
  msg.appendChild(bub);
  chatEl.appendChild(msg);
  chatEl.scrollTop = chatEl.scrollHeight;
}

function setTyping(show) {
  typingEl.classList.toggle("show", show);
  chatEl.scrollTop = chatEl.scrollHeight;
}

function sendMessage() {
  const query = inputEl.value.trim();
  if (!query) return;

  appendMsg(query, "user");
  inputEl.value    = "";
  sendBtn.disabled = true;
  setTimeout(() => setTyping(true), 250);

  const delay = 900 + Math.random() * 500;
  setTimeout(() => {
    setTyping(false);
    const { faq, score } = findBestMatch(query);
    const THRESHOLD = 0.08;

    if (!faq || score < THRESHOLD) {
      appendMsg(
        "I couldn't find a strong match for that question. Try rephrasing, or pick a topic from the sidebar!",
        "bot", 0, null
      );
    } else {
      appendMsg(faq.answer, "bot", score, faq.question);
    }

    sendBtn.disabled = false;
    inputEl.focus();
  }, delay);
}

function handleKey(e) {
  if (e.key === "Enter") sendMessage();
}
